import React, { useState, useEffect } from "react"
import SubmitButton from "../../components/form/SubmitButton"
import userIcon from "../../assets/user.png"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import userActions from "../../redux/features/userActions"
import authSlice from "../../redux/features/authSlice"
import { useNavigate } from "react-router-dom"
import userSlice from "../../redux/features/userSlice"


const Settings = () => {

    const dispatch: AppDispatch = useDispatch()
    const [previewImage, setPreviewImage] = useState<File | null>()
    let user = useSelector((state: RootState) => state.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(userActions.userGet())
    }, [dispatch])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData()
        data.append("id", user._id)
        data.append("name", user.name)
        data.append("email", user.email)
        if (previewImage) {
            data.append("image", previewImage)
        }
        dispatch(userActions.userEdit(data))
    }
    const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files) {
            setPreviewImage(files[0])
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(userSlice.actions.updateUser({ name, value }))
    }

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(authSlice.actions.logout())
        navigate("/login")
    }

    return (
        <div className="h-screen gap-5 flex-col flex items-center justify-center">
            <label htmlFor="image" className="hover:cursor-pointer">
                <img className="w-28 h-28 object-contain" src={previewImage && (URL.createObjectURL(previewImage)) || user?.image || userIcon} />
            </label>
            <form onSubmit={submitHandler} className="flex flex-col bg-white w-52 gap-2">
                <input value={user && user?.name} name="name" placeholder="username" type="text" onChange={changeHandler} className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
                <input value={user && user?.email} name="email" placeholder="email" type="email" onChange={changeHandler} className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
                <input hidden id="image" name="image" placeholder="image" type="file" onChange={imageChangeHandler} />
                <SubmitButton text="save" />
            </form>
            <div className="flex gap-5">
                <button onClick={logout} className='hover:bg-white hover:text-red-600 hover:shadow-2xl transition-all w-full py-[7px] px-2 bg-red-600 rounded-lg text-white'>
                    logout
                </button>
                <button className='hover:bg-white hover:text-red-600 hover:shadow-2xl transition-all w-full py-[7px] px-2 bg-red-600 rounded-lg text-white'>
                    delete
                </button>
            </div>
        </div>
    )
}

export default Settings