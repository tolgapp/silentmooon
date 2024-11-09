import IconsBar from "./IconsBar"
import SearchBar from "./SearchBar"
import SilentMoonLogo from "./SilentMoonLogo"

const Structure = ({title, description}) => {
  return (
    <div className="flex flex-col items-center">
        <SilentMoonLogo />
        <h2 className="mt-40 text-5xl text-bold">{title}</h2>
        <p className="mt-10 text-2xl text-[#A1A4B2] mb-14 text-center  w-[70%]">{description}</p>
        <IconsBar />
        <SearchBar />
        <div className="daily-calm"></div>
        {/* TODO:  Putting each video container randomly the first 4, then if 3 dots is clicked load more videos */}
    </div>
  )
}
export default Structure