import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";
import SearchBar from "../components/SearchBar";
import RandomYoga from "../components/RandomYoga";
import axios from "axios";
import Recommended from "../components/Recommended";
import { DataItem } from "../helper/props";

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

  const [yogaVideos, setYogaVideos] = useState<DataItem[]>([]);

  const fetchYogaVideos = async () => {
    try {
      const response = await axios.get("/yogaVideos", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data) {
        setYogaVideos(
          response.data.map((video: DataItem) => ({
            ...video,
            url: `${video.videoUrl}`,
            image: `${video.image}`,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching yoga videos:", error);
    }
  };

  useEffect(() => {
    fetchYogaVideos();
  }, []);

  const getRandomVideos = (videos: DataItem[], count: number): DataItem[] => {
    if (videos.length <= count) return videos;

    const shuffled = [...videos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomRecommendedVideos = getRandomVideos(yogaVideos, 4);

  return (
    <div className="flex flex-col items-center">
      <SilentMoonLogo />
      <section className="pl-10 pr-10 w-full justify-start">
        <h2 className="mt-44 text-4xl font-semibold">
          {greeting}, {userName}
        </h2>
        <p className="mt-8 text-slate-400 text-2xl">{dayMessage}</p>
      </section>
      <RandomYoga />
      <SearchBar onSearch={onSearch} />
      <section className="w-full mt-10">
        <h3 className="text-3xl font-semibold mb-10 mt-4 px-8">
          Recommended yoga for you
        </h3>
        <div className="flex overflow-x-auto gap-9 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-8">
          {randomRecommendedVideos.map((video) => (
            <Recommended
              id={video.id}
              key={video.id}
              title={video.title}
              image={video.image}
              level={video.level}
              time={video.time}
              description={video.description}
              videoUrl={video.url}
              type={video.type}
              category={video.category}
            />
          ))}
        </div>
      </section>
      <Navbar userName={userName} />
    </div>
  );
};

export default Home;
