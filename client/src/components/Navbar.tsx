import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Navbar = () => {
    let loggedIn,type
    if (localStorage.getItem("token")){
        loggedIn = true
        console.log(localStorage.getItem("token"))
        type = localStorage.getItem("type")
    }


    return (
        <>
            <header className='py-3 px-10 fixed bg-white top-0 left-0 w-screen flex items-center justify-between'>
                <Link to="/" className='font-sans text-blue-600 text-xl font-semibold'>
                    Mentoore
                </Link>
                <div className='flex text-xl gap-4 text-blue-500 font-sans'>
                    <Link to="/">Home</Link>
                    <Link to="/mentors">Mentors</Link>
                    <Link to="/contact">contact us</Link>
                </div>
                <div className='flex items-center gap-2'>
                    {loggedIn ?
                        <Link
                            className='text-center bg-blue-600 text-white py-2 px-3 font-semibold font-sans rounded-lg'
                            to={`/${type}`} >Dashboard</Link> :
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
