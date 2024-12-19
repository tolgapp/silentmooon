import SilentMoonLogo from "./SilentMoonLogo";

const LoadingScreen = () => (
  <div className="flex flex-col max-h-screen items-center justify-center w-full">
    <SilentMoonLogo />
    <h2 className={`text-5xl mt-60 text-red-500 transition-all duration-500`}>
      Loading...
    </h2>
    <details className="px-14 flex flex-col items-center justify-center w-full mt-20 rounded-lg">
      <summary className="cursor-pointer text-left font-semibold text-2xl">
        Please note: The backend is hosted on Render.com, and their free tier
        automatically spins down when idle.
      </summary>
      <h3 className="text-balance text-2xl text-center mt-4">
        Additional Information:
      </h3>
      <img
        className="w-full mt-4 rounded-lg"
        src="/screenshots/render.png"
        alt="render.com free tier info"
      />
    </details>
  </div>
);

export default LoadingScreen;
