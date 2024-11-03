import { Link } from "react-router-dom";
import Button from "../components/Button";
import SilentMoonLogo from "../components/SilentMoonLogo";

const Home = () => {
  return (
    <div className="flex flex-col relative min-h-screen">
      <SilentMoonLogo />
      <div className="flex-1">
        <img
          src="/images/Frame.png"
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto bg-white p-6 flex flex-col">
        <div className="space-y-4 flex items-center flex-col">
          <h2 className="text-5xl font-medium">We are what we do</h2>
          <p className="max-w-[30rem] text-center break-words text-2xl">
            Thousand of people are using silent moon for meditation and yoga
            classes.
          </p>
        </div>
        <div className="space-y-4 flex items-center flex-col ">
          <Button text={"SIGN UP"} />
          <p className="text-xl">
            ALREADY HAVE AN ACCOUNT?
            <Link className="text-red-400 text-xl pl-2" to={"/login"}>
              LOG IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
