import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // Beispiel: Wert beim Klick einfach festlegen
    setValue("Search clicked"); // oder eine spezifische Aktion ausführen
  };

  console.log(value)

  return (
    <div className="mt-14 flex justify-between bg-slate-100 w-[90%] rounded-2xl">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}  // onChange hinzufügen, um den Wert des Inputs zu setzen
        className="border rounded-xl bg-slate-100 h-14 ml-6 text-2xl"
      />
      <img
        src="/images/search.svg"
        alt="Search Icon"
        className="mr-4"
        onClick={handleClick}
      />
    </div>
  );
};

export default SearchBar;
