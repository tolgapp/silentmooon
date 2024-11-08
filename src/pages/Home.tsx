import Navbar from "../components/Navbar";

const Home = ({userName}) => {
  return (
    <div>
      Home
      <Navbar userName={userName}/>
    </div>
  );
};
export default Home;
