import Navbar from '@/components/Navbar'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Api from '@/services/Api'
import { mentorSchema } from '@/validators/mentorType'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

type MentorType = z.infer<typeof mentorSchema>

const Mentors = () => {
    const [mentors, setMentors] = useState<MentorType[]>([])
    const [categories, setCategories] = useState<{ name: string }[]>([])
    const [page, setPage] = useState(1)
    const [availablePages, setAvailablePages] = useState(1)

    const [search, setSearch] = useState({
        name: "",
        category: ""
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            (async () => {
                const { data } = await Api.get(`/mentor/getAll?name=${search.name}&category=${search.category}&page=${page}`)
                if (data.success) {
                    setMentors(data.mentors)
                    setAvailablePages(data.pages)
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
        } else {
            toast.error("please login")
            navigate("/login")
        }
    }, [search, page])


    const categoryChangeHandler = (e: string) => {
        setSearch((prev) => ({ name: prev.name, ["category"]: e }))
    }

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch((prev) => ({ category: prev.category, ["name"]: e.target.value }))
    }

    return (
        <div className='pt-16 flex flex-col items-center justify-between'>
            <Navbar />
            <div className='flex gap-2 w-full px-5 py-2'>
                <Input placeholder='search' onChange={handleSearchChange} />
                <Select name='status' onValueChange={categoryChangeHandler}>
                    <SelectTrigger className='w-auto'>
                        <SelectValue>{search.category || "category"}</SelectValue>
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
            <div className='flex items-center justify-center gap-2'>
                <div onClick={() => page != 1 && setPage(page - 1)} className='p-1 bg-blue-600 text-white rounded-sm flex items-center justify-center font-semibold cursor-pointer'>
                    <span>&lt;</span>
                </div>
                <div className='border-[1.5px] border-black rounded-sm p-1'>{page}</div>
                <div onClick={() => page < availablePages && setPage(page + 1)} className='p-1 bg-blue-600 text-white rounded-sm flex items-center justify-center font-semibold cursor-pointer'>
                    <span>&gt;</span>
                </div>
            </div>
        </div>
    )
}

export default Mentors