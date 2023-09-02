import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import adminActions from "../../redux/features/adminActions"

const User: React.FC = () => {
    let user = useSelector((state: RootState) => state?.admin?.user)

    const params = useParams()
    const dispatch: AppDispatch = useDispatch()


    useEffect(() => {
        dispatch(adminActions.userGet({ id: params?.id as string }))

    }, [dispatch])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        user = { ...user, [name]: value }
    }

    return (
        <form className="flex items-center justify-center flex-col gap-2">
            {
                user.image &&
                <img className="w-52" src={user.image} alt="user image" />
            }
            <input placeholder="" onChange={changeHandler} value={user && user.name} className="rounded-lg px-2 py-1 text-blue-600 text-xl font-semibold  border-solid border-blue-600 border" />
            <input placeholder="" onChange={changeHandler} value={user && user.email} className="rounded-lg px-2 py-1 text-blue-600 text-xl font-semibold border-solid border-blue-600 border" />
        </form>
    )
}

export default User