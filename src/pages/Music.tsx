import Navbar from "../components/Navbar"

type MusicProps = {
  userName: string | null;
}

const Music: React.FC<MusicProps> = ({userName}) => {
  return (
    <div>Music
      <Navbar userName={userName} />
    </div>
  )
}
export default Music