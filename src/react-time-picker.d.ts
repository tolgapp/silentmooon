declare module "react-ios-time-picker" {
    import { FC } from "react";
  
    interface TimePickerProps {
      value: string;
      onChange: (value: string) => void;
      format12Hours?: boolean; 
      theme?: "light" | "dark"; 
      className?: string; 
    }
  
    export const TimePicker: FC<TimePickerProps>;
    export default TimePicker;
  }
  