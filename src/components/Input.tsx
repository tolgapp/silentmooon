type InputProps = {
  inputType: string;
  placeholderName: string;
};

const Input: React.FC<InputProps> = ({ inputType, placeholderName }) => {
  return (
    <input
      type={inputType}
      placeholder={placeholderName}
      className="bg-transparent py-6 text-center rounded-full text-2xl w-full border border-red-400"
    />
  );
};
export default Input;
