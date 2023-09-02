import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Settings from './Settings'
import Dashboard from './Dashboard'
import Messages from './Messages'
import Wallet from './Wallet'
import SideBar from '../../components/SideBar'
import { useEffect } from "react"
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import mentorActions from '../../redux/features/mentorActions'
import { faBook, faDashboard, faGear, faMessage, faWallet } from '@fortawesome/free-solid-svg-icons'
import {toast} from "react-toastify"


const MentorRouter = () => {
  const type = useSelector((state: RootState) => state.auth.type)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (type !== "mentor") {
      navigate("/")
      toast.error("no authorized")
    }
    else
      dispatch(mentorActions.mentorGet())
  })

  const buttons = [
    { to: "dashboard", icon: faDashboard, text: "dashboard" },
    { to: "messages", icon: faMessage, text: "messages" },
    { to: "bookings", icon: faBook, text: "bookings" },
    { to: "wallet", icon: faWallet, text: "wallet" },
    { to: "settings", icon: faGear, text: "settings" }
  ]

  return (
    <div className='flex'>
      <SideBar buttons={buttons} />
      <div className='flex items-center justify-center w-screen'>
        <Routes>
          <Route index element={<Navigate to="/mentor/dashboard" />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}


export default MentorRouter