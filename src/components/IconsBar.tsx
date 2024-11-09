import all from "/images/all.png";
import anxious from "/images/anxious.png";
import favorites from "/images/favorites.png";
import kids from "/images/kids.png";
import sleep from "/images/sleep.png";

const IconsBar = () => {
  const icons = [
    { name: "All", icon: all },
    { name: "Favorites", icon: favorites },
    { name: "Anxious", icon: anxious },
    { name: "Sleep", icon: sleep },
    { name: "Kids", icon: kids },
  ];

  return (
    <div className="flex justify-between items-center  w-full bg-[#fff] px-4 py-2 md:py-4  min-h-32">
      {icons.map((item) => (
        <div className="flex flex-col items-center justify-center flex-1">
          {item.icon && (
            <img
              src={item.icon}
              alt={item.name}
              className="w-13 h-13 mb-4 bg-[#A1A4B2] active:bg-[#4A503D] p-6 rounded-[2rem]"
            />
          )}
          <span className="text-[#A1A4B2] text-2xl">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
export default IconsBar;
