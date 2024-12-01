import { useEffect, useState } from "react";
import DayPicker from "../components/DayPicker";
import Button from "../components/Button";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { UserPageCombined } from "../helper/props";
import Recommended from "../components/Recommended";

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
}) => {
  const [value, setValue] = useState<string>("12:00");
  const [userValues, setUserValues] = useState<UserValues>({
    time: "",
    days: [],
  });
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [favoriteVideos, setFavoriteVideos] = useState<DataItem>([]);
  const [contentId, setContentId] = useState<string | null>(null);
  const userId = localStorage.getItem("userId") || "";

  const fetchFavoriteVideos = async () => {
    if (!userId) {
      console.warn("User ID is missing");
      return;
    }
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

  useEffect(() => {
    fetchFavoriteVideos();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await axios.get(`${VITE_API_URL}/api/settings`, {
        withCredentials: true,
      });
      console.log(response.data)
      setUserValues(response.data.days);
      setValue(response.data.time);
    };

    fetchSettings();
  }, []);

  // Save updated settings

  const onSave = async () => {
    try {
      const response = await axios.put(
        `/settings`,
        { ...userValues, days: selectedDays },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setUserValues(response.data.days)
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
      <div className="flex items-center w-full mt-36 px-12 justify-between">
        {/* FIXME: Getting the user image, if the user has uploaded one to the db */}
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
        <div className="flex overflow-x-auto gap-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-8">
          {favoriteVideos.map((video) => (
            <Recommended
              key={video.id}
              title={video.title}
              image={VITE_API_URL + video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={VITE_API_URL + video.videoUrl}
              userId={userId}
              onClick={() => setContentId(video.videoUrl)}
            />
          ))}
        </div>
      </section>
      <section className="w-full flex flex-col my-16">
        <h3 className="text-4xl font-semibold mb-10 mt-4 px-8 text-[#4A503D]">
          Favorite Meditations
        </h3>
        <div className="flex overflow-x-auto gap-10 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-8">
          {favoriteVideos.map((video) => (
            <Recommended
              key={video.id}
              title={video.title}
              image={VITE_API_URL + video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={VITE_API_URL + video.videoUrl}
              userId={userId}
              onClick={() => setContentId(video.videoUrl)}
            />
          ))}
        </div>
      </section>
      {/* FIXME: Styling and adding update functionality also for the time */}
      <section className="flex flex-col px-8 gap-6 pb-48">
        <h2 className="text-4xl font-semibold mb-4 text-[#4A503D]">
          Update your selected days
        </h2>
        <DayPicker selectedDays={selectedDays} toggleDay={toggleDay} />
        <Button text="SAVE" type="submit" onClick={onSave} />
      </section>
      <Navbar userName={userName} />
    </div>
  );
};

export default UserPage;
