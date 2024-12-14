import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MEDI, MUSIC } from "../helper/helperFunctions";

type SpotifyContextType = {
  isSpotifyConnected: boolean;
  spotifyToken: string;
  handleLogout: () => void;
  fetchPlaylists: (q?: string) => Promise<any[]>;
  fetchTracks: (playlistId: string) => Promise<any[]>;
  handleTrackUri: (uri: string) => void;
  selectedUri: string;
};

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

export const SpotifyProvider: React.FC<{
  children: React.ReactNode;
  navigate: (path: string) => void;
  pathname: string;
}> = ({ children, navigate, pathname }) => {
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState<string>("");
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
        fetchSpotifyToken(code, `${pathname === "/meditation" ? MEDI : MUSIC}`)
          .then((token) => {
            setSpotifyToken(token || ""); 
            localStorage.setItem("spotify_token", token || "");
            setIsSpotifyConnected(true);
          })
          .catch((error) => {
            console.error("Error authenticating with Spotify:", error);
          });
      }
    }
  }, []);
  

  const fetchSpotifyToken = async (code: string, redirectUri: string): Promise<string> => {
    try {
      const response = await axios.post("/spotify/token", { code, redirectUri });
      if (!response.data.access_token) {
        throw new Error("Access token not found in response.");
      }
      return response.data.access_token;
    } catch (error: any) {
      console.error("Error fetching Spotify token:", error);
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
        const response = await axios.get("/spotify/playlists", {
          headers: { Authorization: `Bearer ${spotifyToken}` },
          params: { q },
        });

        if (!response.data || !Array.isArray(response.data.playlists)) {
          throw new Error("Playlists not found in response.");
        }

        return response.data.playlists.filter(
          (playlist: any) =>
            playlist?.images?.length > 0 &&
            playlist?.name &&
            playlist?.owner?.id
        );
      } catch (error) {
        console.error("Error fetching playlists:", error);
        return [];
      }
    },
    [spotifyToken]
  );

  const fetchTracks = async (playlistId: string) => {
    if (!spotifyToken) return [];
    try {
      const response = await axios.get(`/spotify/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      });
      return response.data.items;
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return [];
    }
  };

  const handleTrackUri = useCallback(
    (uri: string) => {
      localStorage.setItem("spotifyUri", uri);
      console.log(uri)
      setSelectedUri(uri);
      
      if (pathname === "/meditation" || pathname === "/home" || pathname === "/userpage") {
        navigate("/music");
      }
      console.log(uri, pathname);
    },
    [pathname, navigate]
  );

  const handleLogout = () => {
    localStorage.removeItem("spotify_token");
    setSpotifyToken("");
    setIsSpotifyConnected(false);
  };

  const contextValue = {
    isSpotifyConnected,
    spotifyToken,
    handleLogout,
    fetchPlaylists,
    fetchTracks,
    handleTrackUri,
    selectedUri,
  };

  return <SpotifyContext.Provider value={contextValue}>{children}</SpotifyContext.Provider>;
};

export const useSpotify = (): SpotifyContextType => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
