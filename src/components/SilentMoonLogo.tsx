import { useLocation } from "react-router-dom";

const SilentMoonLogo = () => {
  const {pathname} = useLocation();
  const isRightLocation = pathname === "/welcome" || pathname === "/music";

  return (
    <h1
      className={`${
        isRightLocation ? "text-white" : "text-gray-600"
      } font-sour tracking-widest font-bold text-xl absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
    >
      SILENT MOON
    </h1>
  );
};

export default SilentMoonLogo;
