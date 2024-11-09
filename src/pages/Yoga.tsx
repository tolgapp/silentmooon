import Navbar from "../components/Navbar";
import Structure from "../components/Structure";

type YogaProps = {
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
