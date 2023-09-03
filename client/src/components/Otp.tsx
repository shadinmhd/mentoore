import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import authActions from '../redux/features/authActions'
import { useNavigate } from 'react-router-dom'

interface Props {
  id: string
}

const Otp: React.FC<Props> = ({ id }) => {
  const [otp, setOtp] = useState<string>("")

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setOtp(value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { payload } = await dispatch(authActions.verifyOtp({ id, otp }))
    console.log(id)
    if (payload.success) {
      navigate("/login")
    }
  }

  return (
    <>
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
    </>
  )
}

export default Otp