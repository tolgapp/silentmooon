import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Structure from "../components/Structure";
import { handleLogin, MEDI, MUSIC } from "../helper/helperFunctions";
import { MeditationProps } from "../helper/props";
import axios from "axios";
import MusicDetail from "../components/MusicDetail";
import { useSpotify } from "../context/spotifyContext";
// import useSpotifyAuth from "../helper/useSpotifyAuth";
// import { useLocation } from "react-router-dom";

const Meditation: React.FC<MeditationProps> = ({ userName, onSearch }) => {
  // const { pathname } = useLocation();
  // const { isSpotifyConnected, fetchPlaylists, fetchTracks, handleTrackUri } =
  //   useSpotifyAuth(pathname === "/meditation" ? MEDI : MUSIC);
  const { isSpotifyConnected, fetchPlaylists, fetchTracks, handleTrackUri } =
    useSpotify();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<unknown[]>([]);
  const [selectedPlaylistUri, setSelectedPlaylistUri] = useState<string | null>(
    null
  );
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
  const spotifyToken = localStorage.getItem("spotify_token");

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        if (!activeIcon) {
          const fetchedPlaylists = await fetchPlaylists("meditate");
          setPlaylists(fetchedPlaylists);
        } else if (activeIcon.toLowerCase() === "favorites") {
          const response = await axios.get("/spotify/playlist/favorites", {
            headers: { Authorization: `Bearer ${spotifyToken}` },
          });
          setPlaylists(response.data.favorites || []);
        } else if (activeIcon.toLowerCase() === "all") {
          const queries = ["anxious", "sleep", "kids", "yoga", "meditation"];
          const allPlaylists = await Promise.all(
            queries.map((query) => fetchPlaylists(query))
          );
          setPlaylists(allPlaylists.flat());
        } else {
          const searchTerm = activeIcon.toLowerCase();
          const fetchedPlaylists = await fetchPlaylists(searchTerm);
          setPlaylists(fetchedPlaylists);
        }
      } catch (error) {
        console.error("Error loading playlists:", error);
      }
    };

    loadPlaylists();
  }, [activeIcon, fetchPlaylists, spotifyToken]);

  const handleViewTracks = (playlistId: string, playlistUri: string) => {
    setSelectedPlaylistUri(playlistUri);
    fetchTracks(playlistId).then(setSelectedTracks);
  };

  return (
    <div>
      <Structure
        title="Meditate"
        description="Audio-only meditation techniques to help you relax."
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
        onSearch={onSearch}
      />
      {isSpotifyConnected ? (
        <div className="mt-16 flex flex-col items-center w-full">
          <div className="flex flex-wrap gap-8 items-start w-full px-10 pb-60">
            {playlists
              .filter((playlist: any) => playlist && playlist.id)
              .map((playlist: any, index) => (
                <div
                  className="flex flex-col w-64 rounded-2xl shadow-lg"
                  key={`${playlist.id}-${index}`}
                >
                  <img
                    src={playlist.images[0]?.url || ""}
                    alt={playlist.name || "Unknown Playlist"}
                    className="w-full h-64 rounded-t-xl"
                  />
                  <button
                    className="w-full p-4 bg-[#8E9775] text-white rounded-b-lg text-2xl font-semibold hover:bg-[#8E9775]"
                    onClick={() => handleViewTracks(playlist.id, playlist.uri)} // Playlist-URI übergeben
                  >
                    View Tracks
                  </button>
                </div>
              ))}
          </div>
          {selectedTracks.length > 0 && (
            <MusicDetail
              tracks={selectedTracks}
              playlistUri={selectedPlaylistUri || ""} // Playlist-URI übergeben
              handleTrackUri={handleTrackUri}
              onClose={() => {
                setSelectedTracks([]);
                setSelectedPlaylistUri(null); // Playlist-URI zurücksetzen
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col text-balance items-center mt-20 justify-center gap-10 rounded-xl bg-gray-400 h-96 ml-8 mr-8">
          <h3 className="text-4xl text-white text-center font-semibold">
            Connect to Spotify to get audio guided playlists
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

export default Meditation;
