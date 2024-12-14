import { useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import WelcomePage from "./components/WelcomePage";
import SettingsPage from "./components/SettingsPage";
import UserPage from "./pages/UserPage";
import LandingPage from "./pages/LandingPage";
import Yoga from "./pages/Yoga";
import Meditation from "./pages/Meditation";
import Music from "./pages/Music";
import { SpotifyProvider } from "./context/SpotifyContext";
import SilentMoonLogo from "./components/SilentMoonLogo";

type ProtectedProps = {
  isLoggedIn: boolean;
};

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:10000/";
axios.defaults.withCredentials = true;

const ProtectedRoute: React.FC<ProtectedProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [time, setTime] = useState<string>("17:00");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [isMedium, setIsMedium] = useState(true);


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

  const toggleDay = (day: number) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`/logout`, {}, { withCredentials: true });

      setIsLoggedIn(false);
      setUserName(null);

      localStorage.clear();
      sessionStorage.clear();

      navigate("/");
    } catch (error) {
      console.error(
        "Fehler beim Logout:",
        error instanceof Error ? error.message : error
      );
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get("/settings", { withCredentials: true });
      setSelectedDays(response.data.days);
      setTime(response.data.time);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const saveSettings = async (days: number[], time: string) => {
    try {
      await axios.post(
        "/api/settings",
        { days, time },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setSelectedDays(days);
      setTime(time);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setIsMedium((prev) => !prev);
    }, 1500); // Wechsel alle 1 Sekunde

    return () => clearInterval(interval); // Cleanup beim Unmount
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col max-h-screen items-center justify-center w-full">
        <SilentMoonLogo />
        <h2
          className={`text-3xl ${
            isMedium ? "" : "text-red-800"
          } mt-60 text-red-500 transition-all duration-500`}
        >
          Loading...
        </h2>
        <details className="px-14 flex flex-col items-center justify-center w-full mt-20 rounded-lg">
          <summary className="cursor-pointer text-left font-semibold text-2xl">
            Please note: The backend is hosted on Render.com, and their free
            tier automatically spins down when idle.
          </summary>
          <h3 className="text-balance text-2xl text-center mt-4">
            Additional Information:
          </h3>
          <img
            className="w-full mt-4 rounded-lg"
            src="/screenshots/render.png"
            alt="render.com free tier info"
          />
        </details>
      </div>
    );
  }
  
  

  return (
    <>
      <SpotifyProvider
        navigate={(path) => (window.location.href = path)}
        pathname={window.location.pathname}
      >
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
                <SettingsPage
                  selectedDays={selectedDays}
                  toggleDay={(day) =>
                    setSelectedDays((prev) =>
                      prev.includes(day)
                        ? prev.filter((d) => d !== day)
                        : [...prev, day]
                    )
                  }
                  time={time}
                  setTime={setTime}
                  saveSettings={saveSettings}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  userName={userName}
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/userpage"
              element={
                <UserPage
                  selectedDays={selectedDays}
                  toggleDay={toggleDay}
                  userName={userName}
                  handleLogout={handleLogout}
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/yoga"
              element={
                <Yoga
                  onSearch={handleSearch}
                  userName={userName}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/meditation"
              element={
                <Meditation
                  onSearch={handleSearch}
                  userName={userName}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/music"
              element={<Music onSearch={handleSearch} userName={userName} />}
            />
          </Route>
        </Routes>
      </SpotifyProvider>
    </>
  );
}

export default App;
