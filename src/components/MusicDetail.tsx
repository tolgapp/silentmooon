import React from "react";

type MusicDetailProps = {
  tracks: any[];
  playTrack: (previewUrl: string) => void;
  onClose: () => void; // Close-Funktion
};

const MusicDetail: React.FC<MusicDetailProps> = ({ tracks, playTrack, onClose }) => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg overflow-y-auto z-50 transition-transform duration-300 pb-48"
      style={{ height: "95%" }}
    >
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h3 className="text-2xl font-semibold">Tracks</h3>
        <button
          onClick={onClose}
          className="text-gray-500 text-2xl hover:text-red-500 focus:outline-none"
        >
          &times;
        </button>
      </div>
      <div className="p-4">
        {tracks.length > 0 ? (
          <div className="space-y-4">
            {tracks.map((track: any) => (
              <div
                key={track.track.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <p className="text-gray-700">{track.track.name}</p>
                <button
                  onClick={() => playTrack(track.track.preview_url)}
                  className="py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Play Preview
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
