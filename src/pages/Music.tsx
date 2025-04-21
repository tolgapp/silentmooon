<<<<<<< HEAD
import Navbar from '../components/Navbar';
import SilentMoonLogo from '../components/SilentMoonLogo';
import { containerClass, containerClassMusic } from '../helper/classNames';
import { handleLogin } from '../helper/helperFunctions';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useSpotify } from '../context/SpotifyContext';
=======
import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { containerClass, containerClassMusic } from "../helper/classNames";
import { handleLogin } from "../helper/helperFunctions";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSpotify } from "../context/SpotifyContext";
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c

type MusicProps = {
  userName: string | null;
  onSearch: (search: string) => void;
};

const Music: React.FC<MusicProps> = ({ userName }) => {
<<<<<<< HEAD
  const { isSpotifyConnected, selectedUri, spotifyToken } = useSpotify();
=======
  const { isSpotifyConnected, selectedUri, spotifyToken } =
    useSpotify();
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c

  return (
    <div className={`${isSpotifyConnected ? containerClassMusic : containerClass}`}>
      <SilentMoonLogo />
      {isSpotifyConnected ? (
        <div className="mt-20 flex-col items-center w-full">
          <SpotifyPlayer
            token={spotifyToken}
            uris={[selectedUri]}
            autoPlay={true}
            play={true}
            showSaveIcon={false}
            styles={{
<<<<<<< HEAD
              bgColor: 'transparent',
              color: '#4A503D',
              loaderColor: '#4A503D',
              sliderColor: '#4A503D',
              trackArtistColor: '#fff',
              trackNameColor: '#fff',
=======
              bgColor: "transparent",
              color: "#4A503D",
              loaderColor: "#4A503D",
              sliderColor: "#4A503D",
              trackArtistColor: "#fff",
              trackNameColor: "#fff",
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
            }}
          />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center">
<<<<<<< HEAD
          <h3 className="text-3xl font-semibold bg-gradient-to-r from-white to-black text-transparent bg-clip-text text-center mb-8 w-[84%]">
            Get the full potential by connecting to Spotify for your playlists.
=======
<h3 className="text-3xl font-semibold bg-gradient-to-r from-white to-black text-transparent bg-clip-text text-center mb-8 w-[84%]">
Get the full potential by connecting to Spotify for your playlists.
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
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
