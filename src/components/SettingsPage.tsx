import SilentMoonLogo from './SilentMoonLogo';
import { TimePicker } from 'react-ios-time-picker';
import DayPicker from './DayPicker';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

type SettingsPageProps = {
  toggleDay: (dayId: number) => void;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  saveSettings: (days: number[], time: string) => Promise<void>;
  selectedDays: number[];
  time: string;
};

const SettingsPage: React.FC<SettingsPageProps> = ({
  selectedDays,
  toggleDay,
  time,
  setTime,
}) => {
  const navigate = useNavigate();

  const onChange = (timeValue: string) => {
    setTime(timeValue);
  };

  const onSave = async () => {
    try {
      if (selectedDays.length === 0) {
        throw new Error('Please select at least one day');
      }

      const response = await axios.post(
        '/settings',
        {
          time,
          days: selectedDays,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.user?.hasCompletedSettings || response.status === 201) {
        navigate('/home');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error saving settings:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full items-center pr-6 pl-6">
      <section className="w-full">
        <SilentMoonLogo />
      </section>
      <div className="flex flex-col items-start gap-8 mt-44 px-2 w-full">
        <div className="text-container flex flex-col items-start gap-3">
          <h2 className="text-4xl font-semibold text-left w-96">
            What time would you like to meditate?
          </h2>
          <p className="text-gray-600 text-2xl text-balance">
            Any time you can choose but we recommend first in the morning.
          </p>
        </div>
        <div className="time-picker-container mt-8 mx-auto">
          <TimePicker onChange={onChange} value={time} />
        </div>
      </div>
      <div className="text-container flex flex-col items-start gap-3 w-full mt-12 mb-12 px-2">
        <h2 className="text-4xl font-semibold text-left w-96">
          Which day would you like to meditate?
        </h2>
        <p className="text-gray-600 text-2xl text-balance">
          Everyday is best, but we recommend picking at least five.
        </p>
      </div>
      <DayPicker toggleDay={toggleDay} selectedDays={selectedDays} />
      <div className="button-container w-full text-center mt-24">
        <Button text="SAVE" type="submit" onClick={onSave} />
        <Link to="/home">
          <button className="text-red-400 pt-8 text-2xl">NO THANKS</button>
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
