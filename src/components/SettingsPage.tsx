// SettingsPage.tsx
import { useState } from "react";
import SilentMoonLogo from "./SilentMoonLogo";
import { TimePicker } from "react-ios-time-picker";
import DayPicker from "./DayPicker";
import Button from "./Button";

const SettingsPage = () => {
  const [value, setValue] = useState<string>("17:00");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const onChange = (timeValue: string) => {
    setValue(timeValue);
  };

  const toggleDay = (dayId: number): void => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId]
    );
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
          <TimePicker onChange={onChange} value={value} />
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
        <Button text="SAVE" type="submit" />
        <h3 className="text-red-400 pt-8 text-2xl">NO THANKS</h3>
      </div>
    </div>
  );
};

export default SettingsPage;
