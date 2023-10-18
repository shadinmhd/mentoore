import { Separator } from "@/components/ui/separator"
import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [userData, setUserData] = useState<{ _id: string, userCount: string }[]>([])
  const [slotData, setSlotData] = useState<{ date: string, count: string }[]>([])
  const [userCount, setUserCount] = useState(0)
  const [mentorCount, setMentorCount] = useState(0)
  const [newMentors, setNewMentors] = useState(0)
  const [studentCount, setStudentCount] = useState(0)
  const [slots, setSlots] = useState({
    completed: 0,
    booked: 0,
    cancelled: 0
  })


  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/dash/admin")
      if (data.success) {
        setUserData(data.userData)
        setSlotData(data.slotData)
        setUserCount(data.userCount)
        setMentorCount(data.mentorCount)
        setStudentCount(data.studentCount)
        setSlots(data.slots)
        setNewMentors(data.newMentors)
        console.log(data)
      }
    })()
  }, [])


  const userChart = {
    labels: userData.map((e) => e._id),
    datasets: [{
      label: "new users",
      data: userData.map((e) => e.userCount)
    }]
  }

  const slotChart = {
    labels: slotData.map((e) => e.date),
    datasets: [{
      label: "slots",
      data: slotData.map((e) => e.count)
    }]
  }

  console.log(slotChart)

  return (
    <div className="flex flex-col gap-7 p-10 pt-10 justify-center w-full">
      <div className="flex shadow-md h-1/4 bg-gradient-to-br from-blue-600 via-blue-400 to-blue-300 text-white rounded-sm p-3 w-full">
        <Link to={"/admin/users"} className="flex flex-col gap-2 w-1/3 items-center justify-center">
          <div className="flex text-xl gap-1 font-bold"><div>Users:</div><div>{userCount}</div></div>
          <div className="flex flex-col font-semibold">
            <div className="flex gap-1">
              <div>
                Mentors:
              </div>
              <div>
                {mentorCount}
              </div>
            </div>
            <div className="flex gap-1">
              <div>
                new mentors:
              </div>
              <div>
                {newMentors}
              </div>
            </div>
            <div className="flex gap-1">
              <div>
                Students:
              </div>
              <div>
                {studentCount}
              </div>
            </div>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link
          to={"/admin/bookings"}
          className="flex flex-col items-center justify-center  w-1/3"
        >
          <div className="font-bold">Slots</div>
          <div className="font-semibold">
            <div className="flex gap-1">
              <div>Completed: </div>
              <div>{slots.completed}</div>
            </div>
            <div className="flex gap-1">
              <div>Booked: </div>
              <div>{slots.booked}</div>
            </div>
            <div className="flex gap-1">
              <div>Cancelled: </div>
              <div>{slots.cancelled}</div>
            </div>
          </div>
        </Link>
        <Separator orientation="vertical" />
        <Link to={""}>
          <div>

          </div>
        </Link>
      </div>
      <div className="h-3/4 w-full p-2 flex items-center justify-center shadow-lg">
        {
          userData.length != 0 ?
            <Line data={userChart} options={{ scales: { y: { type: "linear" } } }} /> :
            <div> No data to show </div>
        }
      </div>
      <div className="h-3/4 w-full p-2 flex items-center justify-center shadow-lg">
        {
          slotData.length != 0 ?
            <Line data={slotChart} options={{ scales: { y: { type: "linear" } } }} /> :
            <div> No data to show </div>
        }
      </div>
    </div >
  )
}

export default Dashboard