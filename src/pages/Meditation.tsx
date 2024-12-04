import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Structure from "../components/Structure";
import useSpotifyAuth from "../helper/useSpotifyAuth";
import { handleLogin, MEDI, MUSIC } from "../helper/helperFunctions";
import { useLocation } from "react-router-dom";
import { MeditationProps } from "../helper/props";
import axios from "axios";

const Meditation: React.FC<MeditationProps> = ({ userName, onSearch }) => {
  const { pathname } = useLocation();
  const { isSpotifyConnected, fetchPlaylists } = useSpotifyAuth(
    pathname === "/meditation" ? MEDI : MUSIC
  );
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<unknown[]>([]);
  const spotifyToken = localStorage.getItem("spotify_token");

  useEffect(() => {
    const loadPlaylists = async () => {

      try {
        if (!activeIcon) {
          // Standardmäßig auf "meditate" setzen
          const fetchedPlaylists = await fetchPlaylists("meditate");
          setPlaylists(fetchedPlaylists);
        } else if (activeIcon.toLowerCase() === "favorites") {
          // Favoriten vom Backend laden
          const response = await axios.get("/spotify/playlist/favorites", {
            headers: { Authorization: `Bearer ${spotifyToken}` },
          });
          setPlaylists(response.data.favorites || []); // Erwartet, dass das Backend ein Array zurückgibt
        } else if (activeIcon.toLowerCase() === "all") {
          // Playlists für mehrere Kategorien laden
          const queries = ["anxious", "sleep", "kids", "yoga", "meditation"];
          const allPlaylists = await Promise.all(
            queries.map(query => fetchPlaylists(query))
          );
          // Die Playlists zusammenfügen und in den State setzen
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
  }, [activeIcon, fetchPlaylists, spotifyToken]); // Abhängigkeiten beachten
  


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
            {playlists.map((playlist: any) => (
              <div
                className="flex flex-col w-64 rounded-2xl shadow-lg"
                key={playlist.id}
              >
                <img
                  src={playlist.images[0]?.url}
                  alt={playlist.name}
                  className="w-full h-64 rounded-t-xl"
                />
                <button
                  // onClick={() => handleViewTracks(playlist.id)}
                  className="w-full p-4 bg-[#8E9775] text-white rounded-b-lg text-2xl font-semibold hover:bg-[#8E9775]"
                >
                  View Tracks
                </button>
              </div>
            ))}
          </div>
          {/* {selectedTracks.length > 0 && (
            <MusicDetail
              tracks={selectedTracks}
              playTrack={(url) => console.log(url)}
              onClose={() => setSelectedTracks([])}
            />
          )} */}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-40 gap-10">
          <h3 className="text-3xl text-balance font-semibold">
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
