import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { userSchema } from "@/validators/userType"
import NewUser from "@/components/admin/user/NewUser"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type userType = z.infer<typeof userSchema>

const Users = () => {
  const [users, setUsers] = useState<userType[]>([])
  const [refresh, setRefresh] = useState(0)
  const [search, setSearch] = useState({
    name: "",
    status: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await Api.get(`/admin/student/GetAll?name=${search.name}&status=${search.status}`)
      if (data.success) {
        setUsers(data.users)
        console.log(data.users)
      } else {
        toast.error(data.message)
      }
    })()
  }, [refresh, search])



  return (
    <div className="flex flex-col p-2 w-full">
      <div className="flex gap-2">
        <div className='flex gap-2 w-full px-5 py-2'>
          <Input placeholder='search' onChange={(e) => setSearch((prev) => ({ name: e.target.value, status: prev.status }))} />
          <Select name='status' onValueChange={(e) => setSearch((prev) => ({ name: prev.name, status: e }))}>
            <SelectTrigger className='w-auto'>
              <SelectValue>{search.status || "status"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=''>status</SelectItem>
              <SelectItem value='banned'>banned</SelectItem>
              <SelectItem value='active'>active</SelectItem>
            </SelectContent>
          </Select>
        </div>
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