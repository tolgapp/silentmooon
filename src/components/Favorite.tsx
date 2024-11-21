import React, { useState } from "react";
import axios from "axios";

// Favorite.tsx
type FavoriteProps = {
  userId: string; // Die Benutzer-ID
  contentId?: string; // Die ID des Inhalts (Video oder Audio)
};

const Favorite: React.FC<FavoriteProps> = ({ userId, contentId }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false); 
  
  const toogleFavorite = async () => {
    try {
      const response = await axios.post(`/favorites/video/add`, { userId, contentId });

      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }

  };

  return (
    <div 
      onClick={toogleFavorite}
      className="cursor-pointer transition-colors duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        className={`absolute top-20 right-12 fill-current ${isFavorite ? "text-red-400" : "text-white"} `}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  );
};

export default Favorite;