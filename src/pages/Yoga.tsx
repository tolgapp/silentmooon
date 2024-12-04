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
  searchQuery: string;
};

const Yoga: React.FC<YogaProps> = ({ userName, onSearch, searchQuery }) => {
  const [yogaVideos, setYogaVideos] = useState<DataItem[]>([]);
  const [filteredYogaVideos, setFilteredYogaVideos] = useState<DataItem[]>([]);
  const [activeIcon, setActiveIcon] = useState("All");
  const [contentId, setContentId] = useState<string | null>(null); 
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const userId = localStorage.getItem("userId") || "";;

  const fetchYogaVideos = async () => {
    try {
      const response = await axios.get("/yogaVideos", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data) {
        setYogaVideos(response.data);
      }
    } catch (error) {
      console.error("Error fetching yoga videos:", error);
    }
  };

  const fetchFavoriteStatus = async () => {
    if (!userId || !contentId) return;

    try {
      const response = await axios.get("/favoritevideos", {
        params: { userId, contentId },
      });

      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      console.error("Error fetching favorite status:", error);
    }
  };

  const filterYogaVideos = async () => {
    if (activeIcon === "All" || activeIcon === "") {
      setFilteredYogaVideos(yogaVideos);
    } else if (activeIcon === "Favorites") {
      try {
        const response = await axios.get("/favorites", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setFilteredYogaVideos(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    } else {
      const filtered = yogaVideos.filter((video) =>
        video.types.includes(activeIcon)
      );
      setFilteredYogaVideos(filtered);
    }
  };

  useEffect(() => {
    let filtered = yogaVideos;

    if (searchQuery) {
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredYogaVideos(filtered);
  }, [searchQuery, activeIcon, yogaVideos]);

  useEffect(() => {
    fetchYogaVideos();
  }, []);

  useEffect(() => {
    fetchFavoriteStatus();
  }, [contentId]); 


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
        <div className="flex flex-wrap items-center gap-8 mt-10 transition-all duration-900 ease-in">
          {filteredYogaVideos.map((video) => (
            <PreviewBox
              key={video.id}
              title={video.title}
              image={video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={video.videoUrl}
              userId={userId}
              onClick={() => setContentId(video.videoUrl)}
            />
          ))}
        </div>
      </div>
      <Navbar userName={userName} />
    </div>
  );
};

export default Yoga;