import { useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import WelcomePage from "./components/WelcomePage";
import SettingsPage from "./components/SettingsPage";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";

type ProtectedProps = {
  isLoggedIn: boolean;
};

axios.defaults.baseURL = "http://localhost:5002/api";
axios.defaults.withCredentials = true;

const ProtectedRoute: React.FC<ProtectedProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [saveTimeout, setSaveTimeout] = useState<null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/protected");
        if (response.status === 200) {
          setIsLoggedIn(true);
          const userName = response.data.userName;
          const capitalizedUserName =
            userName.charAt(0).toUpperCase() + userName.slice(1);
          setUserName(capitalizedUserName);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn]);

  const loadDaysFromDatabase = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/settings`, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.settings.days) {
        setSelectedDays(response.data.settings.days);
      }
    } catch (error) {
      console.error("Error loading days from database:", error);
    }
  };

  const updateDaysInDatabase = async (days: number[]) => {
    try {
      await axios.post(
        `${VITE_API_URL}/api/settings`,
        { days },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error updating days in database:", error);
    }
  };

  const debouncedSave = (days: number[]) => {
    if (saveTimeout) clearTimeout(saveTimeout);

    const timeout = setTimeout(() => {
      updateDaysInDatabase(days);
    }, 2000);

    setSaveTimeout(timeout);
  };

  const toggleDay = (dayId: number) => {
    setSelectedDays((prev) => {
      const updatedDays = prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId];
      const sortedDays = updatedDays.sort((a, b) => a - b);

      debouncedSave(sortedDays);
      return sortedDays;
    });
  };

  useEffect(() => {
    loadDaysFromDatabase();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/welcome" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route
            path="/welcome"
            element={<WelcomePage userName={userName} />}
          />
          <Route
            path="/settings"
            element={
              <SettingsPage toggleDay={toggleDay} selectedDays={selectedDays} />
            }
          />
          <Route path="/home" element={<Home userName={userName}/>} />
          <Route
            path="/userpage"
            element={
              <UserPage selectedDays={selectedDays} toggleDay={toggleDay} userName={userName}/>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
