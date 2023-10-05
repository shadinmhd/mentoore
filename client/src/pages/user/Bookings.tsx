import CancelBooking from "@/components/shared/CancelBooking"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Api from "@/services/Api"
import moment from "moment"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

type BookingType = {
  _id: string;
  mentor: {
    name: string
  };
  user: string;
  status: string;
  date: string;
  startTime: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/student/booking")
      if (data.success) {
        setBookings(data.bookings)
        console.log(data.bookings)
      } else {
        toast.error(data.message)
      }
    })()
  }, [refresh])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>mentor</TableHead>
          <TableHead>date</TableHead>
          <TableHead>time</TableHead>
          <TableHead>status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          bookings.map((e, i) => (
            <TableRow key={i}>
              <TableCell>{e.mentor.name}</TableCell>
              <TableCell>{moment(e.date).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{moment(e.startTime).format("HH:mm")}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell>
                {
                  e.status != "cancelled" &&
                  <CancelBooking refresh={setRefresh} id={e._id} />
                }
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default Bookings