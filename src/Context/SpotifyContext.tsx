import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type SpotifyContextType = {
  accessToken: string | null;
  isSpotifyConnected: boolean;
  fetchPlaylists: () => Promise<any[]>;
  fetchTracks: (playlistId: string) => Promise<any[]>;
};

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

export const SpotifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyAccessToken");

    if (storedToken) {
      setAccessToken(storedToken);
      setIsSpotifyConnected(true);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      if (code) {
        handleSpotifyCallback(code);
      }
    }
  }, []);

  const handleSpotifyCallback = async (code: string) => {
    try {
      const response = await axios.post("/spotifytoken", { code });
      const { access_token } = response.data;
      if (access_token) {
        localStorage.setItem("spotifyAccessToken", access_token);
        setAccessToken(access_token);
        setIsSpotifyConnected(true);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const fetchPlaylists = async (q = "meditation") => {
    if (!accessToken) return [];
    try {
      const response = await axios.get("/spotify/playlists", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q },  
      });
      return response.data.playlists;
    } catch (error) {
      console.error("Error fetching playlists:", error);
      return [];
    }
  };
  

  const fetchTracks = async (playlistId: string) => {
    if (!accessToken) return [];
    try {
      const response = await axios.get(`/spotify/playlists/${playlistId}/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.items;
    } catch (error) {
      console.error("Error fetching tracks:", error);
      return [];
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        isSpotifyConnected,
        fetchPlaylists,
        fetchTracks,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error("useSpotify must be used within a SpotifyProvider");
  }
  return context;
};
