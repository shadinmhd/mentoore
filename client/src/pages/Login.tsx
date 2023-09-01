import React, { useState } from 'react'
import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { PuffLoader } from 'react-spinners'
import authActions from '../redux/features/authActions'
import userActions from '../redux/features/userActions'
import mentorActions from '../redux/features/mentorActions'
import adminActions from '../redux/features/adminActions'

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const loading = useSelector((state: RootState) => state.user.loading)

    const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await dispatch(authActions.login({ ...user }))
        if (response.payload.success) {
            navigate(`/${localStorage.getItem("type")}`)
            if (response.payload.type == "user")
                dispatch(userActions.userGet())
            if (response.payload.type == "mentor")
                dispatch(mentorActions.mentorGet())
            if (response.payload.type == "admin")
                dispatch(adminActions.adminGet())
        }
    }
    const changeHander = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setUser((prevUser) => ({ ...prevUser, [name]: value }))
    }
    return (
        <>
            < div className='flex h-screen items-center justify-center' >
                {loading ?
                    <PuffLoader color='#2563eb' />
                    : (

                        <form onSubmit={submitHandler} className='rounded-lg flex px-5 py-9 flex-col gap-5 items-center bg-white drop-shadow-lg'>
                            <p className='text-3xl mb-5 font-bold text-blue-600'>Login</p>
                            <div className='flex flex-col gap-2'>
                                <Input name='email' placeholder='email' type='email' onchange={changeHander} />
                                <Input name='password' placeholder='password' type='password' onchange={changeHander} />
                            </div>
                            <SubmitButton text="Login" />
                            <Link to="/user/register" className='text-blue-500 underline'>dont have an account?</Link>
                        </form>
                    )

                }
            </div >
        </>

    )
}

export default Login