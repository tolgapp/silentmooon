import Navbar from "../components/Navbar";
import Structure from "../components/Structure";


type DataItem = {
  id: string;
  name: string;
  type: "video" | "audio";
  url: string;
  category: "yoga" | "meditation" | "music";
};

type YogaProps = {
  data: DataItem[];
  onSearch: (query: string) => void;
  userName: string | null;
};


const Yoga: React.FC<YogaProps> = ({ userName }) => {
  return (
    <div>
     <Structure title={"Yoga"} description={"Find your inner zen from anywhere."}/>
      <Navbar userName={userName} />
    </div>
  );
};
export default Yoga;
