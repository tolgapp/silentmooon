import axios from "axios";
import React from "react";

type MusicDetailProps = {
  tracks: any[];
  playlistUri: string;
  handleTrackUri: (uri: string) => void;
  onClose: () => void;
  userId: string
};

const MusicDetail: React.FC<MusicDetailProps> = ({
  tracks,
  playlistUri,
  handleTrackUri,
  onClose,
  userId
}) => {

  const addToFavorites = async () => {
    try {
      const contentId = playlistUri.split(":").pop() || playlistUri; 
      const playlistName = tracks[0]?.track?.album?.name || "Unknown Playlist";
  
      await axios.post("/user/spotify-favorites/add", {
        userId,
        contentId, 
        playlistName,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };
  
  

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg overflow-y-auto z-50 transition-transform duration-300 pb-48 animate-slide-up border-t-8"
      style={{ height: "98%" }}
    >
      <div className="flex w-full justify-between">
      <button
        onClick={onClose}
        className="text-right border-2 border-gray-700 rounded-full p-6 text-5xl hover:text-red-500 focus:outline-none"
      >
        &times;
      </button>
      <button onClick={addToFavorites} className="pr-8"><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        className={``}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg></button>
      </div>
      <div className="flex sticky bg-white top-0 z-30 justify-between items-center px-4 py-8 border-b ">
        <h3 className="text-4xl font-semibold">Play the full Playlist</h3>
        <button
          onClick={() => handleTrackUri(playlistUri)}
          className={`py-4 px-8 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg`}
        >
          Play Playlist
        </button>
      </div>
      <div className="p-4">
        {tracks.length > 0 ? (
          <div className="space-y-4">
            {tracks.map((track: any, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <section className="flex items-center gap-4">
                  <img
                    src={track.track.album.images[0].url}
                    alt=""
                    className="h-20"
                  />
                  <p className="text-gray-700 text-xl font-semibold">
                    {track.track.name.slice(0, 24)}
                  </p>
                </section>
                <button
                  onClick={() => handleTrackUri(track.track.uri)}
                  className={`py-4 px-8 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg`}
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
