import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Chart as ChartJs, CategoryScale } from "chart.js/auto"
import { Bar } from "react-chartjs-2"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faUser } from "@fortawesome/free-solid-svg-icons"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"

ChartJs.register(CategoryScale)
interface IUser {
  _id: string,
  name: string,
  wallet: {
    balance: string
  }
}

interface IMessage {
  content: string,
  sender: IUser
}

const Dashboard = () => {
  const [bookedSlots, setBookedSLots] = useState(0)
  // @ts-ignore
  const [openslots, setOpenSlots] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [user, setUser] = useState<IUser>()
  // @ts-ignore
  const [messages, setMessage] = useState<IMessage[]>([])
  const [chartData, setChartData] = useState<{ count: number, date: string }[]>([])

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/dash/mentor")
      if (data.success) {
        setBookedSLots(data.bookedSlots)
        setOpenSlots(data.openslots)
        setCompleted(data.completed)
        setMessage(data.messages)
        setUser(data.user)
        setChartData(data.chartData)
        console.log(data)
      } else {
        toast.error(data.message)
      }
    })()

  }, [])

  const chart = {
    labels: chartData.map((e) => moment(e.date).format("YYYY-MM-DD")),
    datasets: [{
      label: "number of slots",
      data: chartData.map((e) => e.count)
    }]
  }

  return (
    <div className="flex flex-col gap-7 p-10 pt-10 justify-center h-screen w-full">
      <div className="flex shadow-md bg-gradient-to-br from-blue-600 via-blue-400 to-blue-300 text-white rounded-sm p-3 w-full">
        <div className="flex gap-3 items-center justify-center w-1/4">
          <FontAwesomeIcon className="text-4xl" icon={faUser} />
          <div className="flex flex-col font-bold text-xl">
            <div>
              {user?.name}
            </div>
            <Link
              to={"/mentor/wallet"}
              className="text-base"
            >
              {user?.wallet.balance} ₹ <FontAwesomeIcon className="text-sm" icon={faChevronRight} />
            </Link>
          </div>
        </div>
        <Separator orientation="vertical" className="mx-2" />
        <Link to={"/mentor/bookings"} className="flex text-lg font-bold flex-col items-center">
          <div className="flex items-center  justify-center gap-1">
            <div>
              Slots
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="flex font-semibold gap-1">
            <div className="flex text-white flex-col justify-center items-center">
              <div>
                booked
              </div>
              <div>
                {bookedSlots}
              </div>
            </div>
            <div className="flex  text-green-400 flex-col justify-center items-center">
              <div>
                completed
              </div>
              <div>
                {completed}
              </div>
            </div>
          </div>
        </Link>
        <Separator orientation="vertical" className="mx-2" />
        <Link
          to={"/mentor/message"}
          className="flex flex-col w-2/4 font-semibold"
        >
          <div className="flex items-center justify-center gap-1 self-center">
            <div className="font-bold">
              Messages
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="flex flex-col items-center justify-center">
            {
              messages.length != 0 ?
                messages.map((e, i) => (
                  <div key={i}>
                    {e.sender.name}:{e.content}
                  </div>
                )) :
                <div>No messages</div>
            }
          </div>
        </Link>
      </div>
      <div className="w-full h-3/4 items-center shadow-xl p-2 border-[1px] justify-center hidden sm:flex text-blue-500">
        {
          chartData.length != 0 ?
            <Bar data={chart} options={{ scales: { y: { type: "linear" } } }} /> :
            <div>No data to show</div>
        }
      </div>
    </div>
  )
}

export default Dashboard
