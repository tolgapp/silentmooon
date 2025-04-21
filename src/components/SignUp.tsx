import axios from "axios";
import { useState } from "react";
import BackButton from "./BackButton";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/login", {
          state: { message: "Registration successful! Please login." },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server error:", error.response.data);
          console.error("Status:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="bg-[url('/images/motiveBg.jpg')] bg-no-repeat bg-contain min-h-screen flex flex-col items-center justify-center bg-[#FEFCF8] gap-4">
      <BackButton />
      <div className="greeting flex mb-48">
        <h2 className="text-5xl tracking-wider font-bold text-[#4A503D]">
          Create your account
        </h2>
      </div>
      <form
        className="login-data flex flex-col items-center gap-4 w-full pl-6 pr-6"
        onSubmit={handleSubmit}
      >
        <Input
          placeholderName="NAME"
          inputType="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          placeholderName="SURNAME"
          inputType="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />
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
        <Button text="REGISTER" type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
