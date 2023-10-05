import CreateCategory from "@/components/admin/category/CreateCategory"
import DeleteCategory from "@/components/admin/category/DeleteCategory"
import EditCategory from "@/components/admin/category/EditCategory"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Api from "@/services/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

type CategoryType = {
  name: string,
  _id : string
}

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/category")
      if (data.success) {
        setCategories(data.categories)
      } else {
        toast.error(data.message)
      }
    })()
  }, [refresh])

  return (
    <div className="flex flex-col p-2 w-full">
      <div className="flex gap-2">
        <Input placeholder="search" />
        <CreateCategory refresh={setRefresh} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((e,i) => (
            <TableRow key={i}>
              <TableCell>{e.name}</TableCell>
              <TableCell className="flex gap-1">
                <DeleteCategory refresh={setRefresh} id={e._id} />
                <EditCategory defaultName={e.name} refresh={setRefresh} id={e._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Category