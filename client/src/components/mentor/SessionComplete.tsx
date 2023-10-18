import Api from '@/services/Api'
import React from 'react'
import { toast } from 'react-toastify'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface Props {
  id: string,
  refresh: React.Dispatch<React.SetStateAction<number>>
}

const SessionComplete: React.FC<Props> = ({ id, refresh }) => {

  const submit = async () => {
    const { data } = await Api.post(`/slot/complete/${id}`)
    if (data.success) {
      toast.success(data.message)
      refresh((prev) => prev + 1 )
    } else {
      toast.error(data.message)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Complete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel</AlertDialogTitle>
          <AlertDialogDescription>
            would you like to confirm that the session is complete
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>no</AlertDialogCancel>
          <AlertDialogAction className='' onClick={submit}>yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SessionComplete