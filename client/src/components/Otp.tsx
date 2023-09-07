import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import authActions from '../redux/features/authActions'
import { useNavigate } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'

interface Props {
  email: string
}

const Otp: React.FC<Props> = ({ email }) => {
  const [otp, setOtp] = useState<string>("")
  const type = useSelector((state: RootState) => state.auth.type)
  let user: any
  let loading: any
  if (type == "user")
    user = useSelector((state: RootState) => state.user.user)
  loading = useSelector((state: RootState) => state.user.loading)
  if (type == "mentor")
    loading = useSelector((state: RootState) => state.mentor.loading)
  user = useSelector((state: RootState) => state.mentor.mentor)


  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(authActions.getOtp(user.email))
    console.log(user.email)
  }, [dispatch])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setOtp(value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { payload } = await dispatch(authActions.verifyOtp({ email, otp }))
    if (payload.success) {
      navigate("/login")
    }
  }

  return (
    <>
      {
        loading ?
          <PuffLoader color='#2563eb' /> :
          <div className='h-screen flex items-center justify-center'>
            <form
              className='rounded-lg flex px-5 py-9 flex-col gap-5 items-center bg-white drop-shadow-lg'
              onSubmit={submitHandler}>
              <label className='text-3xl mb-5 font-bold text-blue-600' > OTP </label>
              <input
                className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600'
                placeholder='enter otp' type="text" onChange={changeHandler} />
              <button
                className='hover:bg-white hover:text-blue-600 hover:shadow-2xl transition-all w-full py-[7px] bg-blue-600 rounded-lg text-white'
                type="submit">verify otp</button>
            </form>
          </div>}
    </>
  )
}

export default Otp