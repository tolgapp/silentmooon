import { useEffect, useState } from "react";
import axios from "axios";
import { randomNum } from "../helper/helperFunctions";

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

const RandomYoga: React.FC<Random> = () => {
  const [yogaVideos, setYogaVideos] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchYogaVideos = async () => {
    try {
      const response = await axios.get("/yogaVideos", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYogaVideos();
  }, []);



  if (loading || yogaVideos.length < 2) {
    return <div>Loading...</div>;
  }

  const randomIndex1 = randomNum(yogaVideos.length);
  let randomIndex2 = randomNum(yogaVideos.length);

  while (randomIndex1 === randomIndex2) {
    randomIndex2 = randomNum(yogaVideos.length);
  }

  const randomVideo1 = yogaVideos[randomIndex1];
  const randomVideo2 = yogaVideos[randomIndex2];

  return (
    <div className="flex gap-10 mt-9 w-full items-center justify-center">
      <div
        className="h-80 w-64 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_API_URL + randomVideo1.image
          })`,
        }}
      >
        <h3 className="absolute bottom-32 left-5 text-3xl text-white font-semibold text-balance w-1/2">
          {randomVideo1.title}
        </h3>
        <div className=" bottom-3 absolute w-full flex items-center justify-between pr-4 pl-4">
          <p className="text-white text-xl">{randomVideo1.time}</p>
          <button className="flex justify-center items-center py-4 px-8 bg-red-400 text-white rounded-xl ">
            Start
          </button>
        </div>
      </div>
      <div
        className="h-80 w-64 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_API_URL + randomVideo2.image
          })`,
        }}
      >
        <h3 className="absolute  bottom-32 left-5 text-3xl text-white font-semibold text-balance w-1/2">
          {randomVideo2.title}
        </h3>
        <div className=" bottom-3 absolute w-full flex items-center justify-between pr-4 pl-4">
          <p className="text-white text-xl">{randomVideo1.time}</p>
          <button className="flex justify-center items-center py-4 px-8 bg-red-800 text-white rounded-xl ">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomYoga;
