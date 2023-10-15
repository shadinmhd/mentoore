import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import SideBar from '@/components/SideBar'
import { faBook, faDashboard, faGear, faMessage, faWallet } from '@fortawesome/free-solid-svg-icons'
import Bookings from './Bookings'
import Wallet from '../shared/Wallet'
import Settings from './Settings'
import { toast } from 'react-toastify'
import Messages from '../shared/Messages'

const buttons = [
    { to: "/mentor", text: "Dashboard", icon: faDashboard },
    { to: "/mentor/message", text: "Messages", icon: faMessage },
    { to: "/mentor/bookings", text: "Bookings", icon: faBook },
    { to: "/mentor/Wallet", text: "Wallet", icon: faWallet },
    { to: "/mentor/settings", text: "Settings", icon: faGear },
]

const MentorRouter = () => {
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {

            if (localStorage.getItem("type")) {
                if (localStorage.getItem("type") != "mentor") {
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
        <div className='flex'>
            <SideBar buttons={buttons} />
            <div className='pt-10 sm:pt-0 w-full'>
                <Routes >
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/message' element={<Messages />} />
                    <Route path='/bookings' element={<Bookings />} />
                    <Route path='/wallet' element={<Wallet />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        </div>
    )
}

export default MentorRouter