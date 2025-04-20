import React from "react";
import { useLocation } from "react-router-dom";

type Playlist = {
  id: string;
  name?: string;
  image?: string;
  images?: { url: string }[];
  uri: string;
};

type PlaylistCardProps = {
  playlist: Playlist;
  placeholder: string;
  handleViewTracks: (id: string, uri: string) => void;
  index: number;
};

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  placeholder,
  handleViewTracks,
  index,
}) => {
  const imageSrc =
    playlist.image || playlist.images?.[0]?.url || placeholder;

    const {pathname} = useLocation()

  return (
    <div
      className="flex flex-col w-64 rounded-2xl shadow-lg"
      key={`${playlist.id}-${index}`}
    >
      <img
        src={imageSrc}
        alt={playlist.name || "Unknown Playlist"}
        className="w-full h-64 rounded-t-xl"
      />
      <button
        className="w-full p-4 bg-[#8E9775] text-white rounded-b-lg text-2xl font-semibold hover:bg-[#8E9775]"
        onClick={() => handleViewTracks(playlist.id, playlist.uri)}
      >
        {pathname === "/userpage" ? "Play Playlist" : "View Tracks"}
      </button>
    </div>
  );
};

export default PlaylistCard;
