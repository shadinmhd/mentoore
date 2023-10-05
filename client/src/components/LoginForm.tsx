import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { loginSchema } from '@/validators/auth'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import Api from '@/services/Api'
import { toast } from 'react-toastify'

type Input = z.infer<typeof loginSchema>

const LoginForm = () => {
    const navigate = useNavigate()
    const form = useForm<Input>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    console.log(form.watch())

    const onSubmit = async (logindata: Input) => {
        const {data} = await Api.post("/auth/login", logindata)
        if(data.success){
            toast.success("logged in successfully")
            localStorage.setItem("token", data.token)
            localStorage.setItem("type", data.type)
            navigate(`/${data.type}`)
        }else{
            toast.error(data.message)
            form.resetField('email')
            form.resetField('password')
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <Button className='mt-2' type='submit'>
                                Login
                            </Button>
                        </form>
                        <div className='flex flex-col mt-2'>
                            <Link to={"/userRegister"} className='text-blue-600' >don't have an account</Link>
                        </div>
                    </Form>

                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm
