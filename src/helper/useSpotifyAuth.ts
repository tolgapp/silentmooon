import { useCallback, useEffect, useState } from "react";
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

  const fetchSpotifyToken = async (code: string, redirectUri: string): Promise<string> => {
    console.log("FETCHTOKEN", code)
    try {
      const response = await axios.post("/spotify/token", { code, redirectUri });
      if (!response.data.access_token) {
        throw new Error("Access token not found in response.");
      }
      console.log(response.data.access_token)
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

  const fetchPlaylists = useCallback(
    async (q = "meditation") => {
      if (!spotifyToken) {
        console.warn("No Spotify token found.");
        return [];
      }
  
      try {
        console.log("Fetching playlists with query:", q);
        const response = await axios.get("/spotify/playlists", {
          headers: { Authorization: `Bearer ${spotifyToken}` },
          params: { q },
        });
  
        if (!response.data || !Array.isArray(response.data.playlists)) {
          throw new Error("Playlists not found in response.");
        }
  
        const validPlaylists = response.data.playlists.filter(
          (playlist: any) =>
            playlist?.images?.length > 0 && // Mindestens ein Bild vorhanden
            playlist?.name &&              // Name darf nicht null/undefined sein
            playlist?.owner?.id            // Eigentümer-ID muss existieren
        );
  
        return validPlaylists;
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
    },
    [spotifyToken]
  );
  

  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    setSpotifyToken(null);
    setIsSpotifyConnected(false);
  };

  return {
    isSpotifyConnected,
    spotifyToken,
    handleLogout,
    fetchPlaylists,
  };
};

export default useSpotifyAuth;
