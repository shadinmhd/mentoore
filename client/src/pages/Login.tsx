import LoginForm from "@/components/LoginForm"
import Navbar from "@/components/Navbar"

const Login = () => {
	return (
		<div className='flex flex-col gap-32 h-screen items-center justify-start'>
			<Navbar />
			<LoginForm />
		</div>
	)
}

export default Login
