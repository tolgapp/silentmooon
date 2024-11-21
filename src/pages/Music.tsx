import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { containerClass } from "../helper/classNames";
import MusicDetail from "../components/MusicDetail";
import { useSpotify } from "../context/SpotifyContext";
import { handleLogin } from "../helper/helperFunctions";

type MusicProps = {
  userName: string | null;
};

type Playlist = {
  id: string;
  name: string;
  images: { url: string }[];
};

type Track = {
  id: string;
  name: string;
  preview_url: string | null;
  artists: { name: string }[];
};

const Music: React.FC<MusicProps> = ({ userName }) => {

  const { isSpotifyConnected, accessToken, fetchPlaylists, fetchTracks } =
    useSpotify();
  const [spotifyData, setSpotifyData] = useState<Playlist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [openTracks, setOpenTracks] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // useEffect(() => {
  //   if (isSpotifyConnected && accessToken) {
  //     fetchPlaylists().then(setSpotifyData);
  //   }
  // }, [isSpotifyConnected, accessToken, fetchPlaylists]);

  useEffect(() => {
    const fetchData = async () => {
      if (isSpotifyConnected && accessToken) {
        try {
          const playlists = await fetchPlaylists();
          if (playlists.length === 0) {
            // Fallback: Retry nach einer kurzen Verzögerung
            setTimeout(async () => {
              const retryPlaylists = await fetchPlaylists();
              setSpotifyData(retryPlaylists);
            }, 1000);
          } else {
            setSpotifyData(playlists);
          }
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      }
    };
  
    fetchData();
  }, [isSpotifyConnected, accessToken, fetchPlaylists]);
  

  const fetchPlaylistTracks = async (playlistId: string) => {
    try {
      const tracks = await fetchTracks(playlistId);
      setTracks(tracks);
      setOpenTracks(true);
    } catch (error) {
      console.error("Error fetching playlist tracks:", error);
    }
  };

  const playTrack = (previewUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(previewUrl);
    audioRef.current = audio;
    audio.play();
  };

  const handleCloseTracks = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setOpenTracks(false);
  };

  return (
    <div className={containerClass}>
      <SilentMoonLogo />
      {isSpotifyConnected ? (
        <div className="mt-20 flex flex-col items-center w-full">
          <div className="flex flex-wrap gap-8 justify-center items-start w-full">
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
              onClose={handleCloseTracks}
            />
          )}
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h3 className="text-3xl font-semibold text-gray-600 text-center mb-8">
            Get the full potential by connecting to Spotify for your playlists.
          </h3>
          <img
            src="/images/spotify-login.png"
            alt="Spotify Login"
            className="h-16 w-auto cursor-pointer"
            onClick={() => handleLogin()}
          />
        </div>
      )}
      <Navbar userName={userName} />
    </div>
  );
};

export default Music;
