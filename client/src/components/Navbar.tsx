import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Navbar = () => {
    let loggedIn, type
    if (localStorage.getItem("token")) {
        loggedIn = true
        type = localStorage.getItem("type")
    }


    return (
        <>
            <header className='py-3 px-4 sm:px-10  bg-white w-screen flex items-center justify-between'>
                <Link to="/" className='font-sans text-blue-600 sm:text-xl text-lg font-semibold'>
                    Mentoore
                </Link>
                <div className='flex items-center gap-2'>
                    {loggedIn ?
                        <Link
                            className='text-center bg-blue-600 text-white py-2 px-3 font-semibold font-sans rounded-lg'
                            to={type == "student" ? "/student/messages" : `/${type}`} >Dashboard</Link> :
                        <>
                            <Link
                                className='text-center bg-white text-blue-600 py-2 px-3 font-semibold font-sans rounded-lg'
                                to="/userRegister">Register</Link>
                            <Link
                                to="/login">
                                <Button>
                                    Login
                                </Button>
                            </Link>
                        </>
                    }
                </div>
            </header>
        </>
    )
}

export default Navbar
