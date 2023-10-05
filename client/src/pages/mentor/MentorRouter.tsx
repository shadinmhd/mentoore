import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import SideBar from '@/components/SideBar'
import { faBook, faDashboard, faGear, faWallet } from '@fortawesome/free-solid-svg-icons'
import Bookings from './Bookings'
import Wallet from '../shared/Wallet'
import Settings from './Settings'
import { toast } from 'react-toastify'

const buttons = [
    { to: "/mentor", text: "Dashboard", icon: faDashboard },
    { to: "/mentor/bookings", text: "Bookings", icon: faBook },
    { to: "/mentor/Wallet", text: "Wallet", icon: faWallet },
    { to: "/mentor/settings", text: "Settings", icon: faGear },
]

const MentorRouter = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("type")){
            if(localStorage.getItem("type") != "mentor"){
                toast.error("you are not authorized")
                navigate("/")
            }
            
        }else{
            toast.error("please login")
            navigate("/login")
        }
    })

    return (
        <div className='flex'>
            <SideBar buttons={buttons} />
            <Routes >
                <Route path='/' element={<Dashboard />} />
                <Route path='/bookings' element={<Bookings />} />
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </div>
    )
}

export default MentorRouter