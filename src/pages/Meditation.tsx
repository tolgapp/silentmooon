import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Structure from "../components/Structure";
import useSpotifyAuth from "../helper/useSpotifyAuth";
import { handleLogin, MEDI, MUSIC } from "../helper/helperFunctions";
import { useLocation } from "react-router-dom";
import { MeditationProps } from "../helper/props";

const Meditation: React.FC<MeditationProps> = ({ userName, onSearch }) => {
  const { pathname } = useLocation();
  const { isSpotifyConnected, fetchPlaylists } = useSpotifyAuth(
    pathname === "/meditation" ? MEDI : MUSIC
  );
  const [activeIcon, setActiveIcon] = useState("");

  useEffect(() => {
    if (activeIcon) {
      const searchTerm = activeIcon.toLowerCase();
      fetchPlaylists(searchTerm);
    }
  }, [activeIcon, fetchPlaylists]);

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
            {/* Add playlist rendering here */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20 justify-center gap-10 rounded-xl bg-gray-400 h-96 ml-8 mr-8">
          <h3 className="text-4xl text-white text-center font-semibold">
            Connect to Spotify to get audio guided playlists
          </h3>
          <img
            src="/images/spotify-login.png"
            alt="Spotify Login"
            className="h-16 w-auto cursor-pointer"
            onClick={handleLogin}
          />
        </div>
      )}
      <Navbar userName={userName} />
    </div>
  );
};

export default Meditation;
