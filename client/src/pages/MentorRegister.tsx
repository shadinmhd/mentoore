import Navbar from "@/components/Navbar"
import RegisterForm from "@/components/mentor/RegisterForm"

const MentorRegister = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Navbar />
      <RegisterForm />
    </div>
  )
}

export default MentorRegister