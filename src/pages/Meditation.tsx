import Navbar from "../components/Navbar"
import Structure from "../components/Structure";

type MeditateProps = {
  userName: string | null;
}

const Meditation: React.FC<MeditateProps> = ({userName}) => {
  return (
    <div>
      <Structure title={"Meditate"} description={"Audio-only meditation techniques to help you minimize your screen time and practice on the go."}/>
      <Navbar userName={userName} />
    </div>
  )
}
export default Meditation