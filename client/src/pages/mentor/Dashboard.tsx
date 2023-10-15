import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Chart as ChartJs, CategoryScale, ChartOptions } from "chart.js/auto"
import { Bar } from "react-chartjs-2"
import moment from "moment"

ChartJs.register(CategoryScale)
interface IUser {
  _id: string,
  name: string
}

interface IMessage {
  content: string,
  sender: IUser
}

const Dashboard = () => {
  const [bookedSlots, setBookedSLots] = useState(0)
  const [openslots, setOpenSlots] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [wallet, setWallet] = useState({
    balance: ""
  })
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
        setWallet(data.wallet)
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
    }
    ]
  }

  console.log(chart)

  const options: ChartOptions = {
    scales:{
      x : {
        type : "linear"
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-2 pt-10 justify-center h-screen w-full">
      <div className="flex">
        <div className="bg-gradient-to-br from-blue-600 via-blue-400 to-blue-300 text-white rounded-sm p-2">
          <div>
            Bookings:
            {bookedSlots}
          </div>
          <div>
            completed:
            {completed}
          </div>
          <div>
            open slots:
            {openslots}
          </div>
        </div>
      </div>
      <div className="w-full h-full items-center justify-center hidden sm:flex text-blue-500">
        {
          chartData.length != 0 ?
            < Bar data={chart} options={{ scales: { y: { type: "linear" } } }} /> :
            <div>No data to show</div>
        }
      </div>
    </div>
  )
}

export default Dashboard