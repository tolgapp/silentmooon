import { useEffect, useState } from "react";
import { useSpotify } from "../Context/SpotifyContext";
import Navbar from "../components/Navbar";
import Structure from "../components/Structure";
import MusicDetail from "../components/MusicDetail";
import { CombinedMeditation } from "../helper/props";
import { handleLogin } from "../helper/helperFunctions";

const Meditation: React.FC<CombinedMeditation> = ({ userName }) => {
  const { isSpotifyConnected, fetchPlaylists, fetchTracks } = useSpotify();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
  const [activeIcon, setActiveIcon] = useState("meditate");

  useEffect(() => {
    if (isSpotifyConnected) {
      if (activeIcon === "All") {
        Promise.all([
          fetchPlaylists("meditate"),
          fetchPlaylists("anti-anxiety"),
          fetchPlaylists("sleep"),
          fetchPlaylists("kidsstories"),
        ])
          .then((results) => setPlaylists(results.flat())) 
          .catch((error) => console.error("Error fetching playlists for All:", error));
      } else if (activeIcon === "Anxious") {
        fetchPlaylists("anti-anxiety").then(setPlaylists);
      }
      
      else {
        const query = activeIcon === "Kids" ? "kidsstories" : activeIcon.toLowerCase();
        fetchPlaylists(query).then(setPlaylists);
      }
    }
  }, [isSpotifyConnected, fetchPlaylists, activeIcon]);
  

  const handleViewTracks = (playlistId: string) => {
    fetchTracks(playlistId).then(setSelectedTracks);
  };

  return (
    <div>
      <Structure
        title="Meditate"
        description="Audio-only meditation techniques to help you relax."
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
        // onSearch={onSearch}
      />
      {isSpotifyConnected ? (
        <div className="mt-16 flex flex-col items-center w-full">
          <div className="flex flex-wrap gap-8 items-start w-full px-10 pb-60">
            {playlists.map((playlist) => (
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
                  onClick={() => handleViewTracks(playlist.id)}
                  className="w-full p-4 bg-[#8E9775] text-white rounded-b-lg text-2xl font-semibold hover:bg-[#8E9775]"
                >
                  View Tracks
                </button>
              </div>
            ))}
          </div>
          {selectedTracks.length > 0 && (
            <MusicDetail
              tracks={selectedTracks}
              playTrack={(url) => console.log(url)}
              onClose={() => setSelectedTracks([])}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 justify-center gap-10 rounded-xl bg-gray-400 h-96 ml-8 mr-8">
          <h3 className="text-4xl text-white text-balance text-center font-semibold">
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
