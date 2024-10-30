import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
