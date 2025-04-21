import { useEffect, useState } from "react";
import axios from "axios";
import { randomNum } from "../helper/helperFunctions";
import { useSpotify } from "../context/SpotifyContext";
import DetailPage from "./DetailPage"; 
import { DataItem } from "../helper/props";

type Random = {
  data?: DataItem[];
};

type SimplifiedMeditationData = {
  time: string;
  title: string;
  image: string;
};

const RandomYoga: React.FC<Random> = () => {
  const { handleTrackUri, isSpotifyConnected } = useSpotify();

  const [yogaVideos, setYogaVideos] = useState<DataItem[]>([]);
  const [meditateData, setMeditateData] = useState<SimplifiedMeditationData[]>([]);
  const [randomMeditationAudio, setRandomMeditationAudio] = useState<{
    playlist: { name: string; uri: string };
    track: { name: string; uri: string };
  } | null>(null);

  const [randomIndex1, setRandomIndex1] = useState<number | null>(null);
  const [randomMeditateIndex, setRandomMeditateIndex] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<DataItem | null>(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
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
            video: `${video.videoUrl}`,
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

      if (response.status === 200 && response.data) {
        const transformedData: SimplifiedMeditationData[] = response.data.map(
          (item: any) => ({
            time: item.time,
            title: item.title,
            image: item.image,
          })
        );
        setMeditateData(transformedData);
      }
    } catch (error) {
      console.error("Error fetching meditation data:", error);
    }
  };

  const fetchRandomMeditationAudio = async (): Promise<void> => {
   if (isSpotifyConnected) {
    try {
      const response = await axios.get("/playlists/meditation/random-audio", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = response.data;
<<<<<<< HEAD
=======
      console.log(data)
>>>>>>> 0edfafec2f1f058100147697f41db7ac3431e60c
      setRandomMeditationAudio(data);
    } catch (error) {
      console.error("Error fetching random meditation audio:", error);
    }
   } else {
    return;
   }
  };

  useEffect(() => {
    fetchYogaVideos();
    fetchMeditateData();
    fetchRandomMeditationAudio();
  }, []);

  useEffect(() => {
    if (yogaVideos.length > 0 && randomIndex1 === null) {
      setRandomIndex1(randomNum(yogaVideos.length));
    }
  }, [yogaVideos, randomIndex1]);

  useEffect(() => {
    if (meditateData.length > 0 && randomMeditateIndex === null) {
      setRandomMeditateIndex(randomNum(meditateData.length));
    }
  }, [meditateData, randomMeditateIndex]);

  const randomVideo1 =
    randomIndex1 !== null && yogaVideos[randomIndex1]
      ? yogaVideos[randomIndex1]
      : { image: "", title: "Loading...", time: "", video: "" };

  const randomMeditateImage =
    randomMeditateIndex !== null && meditateData[randomMeditateIndex]
      ? meditateData[randomMeditateIndex]
      : { image: "", title: "Loading...", time: "" };

  const showDetailPage = (video: DataItem) => {
    setSelectedVideo(video);
    setShowDetail(true);
  };

  const hideDetailPage = () => {
    setShowDetail(false);
    setSelectedVideo(null);
  };

  return (
    <div className="flex gap-10 mt-9 w-full items-center justify-center">
      <div
        className="h-80 w-64 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: randomVideo1.image
            ? `url(${backendURL + randomVideo1.image})`
            : "url('/path/to/placeholder.jpg')",
        }}
        onClick={() => showDetailPage(randomVideo1)} 
      >
        <h3 className="absolute bottom-32 left-5 text-3xl text-white font-semibold text-balance w-1/2">
          {randomVideo1.title}
        </h3>
        <div className="bottom-3 absolute w-full flex items-center justify-between pr-4 pl-4">
          <p className="text-white text-xl">{randomVideo1.time}</p>
          <button className="flex justify-center items-center py-4 px-8 bg-red-400 text-white rounded-xl">
            Start
          </button>
        </div>
      </div>
      <div
        className="h-80 w-64 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: randomMeditateImage.image
            ? `url(${backendURL + randomMeditateImage.image})`
            : "url('/path/to/placeholder.jpg')",
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
      {showDetail && selectedVideo && (
        <DetailPage
          title={selectedVideo.title}
          level={selectedVideo.level}
          time={selectedVideo.time}
          description={selectedVideo.description}
          videoUrl={selectedVideo.url}
          onClose={hideDetailPage}
        />
      )}
    </div>
  );
};

export default RandomYoga;
