import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import SearchBar from "../components/SearchBar";
import RandomYoga from "../components/RandomYoga";

type HomeProps = {
  userName: string | null;
  onSearch: (query: string) => void;
};

const Home: React.FC<HomeProps> = ({ userName, onSearch }) => {
  const [greeting, setGreeting] = useState("");
  const [dayMessage, setDayMessage] = useState("");

  const updateGreetingAndMessage = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
      setDayMessage("We hope you have a great start to your day");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
      setDayMessage("We hope you're having a wonderful day");
    } else {
      setGreeting("Good Evening");
      setDayMessage("We hope you had a great day");
    }
  };

  useEffect(() => {
    updateGreetingAndMessage();
    const intervalId = setInterval(updateGreetingAndMessage, 600000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="flex flex-col items-center">
      <SilentMoonLogo />
      <section className="pl-10 pr-10 w-full justify-start">
        <h2 className="mt-44 text-4xl font-semibold">
          {greeting}, {userName}
        </h2>
        <p className="mt-8 text-2xl">{dayMessage}</p>
      </section>
      <RandomYoga />
      <SearchBar onSearch={onSearch}/>
      <Navbar userName={userName} />
    </div>
  );
};

export default Home;
