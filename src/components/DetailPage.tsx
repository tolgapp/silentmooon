import { useRef, useState } from "react";
import SilentMoonLogo from "./SilentMoonLogo";
import BackButton from "./BackButton";
import Favorite from "./Favorite";

type DetailPageProps = {
  title?: string | undefined;
  level?: string | undefined;
  time?: string | undefined;
  description?: string | undefined;
  videoUrl?: string;
  onClose: () => void;
};

const DetailPage: React.FC<DetailPageProps> = ({
  title,
  level,
  time,
  description,
  videoUrl,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => videoRef.current?.play();
  const handleClose = () => {
    setIsClosing(true);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full h-[99.5%] bg-black text-white z-[50] rounded-t-xl 
                 transition-transform transform ${
                   isClosing ? "animate-slide-down" : "animate-slide-up"
                 }`}
      onClick={(e) => e.stopPropagation()}
      onAnimationEnd={() => isClosing && onClose()}
    >
      <SilentMoonLogo />
      <section className="flex justify-center">
        <BackButton onClose={handleClose} />
        <Favorite contentId={videoUrl} />
      </section>
      {videoUrl && (
        <div className="relative mt-48 w-full max-h-80 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={"http://localhost:5002"+videoUrl}
            controls={isPlaying}
            className="w-full max-h-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl bg-slate-500 bg-opacity-50 p-6 rounded-full"
            >
              &#9654;
            </button>
          )}
        </div>
      )}
      <div className="px-12 mt-16 flex flex-col gap-5">
        <h2 className="text-6xl font-bold ">{title}</h2>
        <p className="text-2xl text-slate-400">Level: {level}</p>
        <p className="text-2xl text-slate-400">Zeit: {time}</p>
        <p className="mt-4 text-3xl">{description}</p>
      </div>
    </div>
  );
};

export default DetailPage;
