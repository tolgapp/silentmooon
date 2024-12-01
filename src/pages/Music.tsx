import React from "react";
import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { containerClass } from "../helper/classNames";
import useSpotifyAuth from "../helper/useSpotifyAuth";
import { handleLogin, MEDI, MUSIC } from "../helper/helperFunctions";
import { useLocation } from "react-router-dom";

type MusicProps = {
  userName: string | null;
};

const Music: React.FC<MusicProps> = ({ userName }) => {
  const { pathname } = useLocation();
  const { isSpotifyConnected, handleLogout } = useSpotifyAuth(
    pathname === "/music" ? MUSIC : MEDI
  );

  return (
    <div className={containerClass}>
      <SilentMoonLogo />
      {isSpotifyConnected ? (
        <div className="mt-20 flex flex-col items-center w-full">
          <h3 className="text-3xl font-semibold text-gray-600">
            Welcome! Your Spotify is connected.
          </h3>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
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
