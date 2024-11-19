import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Structure from "../components/Structure";
import axios from "axios";
import { containerClassMeditation } from "../helper/classNames";

type DataItem = {
  id: string;
  name?: string;
  type: "video" | "audio";
  url?: string;
  videoUrl?: string;
  category: "yoga" | "meditation" | "music";
  image: string;
  title: string;
  level: string;
  time: string;
  description: string;
};

type MeditateProps = {
  data: DataItem[];
  onSearch: (query: string) => void;
  userName: string | null;
};

const Meditation: React.FC<MeditateProps> = ({ userName }) => {
  const [meditateAudio, setMeditateAudio] = useState<DataItem[]>([]);
  const [isSpotified, setIsSpotified] = useState(false);

  const fetchMeditateData = async () => {
    try {
      const response = await axios.get("/meditation", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data) {
        setMeditateAudio(
          response.data.map((meditate: DataItem) => ({
            ...meditate,
            url: `${meditate.videoUrl}`,
            image: `${meditate.image}`,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching yoga videos:", error);
    }
  };

  useEffect(() => {
    fetchMeditateData();
  }, []);

  return (
    <div>
      <Structure
        title={"Meditate"}
        description={
          "Audio-only meditation techniques to help you minimize your screen time and practice on the go."
        }
      />
      {isSpotified ? (
        <>
          <h2>Welcome Spotifyer</h2>
          
        </>
      ) : (
        <div className={containerClassMeditation}>
          <h3 className="text-3xl font-semibold text-gray-600 text-balance text-center mb-8">
          Audio guides only after successfull authentication with spotify.
          </h3>
          <img
            src="/images/spotify-login.png"
            alt="Spotify Login"
            className="h-16 w-auto"
          />
        </div>
      )}
      <Navbar userName={userName} />
    </div>
  );
};
export default Meditation;
