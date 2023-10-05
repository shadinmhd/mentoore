import { useForm } from 'react-hook-form'
import { userregisterSchema } from '@/validators/auth'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { DialogHeader, Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import Api from '@/services/Api'
import { toast } from 'react-toastify'
import React from 'react'

type Input = z.infer<typeof userregisterSchema>

interface Props {
    refresh: React.Dispatch<React.SetStateAction<number>>
}

const RegisterForm: React.FC<Props> = ({ refresh }) => {
    const form = useForm<Input>({
        resolver: zodResolver(userregisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    console.log(form.watch())

    const onSubmit = async (userData: Input) => {
        if (userData.password == userData.confirmPassword) {
            const { data } = await Api.post("/admin/user", userData)
            if (data.success) {
                toast.success("user created successfully")
                form.resetField("confirmPassword")
                form.resetField("password")
                form.resetField("email")
                form.resetField("name")
                refresh((e) => e + 1)
            } else {
                toast.error(data.message)
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <FontAwesomeIcon className='text-green-600' icon={faPlus} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-blue-600 font-semibold text-2xl'>
                        Create User
                    </DialogTitle>
                    <DialogDescription>
                        create a new user, without needing of verification
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField name='name' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your name' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name='email' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter your email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name='password' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Enter your password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name='confirmPassword' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Confirm your password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button className='mt-2' type='submit'>
                            save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterForm
