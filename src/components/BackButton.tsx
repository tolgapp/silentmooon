import { useLocation, useNavigate } from "react-router-dom";

const BackButton = ({onClose}) => {
  const navigate = useNavigate();
  const {pathname} = useLocation()

  if (pathname === "/yoga" || pathname === "/meditation" || pathname === "/home") {
    return (
      <img
        onClick={onClose}
        className="absolute top-20 left-12 z-50 cursor-pointer bg-white rounded-full w-16"
        src="/images/Arrow.svg"
      />
    );
  }

  return (
    <img
      onClick={() => navigate(-1)}
      className="absolute top-12 left-6 z-50 cursor-pointer"
      src="/images/Arrow.svg"
    />
  );
};
export default BackButton;
