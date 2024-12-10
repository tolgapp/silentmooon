import React, { useState, useEffect } from "react";
import axios from "axios";

type MusicDetailProps = {
  tracks: any[];
  playlistUri: string;
  handleTrackUri: (uri: string) => void;
  onClose: () => void;
  userId: string;
};

const MusicDetail: React.FC<MusicDetailProps> = ({
  tracks,
  playlistUri,
  handleTrackUri,
  onClose,
  userId,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const contentId = playlistUri.split(":").pop() || playlistUri; 

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(`/user/spotify-favorites/status`, {
          params: { userId, contentId },
        });
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [userId, contentId]);

  const toggleFavorites = async () => {
    try {
      if (isFavorite) {
        await axios.post("/user/spotify-favorites/remove", {
          userId,
          contentId,
        });
        setIsFavorite(false);
      } else {
        const playlistName = tracks[0]?.track?.album?.name || "Unknown Playlist";
        await axios.post("/user/spotify-favorites/add", {
          userId,
          contentId,
          playlistName,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorites:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white rounded-t-2xl shadow-lg z-50 overflow-y-auto transition-transform transform translate-y-full animate-[slide-up_300ms_ease-out_forwards]">
      <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
        <button
          onClick={onClose}
          className="text-gray-700 text-4xl font-bold rounded-full hover:text-red-500 focus:outline-none"
        >
          &times;
        </button>
        <button onClick={toggleFavorites} className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            className={isFavorite ? "fill-red-500" : "fill-gray-500"}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Play the full Playlist</h3>
          <button
            onClick={() => handleTrackUri(playlistUri)}
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Play Playlist
          </button>
        </div>
        {tracks.length > 0 ? (
          <div className="space-y-4">
            {tracks.map((track: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={track.track.album.images[0]?.url}
                    alt=""
                    className="h-16 w-16 rounded"
                  />
                  <p className="text-gray-700 text-lg font-medium">
                    {track.track.name.slice(0, 24)}
                  </p>
                </div>
                <button
                  onClick={() => handleTrackUri(track.track.uri)}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Play Track
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tracks available.</p>
        )}
      </div>
    </div>
  );
};

export default MusicDetail;
