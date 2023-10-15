import SideBar from '@/components/SideBar'
import { faBook, faDashboard, faGear, faMessage, faWallet } from '@fortawesome/free-solid-svg-icons'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import Bookings from './Bookings'
import Wallet from '../shared/Wallet'
import Settings from './Settings'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Messages from '../shared/Messages'

const buttons = [
    { to: "/student/messages", text: "Messages", icon: faMessage },
    { to: "/student/bookings", text: "Bookings", icon: faBook },
    { to: "/student/Wallet", text: "Wallet", icon: faWallet },
    { to: "/student/settings", text: "Settings", icon: faGear },
]

const UserRouter = () => {
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("type")) {
                if (localStorage.getItem("type") != "student") {
                    toast.error("you are not authorized")
                    navigate("/")
                }
            } else {
                toast.error("please login")
                navigate("/login")
            }
        })()
    }, [])

    return (
        <div className='flex w-screen'>
            <SideBar buttons={buttons} />
            <div className='pt-10 w-full'>
                <Routes >
                    <Route path='/bookings' element={<Bookings />} />
                    <Route path='/wallet' element={<Wallet />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/messages' element={<Messages />} />
                </Routes>
            </div>
        </div>
    )
}

export default UserRouter