import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    onSearch(value); 
  };

  return (
    <div className="mt-14 flex justify-between bg-slate-100 w-[90%] rounded-2xl">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)} 
        onKeyDown={(e) => {
          if (e.key === "Enter") {  
            onSearch(value);
          }
        }}
        className="border rounded-xl bg-slate-100 h-14 ml-6 text-2xl"
        placeholder="Search..."
      />
      <img
        src="/images/search.svg"
        alt="Search Icon"
        className="mr-4 cursor-pointer"
        onClick={handleClick} 
      />
    </div>
  );
};

export default SearchBar;
