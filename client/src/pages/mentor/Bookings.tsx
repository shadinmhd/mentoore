import { DeleteBooking } from "@/components/mentor/DeleteBookings"
import NewBooking from "@/components/mentor/NewBookings"
import CancelBooking from "@/components/mentor/CancelBooking"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Api from "@/services/Api"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import SessionComplete from "@/components/mentor/SessionComplete"
import UserContext from "@/context/UserContext"

type BookingType = {
  _id: string;
  mentor: string;
  user: {
    name: string
  }
  status: string;
  date: string;
  startTime: string;
}

const Bookings = () => {

  const [bookings, setBookings] = useState<BookingType[]>([])
  const [refresh, setRefresh] = useState(0)
  const user = useContext(UserContext)


  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/slot/all")
      if (data.success) {
        console.log(data.bookings)
        setBookings(data.bookings)
      } else {
        toast.error("couldn't get bookings")
      }
    })()
  }, [refresh])

  return (

    <div className="flex flex-col p-2 w-full">
      <div className="text-xl sm:text-2xl">
        Bookings
      </div>
      <Table className="text-xs sm:text-base">
        <TableHeader>
          <TableRow>
            <TableHead>
              date
            </TableHead>
            <TableHead>
              user
            </TableHead>
            <TableHead>
              start time
            </TableHead>
            <TableHead>
              status
            </TableHead>
            <TableHead>
              {
                !(user?.user.status == "new") &&
                <NewBooking refresh={setRefresh} />
              }
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {bookings.map((e, i) => (
            <TableRow className="w-full" key={i}>
              <TableCell>{moment(e.date).format("DD/MM/YYYY")} </TableCell>
              <TableCell>{e.user && e.user.name || "not booked yet"} </TableCell>
              <TableCell>{moment(e.startTime).format("HH:mm")} </TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell className="flex gap-1">
                {
                  e.status == "booked" ?
                    <>
                      <CancelBooking refresh={setRefresh} id={e._id} />
                      <SessionComplete refresh={setRefresh} id={e._id} />
                    </>
                    :
                    <DeleteBooking id={e._id} refresh={setRefresh} />
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        user?.user.status == "new" &&
        <div className="bg-[rgba(255,255,255,0.9)] h-screen w-full flex items-center justify-center">
          <div className="text-red-500">
            you cannot create slots before admin veryfies your account
          </div>
        </div>
      }
    </div>

  )
}

export default Bookings