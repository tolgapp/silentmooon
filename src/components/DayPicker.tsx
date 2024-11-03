import daysData from "../data/daysData.json";

type Icons = {
  active: string;
  inactive: string;
};

type Day = {
  id: number;
  day: string;
  value: string;
  icons: Icons;
};

type DayPickerProps = {
  toggleDay: (dayId: number) => void;
  selectedDays: number[];
};

const DayPicker: React.FC<DayPickerProps> = ({ toggleDay, selectedDays }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {daysData.days.map((day: Day) => (
        <div
          key={day.id}
          onClick={() => toggleDay(day.id)}
          className={`
            cursor-pointer
             rounded-lg
            transition-all duration-200
            hover:bg-gray-100
          `}
        >
          <img
            src={
              selectedDays.includes(day.id)
                ? day.icons.active
                : day.icons.inactive
            }
            alt={day.value}
            className="w-24  h-22 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default DayPicker;
