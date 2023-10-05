import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Api from "@/services/Api"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { toast } from "react-toastify"

interface Props {
    id: string,
    refresh: React.Dispatch<React.SetStateAction<number>>,
    defaultName: string
}

const EditCategory: React.FC<Props> = ({ id, refresh, defaultName }) => {
    const [name, setName] = useState(defaultName)

    const handleCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = async () => {
        const { data } = await Api.put(`/category`, { id, name })
        if (data.success) {
            toast.success("category edited successfully")
            refresh((e) => e + 1)
        } else {
            toast.error(data.message)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FontAwesomeIcon className="text-blue-600" icon={faPencil} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Create a new category, dont forget click save
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue={defaultName}
                            placeholder="Enter category name"
                            className="col-span-3"
                            onChange={handleCHange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditCategory