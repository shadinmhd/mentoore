import Api from "@/services/Api"
import { mentorSchema } from "@/validators/mentorType"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type mentorType = z.infer<typeof mentorSchema>

const Mentors = () => {
  const [mentors, setMentors] = useState<mentorType[]>([])
  const [categories, setCategories] = useState<{ name: string }[]>([])
  const [search, setSearch] = useState({
    name: "",
    status: "",
    category: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await Api.get(`/admin/mentor/getAll?name=${search.name}&status=${search.status}&category=${search.category}`)
      if (data.success) {
        setMentors(data.mentors)
        console.log(data.mentors)
      } else {
        toast.error(data.message)
      }
    })(),
      (async () => {
        const { data } = await Api.get("/category")
        if (data.success) {
          setCategories(data.categories)
        }
      })()
  }, [search])

  return (
    <div className="flex flex-col p-2 w-full">
      <div className="flex gap-2">
        <div className='flex gap-2 w-full px-5 py-2'>
          <Input placeholder='search' onChange={(e) => setSearch((prev) => ({ name: e.target.value, status: prev.status, category: prev.category }))} />
          <Select name='status' onValueChange={(e) => setSearch((prev) => ({ name: prev.name, status: e, category: prev.category }))}>
            <SelectTrigger className='w-auto'>
              <SelectValue>{search.status || "status"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=''>status</SelectItem>
              <SelectItem value='banned'>banned</SelectItem>
              <SelectItem value='active'>active</SelectItem>
            </SelectContent>
          </Select>
          <Select name='status' onValueChange={(e) => setSearch((prev) => ({ name: prev.name, status: prev.status, category: e }))}>
            <SelectTrigger className='w-auto'>
              <SelectValue>{search.category || "category"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=''>cateogory</SelectItem>
              {
                categories.map((e) => (
                  <SelectItem value={e.name}>{e.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
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