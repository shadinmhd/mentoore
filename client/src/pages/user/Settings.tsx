import ResetPassword from '@/components/shared/ResetPassword'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Api from '@/services/Api'
import { userSchema } from '@/validators/userType'
import { faArrowRightFromBracket, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

type UserType = z.infer<typeof userSchema>


const Settings = () => {
  const [user, setUser] = useState<UserType>({
    _id: "",
    email: "",
    image: "",
    status: "",
    name: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await Api.get(`/student`)
      if (data.success) {
        setUser(data.user)
      } else {
        toast.error(data.message)
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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(user)
    const { data } = await Api.put("/student", user)
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
        <AvatarImage src={user?.image} />
        <AvatarFallback>
          {user.name && user?.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex w-full gap-5 items-center'>
          <Label>name: </Label>
          <Input onChange={changeHandler} className='w-auto' name='name' defaultValue={user?.name} />
        </div>
        <div className='flex w-full gap-5 items-center'>
          <Label>email: </Label>
          <Input onChange={changeHandler} className='w-auto' name='email' defaultValue={user?.email} />
        </div>
        <div className='flex gap-5 items-center'>
          <div>status: </div>
          <div>{user.status}</div>
        </div>
        <div className='flex gap-2 flex-col'>
            <ResetPassword />
          <div className='flex items-center gap-3'>
            <Button onClick={handleSave} className='flex gap-2 items-center justify-center text-center' >Save <FontAwesomeIcon icon={faSave} /> </Button>
            <Button onClick={handleLogout} className='flex gap-2 items-center justify-center text-center' variant="destructive" >Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /> </Button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Settings