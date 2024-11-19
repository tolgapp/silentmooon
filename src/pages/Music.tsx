import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { containerClass } from "../helper/classNames";
import axios from "axios";
import MusicDetail from "../components/MusicDetail";

type MusicProps = {
  userName: string | null;
};

const Music: React.FC<MusicProps> = ({ userName }) => {
  const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  const SCOPES = "playlist-read-private playlist-read-collaborative";

  const [isSpotifyConnected, setIsSpotifyConnected] = useState<boolean | null>(
    null
  );
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [spotifyData, setSpotifyData] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [openTracks, setOpenTracks] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref für Audio-Instanz

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = authUrl;
  };

  const handleSpotifyCallback = async (code: string) => {
    try {
      const response = await axios.post("/spotifytoken", { code: code });
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

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyAccessToken");
    if (storedToken) {
      setAccessToken(storedToken);
      setIsSpotifyConnected(true);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      if (code && isSpotifyConnected === null) {
        handleSpotifyCallback(code);
      }
    }
  }, [isSpotifyConnected]);

  const fetchMeditationPlaylists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5002/api/spotify/playlists",
        {
          params: { accessToken },
        }
      );
      setSpotifyData(response.data.playlists);
    } catch (error) {
      console.error("Error fetching meditation playlists:", error);
    }
  };

  const fetchPlaylistTracks = async (playlistId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/spotify/playlists/${playlistId}/tracks`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response.data.items);
      setTracks(response.data.items);
      setOpenTracks(true); // Öffne die MusicDetail-Komponente
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchMeditationPlaylists();
    }
  }, [accessToken]);

  const playTrack = (previewUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pausiere vorherige Instanz
    }
    const audio = new Audio(previewUrl);
    audioRef.current = audio; // Speichere die neue Instanz
    audio.play();
  };

  const handleCloseTracks = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stoppe Audio-Wiedergabe
      audioRef.current = null; // Setze Ref zurück
    }
    setOpenTracks(false); // Schließe MusicDetail
  };

  return (
    <div className={containerClass}>
      <SilentMoonLogo />
      {isSpotifyConnected ? (
        <div className="mt-16 flex flex-col items-center w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Welcome, you're connected to Spotify!
          </h2>
          <div className="flex flex-wrap gap-6 justify-center items-start w-full">
            {spotifyData.map((playlist: any) => (
              <div
                className="flex flex-col items-center w-64 bg-slate-300 rounded-2xl shadow-lg"
                key={playlist.id}
              >
                <img
                  src={playlist.images[0]?.url}
                  alt={playlist.name}
                  className="w-full h-64 rounded-t-xl"
                />
                <button
                  onClick={() => fetchPlaylistTracks(playlist.id)}
                  className="w-full p-4 bg-green-500 text-white rounded-b-lg text-2xl font-semibold hover:bg-green-600"
                >
                  Show Tracks
                </button>
              </div>
            ))}
          </div>
          {openTracks && (
            <MusicDetail
              tracks={tracks}
              playTrack={playTrack}
              onClose={handleCloseTracks} // Close-Funktion übergeben
            />
          )}
        </div>
      ) : (
        <>
          <h3 className="text-3xl font-semibold text-gray-600 text-center mb-8">
            Get the full potential by connecting to Spotify for your playlists.
          </h3>
          <img
            src="/images/spotify-login.png"
            alt="Spotify Login"
            className="h-16 w-auto cursor-pointer"
            onClick={handleLogin}
          />
        </>
      )}
      <Navbar userName={userName} />
    </div>
  );
};

export default Music;
