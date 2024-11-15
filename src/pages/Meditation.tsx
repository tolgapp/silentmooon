import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PreviewBox from "../components/PreviewBox";
import Structure from "../components/Structure";
import axios from "axios";

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
  const [meditateAudio, setMeditateAudi] = useState<DataItem[]>([]);

  const fetchMeditateData = async () => {
    try {
      const response = await axios.get("/meditation", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data) {
        setMeditateAudi(
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
      <div className="pr-10 pl-10 w-full pb-48">
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          {meditateAudio.map((video) => (
            <PreviewBox
              key={video.id}
              title={video.title}
              image={import.meta.env.VITE_API_URL + video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={video.url}
            />
          ))}
        </div>
      </div>
      <Navbar userName={userName} />
    </div>
  );
};
export default Meditation;
