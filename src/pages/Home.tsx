import Navbar from "../components/Navbar";
import SilentMoonLogo from "../components/SilentMoonLogo";

type HomeProps = {
  userName: string | null;
}

const Home: React.FC<HomeProps> = ({ userName }) => {
  return (
    <div>
      <SilentMoonLogo />
      <section className="pl-8 pr-8">
        <h2 className="mt-44 text-4xl font-semibold">
          Good Morning {userName}
        </h2>
        <p className="mt-4 text-2xl">We hope you have a good day</p>
      </section>
      <Navbar userName={userName} />
    </div>
  );
};
export default Home;
