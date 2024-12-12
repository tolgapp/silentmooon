import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import BackButton from "./BackButton";
import { useState } from "react";
import axios from "axios";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginProps = {
  setIsLoggedIn: (value: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await axios.post(
        "/login",
        formData,
        { withCredentials: true }
      );
  
      if (response.status === 200 && response.data.user) {
        const { user } = response.data;
  
        localStorage.setItem("userId", user.id);
        setIsLoggedIn(true);
  
        if (user.hasCompletedSettings) {
          navigate("/home");
        } else {
          navigate("/settings");
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.response?.data || "Login failed. Please try again.");
      setIsLoggedIn(false);
    }
  };
  

  return (
    <div className="bg-[url('/images/motiveBg.jpg')] w-full bg-no-repeat bg-contain min-h-screen flex flex-col items-center justify-center bg-[#FEFCF8] gap-4">
      <BackButton />
      <div className="greeting flex mb-48">
        <h2 className="text-6xl tracking-wider font-bold text-[#4A503D]">
          Welcome Back!
        </h2>
      </div>
      <form
        className="login-data flex flex-col items-center gap-4 w-full pl-6 pr-6"
        onSubmit={handleLogin}
      >
        <Input
          placeholderName="EMAIL"
          inputType="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          placeholderName="PASSWORD"
          inputType="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button text="LOGIN" type="submit" />
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <p className="text-xl">
        DON'T HAVE AN ACCOUNT YET?
        <Link className="text-red-400 text-xl pl-1" to="/signup">
          SIGN UP
        </Link>
      </p>
    </div>
  );
};

export default Login;
