import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"

const Wallet = () => {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <div className="w-full px-5 py-10 flex-col gap-2 h-screen">
      <div className="flex text-blue-600 justify-between items-center gap-5">
        <p className="font-bold text-2xl">
          Balance : {user.wallet ? String(user.wallet.balance) : "0"}
        </p>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-2 py-1 rounded-lg" >deposit <FontAwesomeIcon icon={faArrowDown} /> </button>
          <button className="bg-blue-600 text-white px-2 py-1 rounded-lg" >withdraw <FontAwesomeIcon icon={faArrowUp} /> </button>
        </div>
      </div>
      <div className="w-full bg-gray-400 h-[2px] mt-5"></div>
    </div>
  )
}

export default Wallet