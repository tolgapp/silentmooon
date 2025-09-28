import { useState } from 'react';
import { DataItem } from '../helper/props';
import DetailPage from './DetailPage';

const Recommended: React.FC<DataItem> = ({ time, level, image, title, description, videoUrl }) => {
  const [showDetail, setShowDetail] = useState(false);

  const showDetailPage = () => setShowDetail(true);
  const hideDetailPage = () => setShowDetail(false);

  return (
    <div className="overflow-hidden w-72 pb-6 flex-shrink-0 h-fit" onClick={showDetailPage}>
      <img src={image} alt={title} className="w-72 object-cover h-48 rounded-2xl" />
      <section className="w-full justify-start pt-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="bottom-3 w-full flex items-center justify-between">
          <p className="text-xl text-gray-400">{level}</p>
          <p className="text-xl text-gray-400">{time}</p>
        </div>
      </section>
      {showDetail && (
        <DetailPage
          title={title}
          level={level}
          time={time}
          description={description}
          videoUrl={videoUrl}
          onClose={hideDetailPage}
        />
      )}
    </div>
  );
};
export default Recommended;
