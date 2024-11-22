import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PreviewBox from "../components/PreviewBox";
import Structure from "../components/Structure";

type DataItem = {
  id: string;
  title: string;
  level: string;
  time: string;
  image: string;
  videoUrl: string;
  description: string;
  types: string[];
};

type YogaProps = {
  userName: string | null;
  onSearch: (search: string) => void;
};

const Yoga: React.FC<YogaProps> = ({ userName, onSearch }) => {
  const [yogaVideos, setYogaVideos] = useState<DataItem[]>([]);
  const [filteredYogaVideos, setFilteredYogaVideos] = useState<DataItem[]>([]);
  const [activeIcon, setActiveIcon] = useState("All");
  const backendURL = import.meta.env.VITE_API_URL

  const filterYogaVideos = () => {
    if (activeIcon === "All" || activeIcon === "") {
      setFilteredYogaVideos(yogaVideos);
    } else {
      const filtered = yogaVideos.filter((video) =>
        video.types.includes(activeIcon)
      );
      setFilteredYogaVideos(filtered);
    }
  };

  const fetchYogaVideos = async () => {
    try {
      const response = await axios.get("/yogaVideos", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data) {
        setYogaVideos(response.data);
        setFilteredYogaVideos(response.data);
      }
    } catch (error) {
      console.error("Error fetching yoga videos:", error);
    }
  };

  useEffect(() => {
    fetchYogaVideos();
  }, []);

  useEffect(() => {
    filterYogaVideos();
  }, [activeIcon, yogaVideos]);

  return (
    <div>
      <Structure
        title="Yoga"
        description="Find your inner zen from anywhere."
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
        onSearch={onSearch}
      />
      <div className="pr-10 pl-10 w-full pb-48">
        <div className="flex flex-wrap  items-center gap-8 mt-10 transition-all duration-900 ease-in">
          {filteredYogaVideos.map((video) => (
            <PreviewBox
              key={video.id}
              title={video.title}
              image={backendURL + video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={backendURL + video.videoUrl}
            />
          ))}
        </div>
      </div>
      <Navbar userName={userName} />
    </div>
  );
};

export default Yoga;
