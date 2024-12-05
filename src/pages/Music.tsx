import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { containerClassMusic } from "../helper/classNames";
import useSpotifyAuth from "../helper/useSpotifyAuth";
import { handleLogin, MEDI, MUSIC } from "../helper/helperFunctions";
import { useLocation } from "react-router-dom";
import SpotifyPlayer from "react-spotify-web-playback";

type MusicProps = {
  userName: string | null;
};

const Music: React.FC<MusicProps> = ({ userName }) => {
  const { pathname } = useLocation();
  const { isSpotifyConnected, spotifyToken, selectedUri } = useSpotifyAuth(
    pathname === "/music" ? MUSIC : MEDI
  );


  return (
    <div className={containerClassMusic}>
      <SilentMoonLogo />
      {isSpotifyConnected ? (
        <div className="mt-20 flex-col items-center w-full">
          <SpotifyPlayer
            token={spotifyToken} 
            uris={[selectedUri]} 
            autoPlayplay={true}
            play={true}
            showSaveIcon={false}
            spotifyIcon={false}
            styles={{
              bgColor: "transparent",
              color: "#4A503D",
              loaderColor: "#4A503D",
              sliderColor: "#4A503D",
              trackArtistColor: "#fff",
              trackNameColor: "#fff"
            }}
          />
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
