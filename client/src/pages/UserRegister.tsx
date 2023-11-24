import Navbar from '@/components/Navbar'
import UserRegisterForm from '@/components/user/RegisterForm'

const UserRegister = () => {
    return (
        <div className='flex flex-col h-screen items-center justify-start'>
            <UserRegisterForm />
        </div>
    )
}

export default UserRegister
