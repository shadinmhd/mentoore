import React, { useState } from 'react'

const Otp = () => {
  const [otp, setOtp] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setOtp(value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(otp)
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>Otp</label>
        <input type="text" onChange={changeHandler} />
        <button type="submit">verify otp</button>
      </form>
    </>
  )
}

export default Otp
