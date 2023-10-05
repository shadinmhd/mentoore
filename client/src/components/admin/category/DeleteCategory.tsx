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
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { toast } from "react-toastify"

interface Props {
    id: string
    refresh : React.Dispatch<React.SetStateAction<number>>
}
const DeleteCategory: React.FC<Props> = ({ id, refresh }) => {

    const handleClick = async () => {
        const { data } = await Api.delete(`/category/${id}`)
        if (data.success) {
            toast.success("delete successfully")
            refresh((e) => e + 1)
        } else {
            toast.error(data.message)
        }
    }

    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <FontAwesomeIcon className="text-red-600" icon={faTrash} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteCategory