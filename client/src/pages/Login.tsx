import LoginForm from "@/components/LoginForm"
import Navbar from "@/components/Navbar"

const Login = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Navbar />
            <LoginForm />
        </div>
    )
}

export default Login