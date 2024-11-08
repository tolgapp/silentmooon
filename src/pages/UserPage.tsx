import { useEffect, useState } from "react";
import DayPicker from "../components/DayPicker";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

type UserValues = {
  time: string;
  days: number[];
};

type UserPageProps = {
  selectedDays: number[];
  toggleDay: (dayId: number) => void;
  userName: string;
};

const UserPage: React.FC<UserPageProps> = ({ selectedDays, toggleDay, userName }) => {
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
      <h2 className="text-4xl font-semibold mb-4">Update your selected days</h2>
      <DayPicker selectedDays={selectedDays} toggleDay={toggleDay} />
      <Button text="SAVE" type="submit" onClick={onSave} />
      <Navbar userName={userName} />
    </div>
  );
};

export default UserPage;
