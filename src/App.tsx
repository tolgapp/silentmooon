import { useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import WelcomePage from "./components/WelcomePage";
import SettingsPage from "./components/SettingsPage";
import UserPage from "./components/UserPage";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/protected");
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
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
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/userpage"
              element={<UserPage onLogout={handleLogout} />}
            />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
