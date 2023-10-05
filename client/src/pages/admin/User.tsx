import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Api from '@/services/Api'
import { userSchema } from '@/validators/userType'
import { faArrowLeft, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

type UserType = z.infer<typeof userSchema>


const User = () => {
  const { id } = useParams()
  const statusValues = ["active", "blocked"]
  const [user, setUser] = useState<UserType>({
    _id: "",
    email: "",
    image: "",
    status: "",
    name: ""
  })
  useEffect(() => {
    (async () => {
      const { data } = await Api.get(`/admin/student/${id}`)
      if (data.success) {
        setUser(data.user)
      } else {
        toast.error("couldn't get user details")
      }
    })()
  }, [])


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    let temp = {
      ...user,
      [name]: value
    }
    console.log(temp)
    setUser(temp)
  }

  const statusChangeHandler = (e: string) => {
    let temp = {
      ...user,
      ["status"]: e
    }
    console.log(temp)
    setUser(temp)
  }

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(user)
    const { data } = await Api.put("/admin/student", user)
    if (data.success) {
      toast.success("changes saved")
    } else {
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
      <Avatar>
        <AvatarImage src={user?.image} />
        <AvatarFallback>
          {user.name && user?.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex w-full gap-5'>
          <Label>name: </Label>
          <Input onChange={changeHandler} className='w-auto' name='name' defaultValue={user?.name} />
        </div>
        <div className='flex w-full gap-5'>
          <Label>email: </Label>
          <Input onChange={changeHandler} className='w-auto' name='email' defaultValue={user?.email} />
        </div>
        <div className='flex w-full gap-5'>
          <Label>status: </Label>
          <Select name='status' onValueChange={statusChangeHandler}>
            <SelectTrigger className='w-auto'>
              <SelectValue >{user.status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {
                statusValues.map((e, i) =>
                  <SelectItem value={e}>
                    {e}
                  </SelectItem>
                )
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

export default User