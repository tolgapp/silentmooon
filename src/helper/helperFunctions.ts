import axios from "axios";

// Creates a random number with the given value
export const randomNum = (max: number): number => {
  return Math.floor(Math.random() * max);
};

// Spotify Login and variables
export const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const SCOPES = "playlist-read-private playlist-read-collaborative";

const MUSIC_REDIRECT_URI = import.meta.env.VITE_MUSIC_REDIRECT_URI;
const MEDI_REDIRECT_URI = import.meta.env.VITE_MEDI_REDIRECT_URI;


export const handleLogin = () => {
  const currentPath = window.location.pathname; 
  
  let redirectUri = ""; 

  if (currentPath.includes("/music")) {
    redirectUri = MUSIC_REDIRECT_URI;  
  } else if (currentPath.includes("/meditation")) {
    redirectUri = MEDI_REDIRECT_URI;  
  }

  if (!redirectUri) {
    console.error("Kein gültiger Redirect URI gefunden!"); 
    return;
  }

  
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(SCOPES)}`;
  
  window.location.href = authUrl;
};

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: { "Content-Type": "application/json" },
});

export const authenticateSpotify = async (token: string) => {
  spotifyApi.defaults.headers["Authorization"] = `Bearer ${token}`;
};
