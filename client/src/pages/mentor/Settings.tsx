import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Api from '@/services/Api'
import { faArrowRightFromBracket, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


type MentorType = {
  _id: string;
  name: string,
  email: string;
  status: string;
  category: string;
  image: string;
  description: string;
  bookings: {
    _id: string;
    status: string;
    date: string;
    mentor: string;
    user: string;
    startTime: string;
  }[];
}
const Settings = () => {
  const [categories, setCategories] = useState<{ name: string }[]>([])
  const [mentor, setMentor] = useState<MentorType>({
    _id: "",
    email: "",
    image: "",
    status: "",
    category: "",
    description: "",
    name: "",
    bookings: []
  })

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await Api.get(`/mentor`)
      if (data.success) {
        console.log(data.user)
        setMentor(data.user)
      } else {
        toast.error("couldn't get mentor details")
      }
    })(),
      (async () => {
        const { data } = await Api.get("/category")
        if (data.success) {
          setCategories(data.categories)
        } else {
          toast.error("couldnt fetch categories")
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
    const { data } = await Api.put("/mentor", mentor)
    if (data.success) {
      toast.success("changes saved")
    } else {
      toast.error(data.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("type")
    navigate("/")
  }

  return (
    <div className='flex relative flex-col gap-8 items-start justify-center w-full p-10'>
      <Avatar>
        <AvatarImage src={mentor?.image} />
        <AvatarFallback>
          {mentor.name && mentor.name.split("")[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex w-full gap-5'>
          <Label>name: </Label>
          <Input onChange={changeHandler} className='w-auto' name='name' defaultValue={mentor?.name} />
        </div>
        <div className='flex w-full gap-5'>
          <Label>email: </Label>
          <Input onChange={changeHandler} className='w-auto' name='email' defaultValue={mentor?.email} />
        </div>
        <div className='flex w-full gap-5'>
          <Label>description: </Label>
          <Input onChange={changeHandler} className='w-auto' name='description' defaultValue={mentor?.description} />
        </div>
        <div className='flex w-full gap-5'>
          <Label>category: </Label>
          <Select name='status' onValueChange={categoryChangeHandler}>
            <SelectTrigger className='w-auto'>
              <SelectValue >{mentor.category || "no category selected"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((e, i) => (
                <SelectItem key={i} value={e.name} >{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-3'>
          <Button onClick={handleSave} className='flex gap-2 items-center justify-center text-center' >Save <FontAwesomeIcon icon={faSave} /> </Button>
          <Button onClick={handleLogout} className='flex gap-2 items-center justify-center text-center' variant="destructive" >Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /> </Button>
        </div>
      </div>
    </div >
  )
}

export default Settings