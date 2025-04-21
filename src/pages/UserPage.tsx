import { useEffect, useState } from "react";
import DayPicker from "../components/DayPicker";
import Button from "../components/Button";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { DataItem, UserPageCombined } from "../helper/props";
import Recommended from "../components/Recommended";
import PlaylistCard from "../components/PlaylistCard";
import { useSpotify } from "../context/SpotifyContext";

type UserValues = {
  time: string;
  days: number[];
};

const UserPage: React.FC<UserPageCombined> = ({
  selectedDays,
  toggleDay,
  userName,
  handleLogout,
  onSearch,
  searchQuery,
}) => {
  const {
    handleTrackUri,
    isSpotifyConnected,
  } = useSpotify();
  const [userValues, setUserValues] = useState<UserValues>({
    time: "18:30",
    days: [],
  });
  const [favoriteVideos, setFavoriteVideos] = useState<DataItem[]>([]);
  const [favoriteAudioGuides, setFavoriteAudioGuides] = useState<DataItem[]>(
    []
  );
  const [filteredVideos, setFilteredVideos] = useState<DataItem[]>([]);
  const [filteredAudioGuides, setFilteredAudioGuides] = useState<DataItem[]>(
    []
  );
  const spotifyToken = localStorage.getItem("spotify_token");
  const userId = localStorage.getItem("userId") || "";
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchFavoriteVideos = async () => {
    try {
      const response = await axios.get(`/favorites`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      setFavoriteVideos(response.data);
    } catch (error) {
      console.error("Error fetching favorite videos:", error);
    }
  };

  const fetchFavoriteAudioGuides = async () => {
    try {
      const response = await axios.get("/user/spotify-favorites/details", {
        headers: { Authorization: `Bearer ${spotifyToken}` },
        params: { userId },
      });
      setFavoriteAudioGuides(response.data || []);
    } catch (error) {
      console.error("Error fetching favorite audio guides:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      setFilteredVideos(
        favoriteVideos.filter((video) =>
          video.title?.toLowerCase().includes(lowercasedQuery)
        )
      );
      setFilteredAudioGuides(
        favoriteAudioGuides.filter((audio) =>
          audio.name?.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFilteredVideos(favoriteVideos);
      setFilteredAudioGuides(favoriteAudioGuides);
    }
  }, [searchQuery, favoriteVideos, favoriteAudioGuides]);

  useEffect(() => {
    fetchFavoriteAudioGuides();
    fetchFavoriteVideos();
  }, []);

  const onSave = async () => {
    try {
      const response = await axios.put(
        `/settings`,
        { time: userValues.time, days: selectedDays },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserValues({
        time: response.data.time,
        days: response.data.days,
      });
    } catch (error: unknown) {
      console.error(
        "Error updating settings:",
        error instanceof Error ? error.message : error
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <SilentMoonLogo />
      <div className="flex items-center w-full mt-36 px-8 justify-between">
        <section className="flex items-center">
          <img src="/images/user.png" alt="user image" className="h-16 w-16" />
          <h3 className="text-5xl font-extrabold pl-8 text-[#4A503D]">
            {userName}
          </h3>
        </section>
        <button
          className="py-4 px-10 bg-red-400 text-white text-2xl rounded-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <SearchBar onSearch={onSearch} />
      <section className="w-full mt-10">
        <h3 className="text-4xl font-semibold mb-10 mt-4 px-8 text-[#4A503D]">
          Favorite Yoga Sessions
        </h3>
        <div
          className={`flex overflow-x-auto gap-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-8 min-h-[200px] ${
            filteredVideos.length === 0 ? "justify-center items-center" : ""
          }`}
        >
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <Recommended
                key={video.id}
                title={video.title}
                image={backendURL + video.image}
                level={video.level}
                time={video.time}
                description={video.description}
                videoUrl={video.videoUrl}
                userId={userId}
              />
            ))
          ) : (
            <p className="text-gray-500 text-xl">No videos found.</p>
          )}
        </div>
      </section>
      <section className="w-full flex flex-col my-10">
        <h3 className="text-4xl font-semibold mb-10 mt-4 px-8 text-[#4A503D]">
          Favorite Meditations
        </h3>
        <div
          className={`flex overflow-x-auto gap-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-8 min-h-[200px] ${
            filteredAudioGuides.length === 0
              ? "justify-center items-center"
              : ""
          }`}
        >
          {filteredAudioGuides.length > 0 ? (
            filteredAudioGuides.map((audio: any, index: number) => (
              <div
                key={audio.id || `playlist-${index}`}
                className="flex-shrink-0"
              >
                <PlaylistCard
                  playlist={audio}
                  placeholder="/images/placeholder.jpg"
                  handleViewTracks={() => handleTrackUri(audio.uri)}
                  index={index}
                />
              </div>
            ))
          ) : isSpotifyConnected ? (
            <p className="text-gray-500 text-2xl">No audio guides found.</p>
          ) : (
            <p className="text-gray-500 text-2xl">
              Connect with Spotify to see your favorites
            </p>
          )}
        </div>
      </section>
      <section className="flex flex-col px-8 py-8 gap-6 pb-48">
        <h2 className="text-3xl font-semibold mb-4 text-[#4A503D]">
          Update your selected days and time
        </h2>
        <DayPicker selectedDays={selectedDays} toggleDay={toggleDay} />
        <Button text="SAVE" type="submit" onClick={onSave} />
      </section>
      <Navbar userName={userName} />
    </div>
  );
};

export default UserPage;
