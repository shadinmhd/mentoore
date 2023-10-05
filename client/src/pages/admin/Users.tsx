import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { userSchema } from "@/validators/userType"
import NewUser from "@/components/admin/user/NewUser"

type userType = z.infer<typeof userSchema>

const Users = () => {
  const [users, setUsers] = useState<userType[]>([])
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/admin/student/GetAll")
      if (data.success) {
        setUsers(data.users)
        console.log(data.users)
      } else {
        toast.error(data.message)
      }
    })()
  }, [refresh])

  return (
    <div className="flex flex-col p-2 w-full">
      <div className="flex gap-2">
        <Input placeholder="search" />
        <NewUser refresh={setRefresh} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              name
            </TableHead>
            <TableHead>
              email
            </TableHead>
            <TableHead>
              status
            </TableHead>
            <TableHead>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {users.map((e, i) => (
            <TableRow className="w-full" onClick={() => navigate(`/admin/user/${e._id}`)} key={i}>
              <TableCell>{e.name} </TableCell>
              <TableCell>{e.email} </TableCell>
              <TableCell>{e.status}</TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default Users