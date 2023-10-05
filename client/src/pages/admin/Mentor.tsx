import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Api from '@/services/Api'
import { mentorSchema } from '@/validators/mentorType'
import { faArrowLeft, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

type MentorType = z.infer<typeof mentorSchema>


const Mentor = () => {
    const { id } = useParams()
    const statusValues = ["pending", "active", "blocked"]
    const [mentor, setMentor] = useState<MentorType>({
        _id: "",
        description: "",
        email: "",
        firstName: "",
        image: "",
        lastName: "",
        status: "",
        category: "",
        bookings : []
    })
    const [categories, setCategories] = useState<{ name: string }[]>([])
    useEffect(() => {
        (async () => {
            const { data } = await Api.get(`/admin/mentor/${id}`)
            if (data.success) {
                setMentor(data.mentor)
            } else {
                toast.error("couldn't get mentor details")
            }
        })(),
            (async () => {
                const { data } = await Api.get("/category")
                if (data.success) {
                    setCategories(data.categories)
                }
            })()
    }, [])


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        let temp = {
            ...mentor,
            [name]: value
        }
        console.log(temp)
        setMentor(temp)
    }

    const statusChangeHandler = (e: string) => {
        let temp = {
            ...mentor,
            ["status"]: e
        }
        console.log(temp)
        setMentor(temp)
    }

    const categoryChangeHandler = (e: string) => {
        let temp = {
            ...mentor,
            ["category"]: e
        }
        console.log(temp)
        setMentor(temp)
    }

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(mentor)
        const {data} = await Api.put("/admin/mentor", mentor)
        if(data.success){
            toast.success("changes saved")
        }else{
            toast.error(data.message)
        }
    }

    return (
        <div className='flex relative flex-col gap-8 items-start justify-center w-full p-10'>
            <Link to="/admin/mentors">
                <Button variant="outline" className='absolute left-10 top-10'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
            </Link>
            <Avatar className='bg-black'>
                <AvatarImage src={mentor?.image} />
                <AvatarFallback>
                    {mentor.firstName && mentor?.firstName[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-4 w-full'>
                <div className='flex w-full gap-5'>
                    <Label>first name: </Label>
                    <Input onChange={changeHandler} className='w-auto' name='firstName' defaultValue={mentor?.firstName} />
                </div>
                <div className='flex w-full gap-5'>
                    <Label>last name: </Label>
                    <Input onChange={changeHandler} className='w-auto' name='firstName' defaultValue={mentor?.lastName} />
                </div>
                <div className='flex w-full gap-5'>
                    <Label>email: </Label>
                    <Input onChange={changeHandler} className='w-auto' name='firstName' defaultValue={mentor?.email} />
                </div>
                <div className='flex w-full gap-5'>
                    <Label>description: </Label>
                    <Input onChange={changeHandler} className='w-auto' name='description' defaultValue={mentor?.description} />
                </div>
                <div className='flex w-full gap-5'>
                    <Label>status: </Label>
                    <Select name='status' onValueChange={statusChangeHandler}>
                        <SelectTrigger className='w-auto'>
                            <SelectValue >{mentor.status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem defaultChecked value="pending" > pending</SelectItem>
                            <SelectItem value="active" > active</SelectItem>
                            <SelectItem value="banned" > banned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex w-full gap-5'>
                    <Label>category: </Label>
                    <Select name='category' onValueChange={categoryChangeHandler}>
                        <SelectTrigger className='w-auto'>
                            <SelectValue >{mentor.category || "no category selected"}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categories.map((e, i) => (
                                    <SelectItem key={i} value={e.name} >{e.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center gap-3'>
                    <Button onClick={handleSave} className='flex gap-2 items-center justify-center text-center' >Save <FontAwesomeIcon icon={faSave} /> </Button>
                </div>
            </div>
        </div >
    )
}

export default Mentor