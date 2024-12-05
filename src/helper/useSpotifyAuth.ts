import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const useSpotifyAuth = (redirectUri: string) => {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null);
  const [selectedUri, setSelectedUri] = useState(() => {
    return localStorage.getItem("spotifyUri") || "";
  });

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
      setTimeout(() => {
        if (!spotifyToken) {
          console.warn("No Spotify token found.");
          return [];
        }
      }, 2000)
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
            playlist?.images?.length > 0 &&
            playlist?.name &&
            playlist?.owner?.id
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



  const fetchTracks = async (playlistId: string) => {
    if (!spotifyToken) return [];
    try {
      const response = await axios.get(
        `/spotify/playlists/${playlistId}/tracks`,
        {
          headers: { Authorization: `Bearer ${spotifyToken}` },
        }
      );
      return response.data.items;
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return [];
    }
  };

  const {pathname} = useLocation()
  const navigate = useNavigate()

  const handleTrackUri = useCallback((uri: string) => {
    console.log("Selected URI ->:", uri);
    localStorage.setItem("spotifyUri", uri);
    setSelectedUri(uri);

    if (selectedUri && pathname === "/meditation") {
      navigate("/music")
    }
  }, []);
  
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
    fetchTracks,
    handleTrackUri,
    selectedUri
  };
};

export default useSpotifyAuth;
