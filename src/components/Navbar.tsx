import yogaIcon from "/images/yoga.png";
import meditationIcon from "/images/meditation.png";
import homeIcon from "/images/home.png";
import musicIcon from "/images/music.png";
import userIcon from "/images/profile.svg";
import { Link, useLocation } from "react-router-dom";

type NavbarProps = {
  userName: string | null;
};

const Navbar: React.FC<NavbarProps> = ({ userName }) => {

  const {pathname} = useLocation()

  const navItems = [
    { name: "Yoga", icon: yogaIcon, link: "/yoga" },
    { name: "Meditate", icon: meditationIcon, link: "/meditation" },
    { name: "Home", icon: homeIcon, link: "/home" },
    { name: "Music", icon: musicIcon, link: "/music" },
    { name: userName, icon: userIcon, link: "/userpage" },
  ];

  return (
    <div className="flex justify-between items-center fixed bottom-0 w-full bg-[#fff] px-4 py-2 md:py-4 border-t border-gray-300 min-h-32 z-50">
      {navItems.map((item, index) => (
        item.link && (
          <Link key={index} to={item.link} className={`flex flex-col items-center justify-center flex-1`}>
            {item.icon && (
              <img src={item.icon} alt={item.name || undefined} className={`${pathname === item.link ? "white" : ""} w-8 h-8 mb-2`} />
            )}
            <span className={`text-slate-500 text-lg`}>{item.name}</span>
          </Link>
        ) 
      ))}
    </div>
  );
};

export default Navbar;
