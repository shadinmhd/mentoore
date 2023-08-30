import { useParams } from "react-router-dom"
import SideBar from "../components/SideBar"
import Dashboard from "./Dashboard"
import Settings from "./Settings"
import Wallet from "./Wallet"

const Home = () => {
  const { tab } = useParams()
  return (
    <div className="flex">
      <SideBar />
      <div className="w-screen ml-20">
        {tab == "" || tab == "dashboard" && <Dashboard />}
        {tab == "settings" && <Settings />}
        {tab == "waller" && <Wallet />}
      </div>
    </div>
  )
}

export default Home