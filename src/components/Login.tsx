import { Link } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import BackButton from "./BackButton";

const Login = () => {
  return (
    <div className="bg-[url('/images/motiveBg.jpg')] bg-no-repeat bg-contain h-dvh flex flex-col items-center justify-center bg-[#FEFCF8] pr-6 pl-6 gap-4">
      <BackButton />
      <div className="greeting flex mb-48">
        <h2 className="text-6xl tracking-wider font-bold">Welcome Back!</h2>
      </div>
      <div className="login-data flex flex-col items-center gap-4">
        <Input placeholderName={"EMAIL"} inputType={"email"} />
        <Input placeholderName={"PASSWORD"} inputType={"password"} />
        <Button text={"LOGIN"} />
        <p className="text-xl">
          DON'T HAVE AN ACCOUNT YET?{" "}
          <Link className="text-red-400 text-xl pl-1" to={"/signup"}>
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
