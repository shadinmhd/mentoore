import Api from "@/services/Api"
import { mentorSchema } from "@/validators/mentorType"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

type mentorType = z.infer<typeof mentorSchema>

const Mentors = () => {
  const [mentors, setMentors] = useState<mentorType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/admin/mentor/getAll")
      if (data.success) {
        setMentors(data.mentors)
        console.log(data.mentors)
      } else {
        toast.error(data.message)
      }
    })()
  }, [])

  return (
    <div className="flex flex-col p-2 w-full">
      <div className="flex gap-2">
        <Input placeholder="search" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>status</TableHead>
            <TableHead>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentors.map((e, i) => (
            <TableRow onClick={() => navigate(`/admin/mentor/${e._id}`)} key={i}>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell>{e.status}</TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default Mentors