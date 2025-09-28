import Button from './Button';
import SilentMoonLogo from './SilentMoonLogo';

type WelcomePageProps = {
  userName: string | null;
};

const WelcomePage: React.FC<WelcomePageProps> = ({ userName }) => {
  return (
    <div className="min-h-screen w-full relative">
      <SilentMoonLogo />
      <img
        src="/images/Vector.png"
        alt="Woman doing an acrobatic move"
        className="w-full max-h-[calc(75rem)] object-cover"
      />
      <h2 className="top-48 left-8 absolute text-white leading-tight font-bold text-6xl text-balance w-1/2">
        Hi {userName ?? 'Guest'}, welcome to Silent Moon
      </h2>
      <div className="button-container mt-8 pr-4 pl-4">
        <Button text="GET STARTED" />
      </div>
    </div>
  );
};

export default WelcomePage;
