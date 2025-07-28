import React, { useState, useEffect } from "react";
import axios from "axios";

type FavoriteProps = {
  contentId?: string;
};

const Favorite: React.FC<FavoriteProps> = ({contentId}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !contentId) return;

    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get("/checkFavoriteStatus", {
          params: { userId, contentId },
        });

        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      } 
    };

    fetchFavoriteStatus();
  }, [userId, contentId, isFavorite]);

  const toggleFavorite = async () => {
    try {
      const endpoint = isFavorite
        ? "/favorites/video/remove"
        : "/favorites/video/add";
  
      const response = await axios.post(endpoint, { userId, contentId });
      if (response.status === 200 || response.status === 204) {
        setIsFavorite((prev) => !prev);
      } else {
        console.error("Failed to toggle favorite:", response.data);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  
 

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer transition-colors duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        className={`absolute top-20 right-12 fill-current ${
          isFavorite ? "text-red-400" : "text-white"
        } `}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

export default Favorite;
