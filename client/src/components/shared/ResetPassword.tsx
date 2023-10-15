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
import { faKey } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const ResetPassword = () => {

  const [currentPassword, setCurrentPassword] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  const handleSubmit = async () => {

    if (password1 == password2) {
      const { data } = await Api.put(`/auth/reset`, { currentPassword: currentPassword, password: password1 })
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex gap-2 w-max">
          <span>
            Reset password
          </span>
          <FontAwesomeIcon icon={faKey} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset password</AlertDialogTitle>
          <AlertDialogDescription className="font-sans">
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Label htmlFor="currentPassword">
          Current password
        </Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
          name="currentPassword"
          placeholder="current password"
          type="password"
        />

        <Label htmlFor="currentPassword">
          New password
        </Label>

        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword1(e.target.value)}
          name="newPassword"
          placeholder="new password"
          type="password"
        />

        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ResetPassword