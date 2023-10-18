import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Api from "@/services/Api"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface Props {
    id: string,
    date: string,
    startTime: string,
    refresh: React.Dispatch<React.SetStateAction<number>>
}

const BookSlot: React.FC<Props> = ({ id, date, startTime, refresh }) => {
    const [userBalance, setUserBalance] = useState(0)
    const [loggedIn, setLoggedIn] = useState<string | boolean | null>(localStorage.getItem("token"))
    const navigate = useNavigate()
    const type = localStorage.getItem("type")

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true)
        };
        (async () => {
            if (loggedIn) {
                if (type != "admin") {
                    const { data } = await Api.get("/wallet")
                    if (data.success) {
                        setUserBalance(data.wallet.balance)
                    } else {
                        toast.error(data.message)
                    }
                }
            } else {

            }
        })(),
            (() => {
                if (!localStorage.getItem("token"))
                    navigate("please login")
            })()
    })

    const handleSubmit = async () => {
        const time = moment()
        console.log(time)
        const { data } = await Api.post("/booking/book", { bookingId: id, time })
        if (data.success) {
            toast.success("booked successfully")
            refresh((e) => e + 1)
        } else {
            toast.error(data.message)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Book</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your balance: {userBalance}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex gap-2 text-blue-600"><span>Date: </span><span>{moment(date).format("YYYY/MM/DD")}</span></div>
                <div className="flex gap-2 text-blue-600"><span>Time:</span><span>{moment(startTime).format("HH:mm")}</span></div>
                <div className="flex gap-2 text-blue-600"><span>Price: </span><span className={userBalance < 100 ? "text-red-600" : "text-green-600"}>{100}</span></div>
                {
                    userBalance < 100 &&
                    <div className="text-red-600">
                        insufficent balance
                    </div>
                }
                {
                    !loggedIn &&
                    <div className="text-red-600">
                        you are not loggedIn
                    </div>
                }
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={!loggedIn || userBalance < 100} onClick={handleSubmit} >Book</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BookSlot