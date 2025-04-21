<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import WelcomePage from './components/WelcomePage';
import SettingsPage from './components/SettingsPage';
import UserPage from './pages/UserPage';
import LandingPage from './pages/LandingPage';
import Yoga from './pages/Yoga';
import Meditation from './pages/Meditation';
import Music from './pages/Music';
import { SpotifyProvider } from './context/SpotifyContext';
import NotFound from './components/NotFound';
import { Analytics } from '@vercel/analytics/react';
=======
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
import NotFound from "./components/NotFound";
import { Analytics } from "@vercel/analytics/react";
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c

type ProtectedProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
};

<<<<<<< HEAD
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:10000/';
axios.defaults.withCredentials = true;

const ProtectedRoute: React.FC<ProtectedProps> = ({ isLoggedIn, isLoading }) => {
  if (isLoading) {
    return null;
=======
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:10000/";
axios.defaults.withCredentials = true;

const ProtectedRoute: React.FC<ProtectedProps> = ({
  isLoggedIn,
  isLoading,
}) => {
  if (isLoading) {
    return null; // oder einen Loading-Indikator
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
<<<<<<< HEAD
  const [time, setTime] = useState<string>('17:00');
  const [searchQuery, setSearchQuery] = useState<string>('');
=======
  const [time, setTime] = useState<string>("17:00");
  const [searchQuery, setSearchQuery] = useState<string>("");
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
<<<<<<< HEAD
        const response = await axios.get('/protected');
        if (response.status === 200) {
          setIsLoggedIn(true);
          const userName = response.data.userName;
          const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
=======
        const response = await axios.get("/protected");
        if (response.status === 200) {
          setIsLoggedIn(true);
          const userName = response.data.userName;
          const capitalizedUserName =
            userName.charAt(0).toUpperCase() + userName.slice(1);
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
          setUserName(capitalizedUserName);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
<<<<<<< HEAD
        console.error('Authentication check failed:', error);
=======
        console.error("Authentication check failed:", error);
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn]);

  const toggleDay = (day: number) => {
<<<<<<< HEAD
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
=======
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
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

<<<<<<< HEAD
      navigate('/');
    } catch (error) {
      console.error('Fehler beim Logout:', error instanceof Error ? error.message : error);
=======
      navigate("/");
    } catch (error) {
      console.error(
        "Fehler beim Logout:",
        error instanceof Error ? error.message : error
      );
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
    }
  };

  const fetchSettings = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('/settings', { withCredentials: true });
      setSelectedDays(response.data.days);
      setTime(response.data.time);
    } catch (error) {
      console.error('Error fetching settings:', error);
=======
      const response = await axios.get("/settings", { withCredentials: true });
      setSelectedDays(response.data.days);
      setTime(response.data.time);
    } catch (error) {
      console.error("Error fetching settings:", error);
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
    }
  };

  const saveSettings = async (days: number[], time: string) => {
    try {
      await axios.post(
<<<<<<< HEAD
        '/api/settings',
        { days, time },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
=======
        "/api/settings",
        { days, time },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
        }
      );
      setSelectedDays(days);
      setTime(time);
    } catch (error) {
<<<<<<< HEAD
      console.error('Error saving settings:', error);
=======
      console.error("Error saving settings:", error);
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <>
      <SpotifyProvider
<<<<<<< HEAD
        navigate={path => (window.location.href = path)}
=======
        navigate={(path) => (window.location.href = path)}
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
        pathname={window.location.pathname}
      >
        <Analytics />
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
<<<<<<< HEAD
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading} />}>
            {' '}
            <Route path="/welcome" element={<WelcomePage userName={userName} />} />
=======
          <Route
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading} />
            }
          >
            {" "}
            <Route
              path="/welcome"
              element={<WelcomePage userName={userName} />}
            />
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
            <Route
              path="/settings"
              element={
                <SettingsPage
                  selectedDays={selectedDays}
<<<<<<< HEAD
                  toggleDay={day =>
                    setSelectedDays(prev =>
                      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
=======
                  toggleDay={(day) =>
                    setSelectedDays((prev) =>
                      prev.includes(day)
                        ? prev.filter((d) => d !== day)
                        : [...prev, day]
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
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
<<<<<<< HEAD
                <Home userName={userName} onSearch={handleSearch} searchQuery={searchQuery} />
=======
                <Home
                  userName={userName}
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                />
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
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
<<<<<<< HEAD
                <Yoga onSearch={handleSearch} userName={userName} searchQuery={searchQuery} />
=======
                <Yoga
                  onSearch={handleSearch}
                  userName={userName}
                  searchQuery={searchQuery}
                />
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
              }
            />
            <Route
              path="/meditation"
              element={
<<<<<<< HEAD
                <Meditation onSearch={handleSearch} userName={userName} searchQuery={searchQuery} />
              }
            />
            <Route path="/music" element={<Music onSearch={handleSearch} userName={userName} />} />
=======
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
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SpotifyProvider>
    </>
  );
}

export default App;
