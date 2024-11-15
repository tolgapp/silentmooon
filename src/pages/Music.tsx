import Navbar from "../components/Navbar"

type DataItem = {
  id: string;
  name: string;
  type: "video" | "audio";
  url: string;
  category: "yoga" | "meditation" | "music";
};

type MusicProps = {
  data: DataItem[];
  onSearch: (query: string) => void;
  userName: string | null;
};

const Music: React.FC<MusicProps> = ({userName}) => {
  return (
    <div className="">Music
      <Navbar userName={userName} />
    </div>
  )
}
export default Music