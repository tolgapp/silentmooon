import React from "react";

type MusicDetailProps = {
  tracks: any[];
  playTrack: (previewUrl: string) => void;
  onClose: () => void; 
};

const MusicDetail: React.FC<MusicDetailProps> = ({ tracks, playTrack, onClose }) => {

  console.log(tracks)

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg overflow-y-auto z-50 transition-transform duration-300 pb-48 animate-slide-up"
      style={{ height: "98%" }}
    >
      <div className="flex sticky bg-white top-0 z-30 justify-between items-center px-4 py-2 border-b">
        <h3 className="text-4xl font-semibold">Tracks</h3>
        <button
          onClick={onClose}
          className="text-gray-500 text-5xl hover:text-red-500 focus:outline-none"
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
                <section className="flex items-center gap-4">
                <img src={track.track.album.images[0].url} alt="" className="h-20"/>
                <p className="text-gray-700 text-xl font-semibold">{track.track.name}</p>
                </section>
                <button
                  onClick={() => playTrack(track.track.preview_url)}
                  className="py-4 px-8 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600"
                >
                  Play 
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
