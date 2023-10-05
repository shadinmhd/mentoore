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
import { bookingSchema } from "@/validators/bookingType"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { z } from "zod"

interface Props {
    refresh: React.Dispatch<React.SetStateAction<number>>,
    id: string
}

type BookingType = z.infer<typeof bookingSchema>

export const DeleteBooking: React.FC<Props> = ({ id, refresh }) => {
    const [booking, setBooking] = useState<BookingType>({
        _id: "",
        date: "",
        mentor: "",
        startTime: "",
        status: "",
        user: "",
    })
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        (async () => {
            const { data } = await Api.get(`/slot/${id}`)
            if (data.success) {
                setBooking(data.slot)
            } else {
                toast.error(data.message)
            }
        })(),
            (async () => {
                const { data } = await Api.get("/wallet")
                if (data.success) {
                    setBalance(data.wallet.balance)
                } else {
                    toast.error(data.message)
                }
            })()
    }, [])

    const handleSubmit = async () => {
        const { data } = await Api.delete(`/slot/${id}`)
        if (data.success) {
            toast.success(data.message)
            refresh((prev) => prev + 1)
        } else {
            toast.error(data.message)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="font-sans text-red-600">
                        {booking.status == "booked" ?
                            balance < 100 ?
                                <span>
                                    this slot is booked by a student, your wallet doesn't have enough balance to deduct the return amount
                                </span> :
                                <span>
                                    this slot is booked by a student if you delete it 100 credit will be deducted from your wallet
                                </span> :
                            <span>
                                This action cannot be undone. This will permanently delete this slot
                            </span>
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={booking.status == "booked" && balance < 100} className="bg-red-600 hover:bg-red-600" onClick={handleSubmit}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}