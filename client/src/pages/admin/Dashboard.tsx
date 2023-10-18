import { Separator } from "@/components/ui/separator"
import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [userData, setUserData] = useState<{ _id: string, userCount: string }[]>([])
  const [userCount, setUserCount] = useState(0)
  const [mentorCount, setMentorCount] = useState(0)
  const [studentCount, setStudentCount] = useState(0)


  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/dash/admin")
      if (data.success) {
        setUserData(data.userData)
        setUserCount(data.userCount)
        setMentorCount(data.mentorCount)
        setStudentCount(data.studentCount)
        console.log(data)
      }
    })()
  }, [])


  const chart = {
    labels: userData.map((e) => e._id),
    datasets: [{
      label: "users",
      data: userData.map((e) => e.userCount)
    }]
  }

  console.log(chart)

  return (
    <div className="flex flex-col gap-7 p-10 pt-10 justify-center h-screen w-full">
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
          className=""
        >
        </Link>

      </div>
      <div className="h-3/4 w-full flex items-center justify-center shadow-xl">
        {
          userData.length != 0 ?
            <Line data={chart} options={{ scales: { y: { type: "linear" } } }} /> :
            <div> No data to show </div>
        }
      </div>
    </div >
  )
}

export default Dashboard