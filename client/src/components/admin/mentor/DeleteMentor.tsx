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
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface Props {
    id: string
}
const DeleteMentor: React.FC<Props> = ({ id }) => {
    const navigate = useNavigate()

    const handleClick = async () => {
        const { data } = await Api.delete(`/admin/mentor/${id}`)
        if (data.success) {
            toast.success("delete successfully")
            navigate("/admin/mentors")
        } else {
            toast.error(data.message)
        }
    }

    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button className="flex gap-1" variant="destructive">
                    <div>Delete</div>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this user
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>no</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500" onClick={handleClick}>yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteMentor