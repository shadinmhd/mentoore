import Navbar from "@/components/Navbar"
import BookSlot from "@/components/shared/BookSlot"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Api from "@/services/Api"
import { mentorSchema } from "@/validators/mentorType"
import moment from "moment"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

type MentorType = z.infer<typeof mentorSchema>

interface BookingType {
  _id: string,
  startTime: string,
  date: string,
  status: string
}

const Mentor = () => {
  const [mentor, setMentor] = useState<MentorType>({
    _id: "",
    name: "",
    category: "",
    description: "",
    email: "",
    image: "",
    status: "",
    bookings: [],
  })
  const [bookings, setBookings] = useState<BookingType[]>([])
  const [refresh, setRefresh] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    (async () => {
      const { data } = await Api.get(`/mentor/getDetails/${id}`)
      if (data.success) {
        setMentor(data.mentor)
        console.log(data.bookings)
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    })()
  }, [refresh])

  console.log(id)
  return (
    <div className="pt-16 flex items-center justify-center h-screen w-full">
      <Navbar />
      <div className="flex text-blue-600 flex-col gap-5 items-center justify-center">
        <Avatar className="text-black">
          <AvatarImage src={mentor.image} ></AvatarImage>
          <AvatarFallback>
            {mentor.name && mentor.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-2xl font-semibold flex gap-2 text-blue-600">
          <span>
            {mentor.name.split("").map((e, i) => i == 0 ? e.toUpperCase() : e)}
          </span>
        </p>
        <p className="flex gap-2">
          <span>
            category:
          </span>
          <span className="bg-blue-600 text-white py-1 px-2 rounded-lg">
            {mentor.category}
          </span >
        </p>
        <p className="text-md font-semibold content">
          {mentor.description}
        </p>
        {
          bookings.length != 0 ?
            <Table className="border w-full rounded-lg">
              <TableHeader>
                <TableRow>
                  <TableHead>date</TableHead>
                  <TableHead>time</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  bookings.map((e, i) => e.status == "open" && (
                    <TableRow key={i}>
                      <TableCell>{moment(e.date).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>{moment(e.startTime).format("HH:mm")}</TableCell>
                      <TableCell>
                        {
                          localStorage.getItem("type") != "admin" &&
                          <BookSlot refresh={setRefresh} date={e.date} id={e._id} startTime={e.startTime} />
                        }
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table >
            :
            <span className="text-red-600">
              no slots available
            </span>
        }
      </div>
    </div>
  )
}

export default Mentor