import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import React from "react"

interface Porps {
    id: string
}

const Checkout: React.FC<Porps> = ({ id }) => {
    const user = useSelector((state: RootState) => state.user.user)
    console.log(id)
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        const userId = user._id
        const bookingsId = id
        const price = 100
        
    }

    return (
        <div className='flex items-center justify-center text-blue-600 fixed top-0 left-0 w-full h-screen bg-white bg-opacity-80'>

            <form onSubmit={submitHandler} className="flex gap-2 items-center flex-col rounded-sm drop-shadow-lg bg-white px-5 py-2">
                <label className="text-2xl text-center font-bold">Book</label>
                <div className="gap-10 flex"><span>Balance:</span> {String(user.wallet.balance)}</div>
                <div className="gap-10 flex"><span>Price: </span><span> 100</span></div>
                <div className="h-[1px] w-full bg-gray-400"></div>
                <div className="gap-10 flex"><span>Total: </span><span> 100/-</span></div>
                <button className="text-white mt-2 bg-blue-600 rounded-lg px-2 py-1">
                    confirm
                </button>
            </form>
        </div>
    )
}

export default Checkout