import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Api from '@/services/Api'
import { mentorSchema } from '@/validators/mentorType'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

type MentorType = z.infer<typeof mentorSchema>

const Mentors = () => {
    const [mentors, setMentors] = useState<MentorType[]>([])
    const [categories, setCategories] = useState<{ name: string }[]>([])
    const [search, setSearch] = useState({
        name: "",
        category: ""
    })
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const { data } = await Api.get(`/mentor/getAll?name=${search.name}&category=${search.category}`)
            if (data.success) {
                setMentors(data.mentors)

                console.log(data)
            } else {
                toast.error("failed to fetch mentors")
            }
        })(),
            (async () => {
                const { data } = await Api.get("/category")
                if (data.success) {
                    setCategories(data.categories)
                } else {
                    toast.error("couldn't get categories")
                }
            })()
    }, [search])


    const categoryChangeHandler = (e: string) => {
        setSearch((prev) => ({ name: prev.name, ["category"]: e }))
    }

    return (
        <div className='pt-16'>
            <Navbar />
            <div className='flex gap-2 w-full px-5 py-2'>
                <Input placeholder='search' />
                <Select name='status' onValueChange={categoryChangeHandler}>
                    <SelectTrigger className='w-auto'>
                        <SelectValue >category</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=''>category</SelectItem>
                        {categories.map((e, i) => (
                            <SelectItem key={i} value={e.name} >{e.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead> name </TableHead>
                        <TableHead> email </TableHead>
                        <TableHead> category </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        mentors.map((e, i) => (
                            <TableRow key={i} onClick={() => navigate(`/mentors/${e._id}`)}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.email}</TableCell>
                                <TableCell>{e.category}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default Mentors