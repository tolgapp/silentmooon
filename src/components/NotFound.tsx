import BackButton from "./BackButton";
import SilentMoonLogo from "./SilentMoonLogo";

const NotFound = () => {
  return (
    <div className="bg-[#fdfbf5] min-h-screen flex flex-col w-full ">
        <BackButton />
        <SilentMoonLogo />
      <div className="mt-48">
      <img  src="/images/404.png" alt="404 not found illustration" />
      <h3 className="text-center text-8xl font-bold mt-20 text-slate-800">OOOPS! Page not found!</h3>
      </div>
    </div>
  );
};
export default NotFound;
