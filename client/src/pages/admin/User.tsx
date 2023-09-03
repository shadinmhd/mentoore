import React, { useState, useEffect } from "react"
import SubmitButton from "../../components/form/SubmitButton"
import userIcon from "../../assets/user.png"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import authSlice from "../../redux/features/authSlice"
import { useNavigate, useParams } from "react-router-dom"
import adminActions from "../../redux/features/adminActions"
import adminSlice from "../../redux/features/adminSlice"
import { PuffLoader } from "react-spinners"


const User = () => {

    const dispatch: AppDispatch = useDispatch()
    const params = useParams<{ id: string }>()
    const [previewImage, setPreviewImage] = useState<File | null>()
    let user = useSelector((state: RootState) => state.admin?.user)
    let loading = useSelector((state: RootState) => state.admin?.loading)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(adminActions.userGet({ id: params.id as string }))
    }, [dispatch])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData()
        data.append("id", user._id)
        data.append("name", user.name)
        data.append("status", user.status)
        data.append("email", user.email)
        if (previewImage) {
            data.append("image", previewImage)
        }
        dispatch(adminActions.userEdit({ editInfo: data }))
    }

    const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files) {
            setPreviewImage(files[0])
        }
    }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(adminSlice.actions.updateUser({ name, value }))
    }

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log("deleted")
    }

    return (
        <div className="h-screen gap-5 flex-col flex items-center justify-center">
            {
                loading ?
                    <PuffLoader color="#2563eb" /> :
                    <>
                        <label htmlFor="image" className="hover:cursor-pointer">
                            <img className="w-28 h-28 object-contain" src={previewImage && (URL.createObjectURL(previewImage)) || user?.image || userIcon} />
                        </label>
                        <form onSubmit={submitHandler} className="flex flex-col bg-white w-52 gap-2">
                            <input value={user && user?.name} name="name" placeholder="username" type="text" onChange={changeHandler}
                                className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
                            <input value={user && user?.email} name="email" placeholder="email" type="email" onChange={changeHandler} className='w-full focus:outline-blue-700 border-[1.4px] rounded-md border-blue-500 px-2 py-1 text-blue-600' />
                            <input hidden id="image" name="image" placeholder="image" type="file" onChange={imageChangeHandler} />
                            <SubmitButton text="save" />
                        </form>
                        <div className="flex gap-5">
                            <button onClick={deleteHandler} className='hover:bg-white hover:text-red-600 hover:shadow-2xl transition-all w-full py-[7px] px-2 bg-red-600 rounded-lg text-white'>
                                delete
                            </button>
                        </div>
                    </>
            }
        </div >
    )
}

export default User
