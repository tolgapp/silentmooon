import { useState } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    onSearch(value); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value); 
    } else if (e.key === "Escape") {
      setValue(""); 
      onSearch(""); 
    }
  };

  return (
    <div className="mt-12 flex justify-between bg-slate-100 w-[90%] rounded-2xl">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border rounded-xl bg-slate-100 h-14 ml-6 text-2xl"
        placeholder="e.g Stretch or Focus"
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
