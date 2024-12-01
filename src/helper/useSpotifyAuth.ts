import { useEffect, useState } from "react";
import axios from "axios";

const useSpotifyAuth = (redirectUri: string) => {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null);


  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_token");
    if (storedToken) {

      setSpotifyToken(storedToken);
      setIsSpotifyConnected(true);
    } else {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      
      if (code) {
        fetchSpotifyToken(code, redirectUri)
          .then((token) => {
            setSpotifyToken(token);
            localStorage.setItem("spotify_token", token);
            setIsSpotifyConnected(true);
          })
          .catch((error) => {
            console.error("Error authenticating with Spotify:", error);
          });
      }
    }
  }, [redirectUri]);


  const fetchSpotifyToken = async (
    code: string,
    redirectUri: string
  ): Promise<string> => {
    try {
      const response = await axios.post("/spotify/token", {
        code,
        redirectUri,
      });

      if (!response.data.access_token) {
        throw new Error("Access token not found in response.");
      }

      return response.data.access_token;
    } catch (error: any) {
      console.error("Error fetching Spotify token:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      throw new Error("Failed to fetch Spotify token.");
    }
  };

  const fetchPlaylists = async (q = "meditation") => {
    if (!spotifyToken) {
      console.warn("No Spotify token found.");
      return [];
    }
  
    try {
      console.log("Fetching playlists with query:", q);
      const response = await axios.get("/spotify/playlists", {
        headers: {
          Authorization: `Bearer ${spotifyToken}`, 
        },
        params: { q },
      });
  
      return response.data.playlists;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching playlists:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error("Unexpected error:", error);
      }
      return [];
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    setSpotifyToken(null);
    setIsSpotifyConnected(false);
  };

  return {
    isSpotifyConnected,
    spotifyToken,
    handleLogout,
    fetchPlaylists
  };
};

export default useSpotifyAuth;
