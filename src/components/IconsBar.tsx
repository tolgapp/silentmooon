import all from "/images/all.svg";
import anxious from "/images/anxious.png";
import favorites from "/images/favorites.png";
import kids from "/images/kids.png";
import sleep from "/images/sleep.png";
import { IconsBarProps } from "../helper/props";

const IconsBar: React.FC<IconsBarProps> = ({ activeIcon, setActiveIcon }) => {
  const icons = [
    { name: "All", icon: all },
    { name: "Favorites", icon: favorites },
    { name: "Anxious", icon: anxious },
    { name: "Sleep", icon: sleep },
    { name: "Kids", icon: kids },
  ];

  return (
    <div className="flex justify-between items-center w-full bg-[#fff] px-4 py-2 md:py-4 min-h-32">
      {icons.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center flex-1"
          onClick={() => setActiveIcon(item.name)}
        >
          {item.icon && (
            <img
              src={item.icon}
              alt={item.name}
              className={`w-13 h-13 mb-4 p-6 rounded-[2rem] ${
                activeIcon === item.name ? "bg-[#8E9775]" : "bg-[#A1A4B2]"
              }`}
            />
          )}
          <span className={`text-2xl text-[#A1A4B2]`}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default IconsBar;
