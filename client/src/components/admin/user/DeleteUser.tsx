import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
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

const DeleteUser: React.FC<Props> = ({ id }) => {

    const navigate = useNavigate()
    const submit = async () => {
        const { data } = await Api.delete(`/admin/student/${id}`)
        if (data.success) {
            toast.success(data.message)
            navigate("/admin/users")
        } else {
            toast.error(data.message)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="felx gap-1" variant={"destructive"}>
                    <div> Delete </div>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                        are you sure about deleting this user
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>no</AlertDialogCancel>
                    <AlertDialogAction className='bg-red-500 hover:bg-red-500' onClick={submit}>yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteUser