import { useState } from 'react'
import Input from '../../components/form/Input'
import SubmitButton from '../../components/form/SubmitButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { toast } from "react-toastify"
import userActions from '../../redux/features/userActions'
import Otp from '../../components/Otp'
import { PuffLoader } from 'react-spinners'

const UserRegister = () => {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    password1: "",
    password2: ""
  })
  const [otp, setOtp] = useState(false)
  let loading = useSelector((state: RootState) => state.auth.loading)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.password1 == user.password2) {
      const { payload } = await dispatch(userActions.userRegister({
        name: user.name,
        email: user.email,
        password: user.password1
      }))
      if (payload.success) {
        // setOtp(true)
        navigate("/login")
      }
    }
    else
      toast.error("password doesnt match")
  }

  const changeHander = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  return (
    <>

      {loading ?
        <PuffLoader color='#2563eb' /> :
        <>
          {
            otp ?
              <Otp id={user._id} /> :
              < div className='flex items-center h-screen justify-center'>
                <form onSubmit={submitHandler}
                  className='rounded-lg flex px-5 py-9 flex-col gap-5 items-center bg-white drop-shadow-lg'>
                  <p className='text-3xl mb-5 font-bold text-blue-600'>
                    Register
                  </p>
                  <div className='flex flex-col gap-2'>
                    <Input name='name' placeholder='username' type='text' onchange={changeHander} />
                    <Input name='email' placeholder='email' type='text' onchange={changeHander} />
                    <Input name='password1' placeholder='password' type='password' onchange={changeHander} />
                    <Input name='password2' placeholder='confirm password' type='password' onchange={changeHander} />
                  </div>
                  <SubmitButton text="Register" />
                  <div className='flex flex-col'>
                    <Link to="/login" className='text-blue-500 underline'>all ready have an account?</Link>
                    <Link to="/mentor/register" className='text-blue-500 underline'>want to become a mentor?</Link>
                  </div>
                  {/* <span className='bg-gray-400 w-full h-[1px]'></span> */}
                </form>
              </div >
          }
        </>
      }
    </>
  )
}

export default UserRegister
