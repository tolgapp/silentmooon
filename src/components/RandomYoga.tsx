import { useEffect, useState } from "react";
import axios from "axios";
import { randomNum } from "../helper/helperFunctions";
import { useSpotify } from "../context/SpotifyContext";

type DataItem = {
  id: string;
  name?: string;
  type: "video" | "audio";
  url?: string;
  videoUrl?: string;
  category: "yoga" | "meditation" | "music";
  image: string;
  title: string;
  level: string;
  time: string;
  description: string;
};

type Random = {
  data?: DataItem[];
};

type SimplifiedMeditationData = {
  time: string;
  title: string;
  image: string;
};


const RandomYoga: React.FC<Random> = () => {
  const { handleTrackUri } =
  useSpotify();

  const [yogaVideos, setYogaVideos] = useState<DataItem[]>([]);
  const [meditateData, setMeditateData] = useState<SimplifiedMeditationData[]>([]);
  const [randomMeditationAudio, setRandomMeditationAudio] = useState<{
    playlist: { name: string; uri: string };
    track: { name: string; uri: string };
  } | null>(null);
  const backendUrl = "http://localhost:5002";
  const accessToken = localStorage.getItem("spotify_token");

  const fetchYogaVideos = async () => {
    try {
      const response = await axios.get("/yogaVideos", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data) {
        setYogaVideos(
          response.data.map((video: any) => ({
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

  const fetchMeditateData = async () => {
    try {
      const response = await axios.get("/meditation", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
  
      console.log(response);
  
      if (response.status === 200 && response.data) {
        const transformedData: SimplifiedMeditationData[] = response.data.map(
          (item: any) => ({
            time: item.time,
            title: item.title,
            image: item.image,
          })
        );
  
        setMeditateData(() => transformedData);
      }
    } catch (error) {
      console.error("Error fetching meditation data:", error);
    }
  };
  

  const fetchRandomMeditationAudio = async (): Promise<void> => {
    try {
      const response = await axios.get("/playlists/meditation/random-audio", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = response.data;
      console.log("Random Meditation Audio:", data);
      setRandomMeditationAudio(data);
    } catch (error) {
      console.error("Error fetching random meditation audio:", error);
    }
  };

  useEffect(() => {
    fetchYogaVideos();
    fetchMeditateData();
    fetchRandomMeditationAudio();
  }, []);

  const randomIndex1 = yogaVideos.length > 0 ? randomNum(yogaVideos.length) : 0;
  const randomVideo1 = yogaVideos[randomIndex1] || {
    image: "",
    title: "Loading...",
    time: "",
  };
  
  const randomMeditateIndex = meditateData.length > 0 ? randomNum(meditateData.length) : 0;
  const randomMeditateImage = meditateData[randomMeditateIndex] || {
    image: "",
    title: "Loading...",
    time: "",
  };
  
  return (
    <div className="flex gap-10 mt-9 w-full items-center justify-center">
      <div
        className="h-80 w-64 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${backendUrl + randomVideo1.image})`,
        }}
      >
        <h3 className="absolute bottom-32 left-5 text-3xl text-white font-semibold text-balance w-1/2">
          {randomVideo1.title}
        </h3>
        <div className="bottom-3 absolute w-full flex items-center justify-between pr-4 pl-4">
          <p className="text-white text-xl">{randomVideo1.time}</p>
          <button className="flex justify-center items-center py-4 px-8 bg-red-400 text-white rounded-xl ">
            Start
          </button>
        </div>
      </div>
      <div
        className="h-80 w-64 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${backendUrl + randomMeditateImage.image})`,
        }}
      >
        <h3 className="absolute bottom-32 left-5 text-3xl text-white font-semibold text-balance w-1/2">
          {randomMeditateImage.title}
        </h3>
        <div className="bottom-3 absolute w-full flex items-center justify-between pr-4 pl-4">
          <p className="text-white text-xl">{randomMeditateImage.time}</p>
          <button
            className="flex justify-center items-center py-4 px-8 bg-red-800 text-white rounded-xl "
            onClick={() => {
              if (randomMeditationAudio?.playlist?.uri) {
                handleTrackUri(randomMeditationAudio.playlist.uri);
              } else {
                console.warn("Keine gültige URI verfügbar");
              }
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomYoga;
