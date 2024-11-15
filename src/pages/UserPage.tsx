import { useEffect, useState } from "react";
import DayPicker from "../components/DayPicker";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import PreviewBox from "../components/PreviewBox";

type UserValues = {
  time: string;
  days: number[];
};

type UserPageProps = {
  selectedDays: number[];
  toggleDay: (dayId: number) => void;
  userName: string | null;
};

const UserPage: React.FC<UserPageProps> = ({
  selectedDays,
  toggleDay,
  userName,
}) => {
  const [value, setValue] = useState<string>("17:00");
  const [userValues, setUserValues] = useState<UserValues>({
    time: "",
    days: [],
  });
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      const response = await axios.get(`${VITE_API_URL}/api/settings`, {
        withCredentials: true,
      });
      setUserValues(response.data.settings);
      setValue(response.data.settings.time);
    };

    fetchSettings();
  }, []);

  // Save updated settings
  const onSave = async () => {
    try {
      const response = await axios.put(
        `${VITE_API_URL}/api/settings/update`,
        { ...userValues, days: selectedDays },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        navigate("/userpage");
      }
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
      <div className="flex items-center w-full mt-36 ml-24 justify-start">
        {/* FIXME: Getting the user image, if the user has uploaded one to the db */}
        <img src="/images/user.png" alt="user image" className="h-16 w-16" />
        <h3 className="text-6xl font-extrabold pl-8">{userName}</h3>
      </div>
      <SearchBar />
      <section className="flex mt-16 flex-col">
        <h3>Favorite Yoga Sessions</h3>
        {/* Video Component for Yoga */}
        <div className="flex overflow-x-scroll gap-8 w-full whitespace-nowrap mt-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <PreviewBox key={index} />
          ))}
        </div>
      </section>

      <section className="flex mt-16">
        <h3>Favorite Meditations</h3>
        {/* TODO: Video Component for Meditation */}
      </section>
      {/* FIXME: Styling and adding update functionality also for the time */}
      {/* <h2 className="text-4xl font-semibold mb-4">Update your selected days</h2>
      <DayPicker selectedDays={selectedDays} toggleDay={toggleDay} /> 
      <Button text="SAVE" type="submit" onClick={onSave} />*/}
      <Navbar userName={userName} />
    </div>
  );
};

export default UserPage;
