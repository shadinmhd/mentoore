import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'

const Navbar = () => {
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
    return (
        <header className='py-3 px-10 fixed bg-white top-0 left-0 w-screen flex items-center justify-between'>
            <Link to="/" className='font-sans text-blue-500 text-xl font-semibold'>
                Mentoore
            </Link>
            <div className='flex gap-2 text-gray-500 font-sans'>
                <Link to="/">Home</Link>
                <Link to="/mentors">Mentors</Link>
                <Link to="/contact">contact us</Link>
            </div>
            <div className='flex items-center gap-2'>
                {loggedIn ?
                    <Link className='text-center bg-blue-500 text-white py-2 px-3 font-semibold font-sans rounded-lg' to="/user/dashboard" >Dashboard</Link> :
                    <>
                        <Link className='text-center bg-white text-blue-500 py-2 px-3 font-semibold font-sans rounded-lg' to="/user/register">Register</Link>
                        <Link className='text-center bg-blue-500 text-white py-2 px-3 font-semibold font-sans rounded-lg' to="/login">Login</Link>
                    </>
                }
            </div>
        </header>
    )
}

export default Navbar