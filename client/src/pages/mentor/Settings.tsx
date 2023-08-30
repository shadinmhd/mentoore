import React, { useEffect, useState } from "react"
import SubmitButton from "../components/form/SubmitButton"
import userIcon from "../../assets/user.png"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import mentorActions from "../../redux/features/mentorActions"


const Settings = () => {

    const dispatch: AppDispatch = useDispatch()
    const [previewImage, setPreviewImage] = useState<File | null>()
    let mentor = useSelector((state: RootState) => state.mentor.mentor)

    useEffect(() => {
        dispatch(mentorActions.mentorGet())
    }, [dispatch])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData
        data.append("id", mentor._id)
        data.append("firstName", mentor.firstName)
        data.append("lastName", mentor.lastName)
        data.append("email", mentor.email)
        if (previewImage) {
            data.append("image", previewImage)
        }
        dispatch(mentorActions.mentorUpdate({ data }))
    }
    const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files) {
            setPreviewImage(files[0])
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        mentor = { ...mentor, [name]: value }
    }

    return (
        <div className="h-screen gap-5 flex-col flex items-center justify-center">
            <label htmlFor="image" className="hover:cursor-pointer">
                <img className="w-28 h-28 object-contain" src={previewImage && (URL.createObjectURL(previewImage)) || mentor.image || userIcon} />
            </label>
            <form onSubmit={submitHandler} className="flex flex-col bg-white w-52 gap-2">
                <input value={mentor.firstName} name="firstName" placeholder="firstName" type="text" onChange={changeHandler} className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
                <input value={mentor.lastName} name="lastName" placeholder="lastName" type="text" onChange={changeHandler} className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
                <input value={mentor.email} name="email" placeholder="email" type="email" onChange={changeHandler} className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
                <input hidden id="image" name="image" placeholder="image" type="file" onChange={imageChangeHandler} />
                <SubmitButton text="save" />
            </form>
        </div>
    )
}

export default Settings