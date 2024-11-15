import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PreviewBox from "../components/PreviewBox";
import Structure from "../components/Structure";

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

type YogaProps = {
  data?: DataItem[];
  onSearch?: (query: string) => void;
  userName: string | null;
};

const Yoga: React.FC<YogaProps> = ({ userName }) => {
  const [yogaVideos, setYogaVideos] = useState<DataItem[]>([]);

  const fetchYogaVideos = async () => {
    try {
      const response = await axios.get("/yogaVideos", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      console.log( response)

      if (response.status === 200 && response.data) {
        setYogaVideos(
          response.data.map((video: DataItem) => ({
            ...video,
            url: `${video.videoUrl}`,
            image: `${video.image}`,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching yoga videos:", error);
    }
  };

  useEffect(() => {
    fetchYogaVideos();
  }, []);

  return (
    <div>
      <Structure
        title="Yoga"
        description="Find your inner zen from anywhere."
      />
      <div className="pr-10 pl-10 w-full pb-48">
        <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
          {yogaVideos.map((video) => (
            <PreviewBox
              key={video.id}
              title={video.title}
              image={import.meta.env.VITE_API_URL + video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={import.meta.env.VITE_API_URL + video.url}
            />
          ))}
        </div>
      </div>
      <Navbar userName={userName} />
    </div>
  );
};

export default Yoga;
