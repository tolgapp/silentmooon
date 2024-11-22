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

// Funktion zum Abrufen der Daten von der API, abhängig von der Kategorie
const fetchData = async (category: string) => {
  const response = await axios.get(`/${category}`);
  return response.data;
};

function App() {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("home");
  const navigate = useNavigate();

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
      const response = await axios.get(`/settings`, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.settings.days) {
        setSelectedDays(response.data.settings.days);
      }
    } catch (error) {
      console.error("Error loading days from database:", error);
    }
  };

  const toggleDay = (dayId: number) => {
    setSelectedDays((prev) => {
      const updatedDays = prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId];
      return updatedDays.sort((a, b) => a - b);
    });
  };

  useEffect(() => {
    loadDaysFromDatabase();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const getData = async () => {
      try {
        const dataFromDb = await fetchData(category);
        setData(dataFromDb);
        setFilteredData(dataFromDb);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [category, isLoggedIn]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);


    if (typeof data === "string") {
      const lowerCaseData = data.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();

      if (lowerCaseData.includes(lowerCaseQuery)) {
        setFilteredData([data]);
      } else {
        setFilteredData([]);
      }
    } else {
      console.error("Data is not a string:", data);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${VITE_API_URL}/api/logout`,
        {},
        { withCredentials: true }
      );

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
          <Route
            path="/home"
            element={<Home userName={userName} onSearch={handleSearch} />}
          />
          <Route
            path="/userpage"
            element={
              <UserPage
                selectedDays={selectedDays}
                toggleDay={toggleDay}
                userName={userName}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/yoga"
            element={
              <Yoga
                data={filteredData}
                onSearch={handleSearch}
                userName={userName}
              />
            }
          />
          <Route
            path="/meditation"
            element={
              <Meditation
                data={filteredData}
                onSearch={handleSearch}
                userName={userName}
              />
            }
          />
          <Route
            path="/music"
            element={
              <Music
                data={filteredData}
                onSearch={handleSearch}
                userName={userName}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
