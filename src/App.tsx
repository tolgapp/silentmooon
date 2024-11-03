import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import WelcomePage from "./components/WelcomePage";

import { useState } from "react";
import SettingsPage from "./components/SettingsPage";

type Protected = {
  isLoggedIn: boolean;
}

// ProtectedRoute Component
const ProtectedRoute: React.FC<Protected> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
