import { Link, useLocation } from "react-router-dom";

type ButtonProps = {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, type, onClick }) => {

  const {pathname} = useLocation()

  if (type === "submit") {
    return (
      <button
        className="py-8 text-center rounded-full w-full bg-red-400 text-2xl text-white"
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }

  if (text === "GET STARTED") {
    return (
      <Link className="w-full" to={`/settings`}>
        <button
          className="py-8 text-center rounded-full w-full bg-red-400 text-2xl text-white"
          type={type}
        >
          {text}
        </button>
      </Link>
    );
  }


  return (
    <Link className="w-full" to={`/${text.replace(" ", "").toLowerCase()}`}>
      <button
        className="py-8 text-center rounded-full w-full bg-red-400 text-2xl text-white"
        type={type}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
