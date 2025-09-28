type InputProps = {
  inputType: 'text' | 'email' | 'password';
  name: string;
  placeholderName: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ inputType, name, placeholderName, value, onChange }) => {
  return (
    <input
      className="bg-transparent py-6 text-center rounded-full text-2xl w-full border-[1px] border-solid border-red-400 focus:outline-none focus:border-gray-600"
      type={inputType}
      name={name}
      placeholder={placeholderName}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
