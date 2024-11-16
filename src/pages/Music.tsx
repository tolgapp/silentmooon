import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";

type DataItem = {
  id: string;
  name: string;
  type: "video" | "audio";
  url: string;
  category: "yoga" | "meditation" | "music";
};

type MusicProps = {
  data: DataItem[];
  onSearch: (query: string) => void;
  userName: string | null;
};

const Music: React.FC<MusicProps> = ({ userName }) => {
  const containerClass = `
    h-screen pb-44 flex flex-col justify-center items-center 
    px-8 bg-[url('/images/spotify-background.jpeg')] 
    bg-no-repeat bg-center bg-cover
  `;

  return (
    <div className={containerClass}>
      <SilentMoonLogo />
      <h3 className="text-2xl font-semibold text-gray-600 text-balance text-center mb-8">Get the full potential with Connecting to Spotify for Audio Meditation.</h3>
      <img src="/images/spotify-login.png" alt="Spotify Login" className="h-16 w-auto" />
      <Navbar userName={userName} />
    </div>
  );
};

export default Music;
