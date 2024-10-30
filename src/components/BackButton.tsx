import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <img
      onClick={() => navigate(-1)}
      className="absolute top-12 left-12 z-50 cursor-pointer"
      src="/images/Arrow.svg"
    />
  );
};
export default BackButton;
