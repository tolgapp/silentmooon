type ButtonProps = {
    text: string
}

const Button: React.FC<ButtonProps> = ({text}) => {
  return (
    <button className="py-6 px-56 rounded-full w-full bg-red-400 text-2xl text-white">{text}</button>

  )
}
export default Button