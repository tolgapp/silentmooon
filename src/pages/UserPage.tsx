import { useEffect, useState } from "react";
import DayPicker from "../components/DayPicker";
import Button from "../components/Button";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import { UserPageCombined } from "../helper/props";
import Recommended from "../components/Recommended";
import TimePicker from "react-ios-time-picker";

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
  const [favoriteVideos, setFavoriteVideos] = useState<DataItem>([]);
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
      try {
        const response = await axios.get(`/settings`, {
          withCredentials: true,
        });
        setUserValues({
          time: response.data.time,
          days: response.data.days,
        });
        setValue(response.data.time);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Save updated settings
  const onSave = async () => {
    try {
      const response = await axios.put(
        `/settings`,
        { time: value, days: selectedDays },
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
  
  useEffect(() => {
    if (userValues.days.length > 0) {
      userValues.days.forEach((day) => {
        toggleDay(day);
      });
    }
  }, [userValues.days]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <SilentMoonLogo />
      <div className="flex items-center w-full mt-36 px-8 justify-between">
        <section className="flex items-center">
            <img
              src="/images/user.png"
              alt="user image"
              className="h-16 w-16"
            />
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
              image={ video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={ + video.videoUrl}
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
              image={ video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={ video.videoUrl}
              userId={userId}
              onClick={() => setContentId(video.videoUrl)}
            />
          ))}
        </div>
      </section>
      {/* FIXME: Styling and adding update functionality also for the time */}
      <section className="flex flex-col px-8 gap-6 pb-48">
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
