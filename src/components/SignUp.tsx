import BackButton from "./BackButton"
import Button from "./Button"
import Input from "./Input"

const SignUp = () => {
  return (
    <div className="bg-[url('/images/motiveBg.jpg')] bg-no-repeat bg-contain min-h-screen flex flex-col items-center justify-center bg-[#FEFCF8] gap-4">
      <BackButton />
      <div className="greeting flex mb-48">
        <h2 className="text-5xl tracking-wider font-bold text-[#4A503D]">Create your account</h2>
      </div>
      <div className="login-data flex flex-col items-center gap-4 pr-6 pl-6">
        <Input placeholderName={"NAME"} inputType={"text"} />
        <Input placeholderName={"SURNAME"} inputType={"text"} />
        <Input placeholderName={"EMAIL"} inputType={"email"} />
        <Input placeholderName={"PASSWORD"} inputType={"password"} />
        <Button text={"REGISTER"} />
      </div>
    </div>
  )
}
export default SignUp