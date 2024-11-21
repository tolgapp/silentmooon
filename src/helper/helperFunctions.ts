  import axios from "axios";

  // Creates a random number with the given value
  export const randomNum = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  // Spotify Login and variables
  export const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  export const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  export const SCOPES = "playlist-read-private playlist-read-collaborative";


  // FIXME: Redirect to meditate if user connects on meditate or to music based on path
  export const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  };

  const spotifyApi = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: { "Content-Type": "application/json" },
  });

  export const authenticateSpotify = async (token: string) => {
    spotifyApi.defaults.headers["Authorization"] = `Bearer ${token}`;
    console.log("Spotify API Headers:", spotifyApi.defaults.headers);
  };


  