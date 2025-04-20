import IconsBar from "./IconsBar";
import SearchBar from "./SearchBar";
import SilentMoonLogo from "./SilentMoonLogo";
import { CombinedStructure } from "../helper/props";

const Structure: React.FC<CombinedStructure> = ({
  title,
  description,
  setActiveIcon,
  activeIcon,
  onSearch,
}) => {
  return (
    <div className="flex flex-col items-center">
      <SilentMoonLogo />
      <h2 className="mt-40 text-5xl text-bold">{title}</h2>
      <p className="mt-10 text-2xl text-[#A1A4B2] mb-14 text-center  w-[70%]">
        {description}
      </p>
      <IconsBar setActiveIcon={setActiveIcon} activeIcon={activeIcon} />
      <SearchBar onSearch={onSearch} />
      <div className="daily-calm"></div>
    </div>
  );
};
export default Structure;
