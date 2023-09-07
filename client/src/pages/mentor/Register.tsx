import { useEffect, useState } from 'react'
import Input from '../../components/form/Input'
import SubmitButton from '../../components/form/SubmitButton'
import Select from '../../components/form/Select'
import Api from '../../services/Api'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"

interface CategoyType {
    name: string
}

const MentorRegister = () => {
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
        category: ""
    })

    useEffect(() => {
        (async () => {
            const { data } = await Api.get("/category/get")
            setCategories(data.categories)
        })()
    }, [])

    const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user.password1 == user.password2) {
            console.log(user)
        }
        else
            toast.error("password doesnt match")
    }
    const changeHander = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target
        setUser((prevUser) => ({ ...prevUser, [name]: value }))
    }
    return (
        <div className='flex items-center h-screen justify-center'>
            <form onSubmit={submitHandler} className='rounded-lg flex px-5 py-9 flex-col gap-5 items-center bg-white drop-shadow-lg'>
                <p className='text-3xl mb-5 font-bold text-blue-600'>
                    Register
                </p>
                <div className='flex flex-col gap-2'>
                    <Input name='firstName' placeholder='First name' type='text' onchange={changeHander} />
                    <Input name='lastName' placeholder='Last name' type='text' onchange={changeHander} />
                    <Input name='email' placeholder='Email' type='text' onchange={changeHander} />
                    <Input name='password1' placeholder='password' type='password' onchange={changeHander} />
                    <Input name='password2' placeholder='confirm password' type='password' onchange={changeHander} />
                    {
                        categories &&
                        <Select defaultValue='category' value='' className='' name='category' options={categories.map((e: CategoyType) => e.name != "All" ? e : { name: " " })} onchange={changeHander} />
                    }
                </div>
                <SubmitButton text="Register" />
                <Link to="/login" className='text-blue-500 underline'>all ready have an account?</Link>
            </form>
        </div>
    )
}

export default MentorRegister