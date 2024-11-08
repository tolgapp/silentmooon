import yogaIcon from "/images/yoga.png";
import meditationIcon from "/images/meditation.png";
import homeIcon from "/images/home.png";
import musicIcon from "/images/music.png";
import userIcon from "/images/user.png";

type NavbarProps = {
  userName: string;
};

const Navbar: React.FC<NavbarProps> = ({ userName }) => {

  const navItems = [
    { name: "Yoga", icon: yogaIcon },
    { name: "Meditate", icon: meditationIcon },
    { name: "Home", icon: homeIcon },
    { name: "Music", icon: musicIcon },
    { name: userName, icon: userIcon },
  ];

  return (
    <div className="flex justify-between items-center fixed bottom-0 w-full bg-[#fff] px-4 py-2 md:py-4 border-t border-gray-300 min-h-32">
      {navItems.map((item, index) => (
        <div key={index} className="flex flex-col items-center justify-center flex-1">
          {item.icon && (
            <img src={item.icon} alt={item.name} className="w-8 h-8 mb-2" />
          )}
          <span className="text-slate-500  text-lg">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
