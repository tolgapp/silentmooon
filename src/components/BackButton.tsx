import { useLocation, useNavigate } from 'react-router-dom';

type BackButtonProps = {
  onClose?: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const knownRoutes = ['/yoga', '/meditation', '/home', '/userpage'];

  const isKnownRoute = knownRoutes.includes(pathname);

  if (isKnownRoute) {
    return (
      <img
        onClick={onClose}
        className="absolute top-20 left-12 z-50 cursor-pointer bg-white rounded-full w-16"
        src="/images/Arrow.svg"
        alt="Back"
      />
    );
  }

  return (
    <img
      onClick={() => navigate(-1)}
      className="absolute top-12 left-6 z-50 cursor-pointer"
      src="/images/Arrow.svg"
      alt="Back"
    />
  );
};

export default BackButton;
