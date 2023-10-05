import Navbar from '@/components/Navbar'
import UserRegisterForm from '@/components/user/RegisterForm'

const UserRegister = () => {
    return (
        <div className='flex h-screen items-center justify-center'>
            <Navbar />
            <UserRegisterForm />
        </div>
    )
}

export default UserRegister