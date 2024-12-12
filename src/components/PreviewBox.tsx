import { useState } from "react";
import { useLocation } from "react-router-dom";
import DetailPage from "./DetailPage";

type PreviewBoxProps = {
  image: string;
  title: string;
  level: string;
  time: string;
  description: string;
  videoUrl?: string;
  userId: string | ""
  onClick: (url: string) => void;
};

const PreviewBox: React.FC<PreviewBoxProps> = ({
  image,
  title,
  level,
  time,
  description,
  videoUrl,
  userId
}) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { pathname } = useLocation();
  const [showDetail, setShowDetail] = useState(false);

  const showDetailPage = () => setShowDetail(true);
  const hideDetailPage = () => setShowDetail(false);

  if (pathname === "/yoga") {
    return (
      <div
        className="h-48  w-64 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${backendURL + image})` }}
        onClick={showDetailPage}
      >
        <p className="absolute bottom-3 left-2 text-xl font-semibold z-30 text-white px-2 py-1 rounded">{title}</p>
        {showDetail && (
          <DetailPage
            title={title}
            level={level}
            time={time}
            description={description}
            videoUrl={videoUrl}
            onClose={hideDetailPage}
            key={userId}
          />
        )}
      </div>
    );
  }

  return null;
};

export default PreviewBox;
