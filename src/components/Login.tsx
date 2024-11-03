import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import BackButton from "./BackButton";
import { useState } from "react";

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

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (formData.email && formData.password) {
        setIsLoggedIn(true);
        navigate("/welcome");
      } else {
        throw new Error("Please fill in all fields");
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="bg-[url('/images/motiveBg.jpg')] w-full bg-no-repeat bg-contain  min-h-screen flex flex-col items-center justify-center bg-[#FEFCF8] gap-4">
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
