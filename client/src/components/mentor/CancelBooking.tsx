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
import React from "react"
import { toast } from "react-toastify"

interface Props {
    id: string,
    refresh: React.Dispatch<React.SetStateAction<number>>
}

const CancelBooking: React.FC<Props> = ({ id, refresh }) => {

    const handleSubmit = async () => {
    const { data } = await Api.post("/booking/cancel/user", { id })
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
                <Button variant="destructive">Cancel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure about canceling this booking
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>no</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-600" onClick={handleSubmit}>yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CancelBooking