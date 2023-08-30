import { useParams } from "react-router-dom"
import SideBar from "../components/SideBar"
import Dashboard from "./Dashboard"
import Settings from "./Settings"
import Messages from "./Messages"
import Bookings from "./Bookings"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import userActions from "../../redux/features/userActions"
import { useEffect } from "react"
import Mentors from "./Mentors"

const Home = () => {
  const { tab } = useParams()
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.userGet())
  })
  return (
    <div className="flex">
      <SideBar />
      <div className="w-screen">
        {tab == "" || tab == "dashboard" && <Dashboard />}
        {tab == "messages" && <Messages />}
        {tab == "mentors" && <Mentors />}
        {tab == "bookings" && <Bookings />}
        {tab == "settings" && <Settings />}
      </div>
    </div>
  )
}

export default Home