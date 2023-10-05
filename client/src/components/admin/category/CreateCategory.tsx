import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Api from "@/services/Api"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { toast } from "react-toastify"

interface Props {
    refresh: React.Dispatch<React.SetStateAction<number>>
}

const CreateCategory: React.FC<Props> = ({ refresh }) => {
    const [name, setName] = useState("")

    const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = async () => {
        const { data } = await Api.post("/category", { name })
        if (data.success) {
            toast.success("category created successfully")
            refresh((e) => e + 1)
        } else {
            toast.error(data.message)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <FontAwesomeIcon className="text-green-600" icon={faPlus} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>New Category</AlertDialogTitle>
                    <AlertDialogDescription>
                        Create a new category, dont forget click save
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue=""
                            placeholder="Enter category name"
                            className="col-span-3"
                            onChange={handleCHange}
                        />
                    </div>
                </div>
                <AlertDialogFooter>
                    <Button onClick={handleSubmit} type="submit">Save</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CreateCategory