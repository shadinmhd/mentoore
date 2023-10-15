import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { mentorRegisterSchema } from '@/validators/auth'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectItem } from '../ui/select'
import Api from '@/services/Api'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

type Input = z.infer<typeof mentorRegisterSchema>

interface CategoryType {
    name: string
}

const RegisterForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState<CategoryType[]>([])
    const form = useForm<Input>({
        resolver: zodResolver(mentorRegisterSchema),
        defaultValues: {
            name: "",
            password: "",
            confirmPassword: "",
            email: "",
            category: "",
        }
    })

    useEffect(() => {
        (async () => {
            const { data } = await Api.get("/category")
            if (data.success) {
                setCategories(data.categories)
            } else {
                toast.error(data.message)
            }
        })()
    }, [])

    console.log(form.watch())

    const onSubmit = async (menotorData: Input) => {
        if (menotorData.password == menotorData.confirmPassword) {
            const { data } = await Api.post("/mentor/register", menotorData)
            if (data.success) {
                toast.success("accountd registered")
                navigate("/otp")
            } else {
                toast.error(data.message)
            }
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name='name' control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription ></FormDescription>
                                </FormItem>
                            )} />
                            <FormField name='email' control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter your emiail' {...field} />
                                    </FormControl>
                                    <FormDescription ></FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name='password' control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='Enter your password' {...field} />
                                    </FormControl>
                                    <FormDescription ></FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name='confirmPassword' control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='Confirm your password' {...field} />
                                    </FormControl>
                                    <FormDescription ></FormDescription>

                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a verified email to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormDescription ></FormDescription>
                                            <SelectContent>
                                                {
                                                    categories.map((e, i) => (
                                                        <SelectItem key={i} value={e.name} >{e.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>
                                Register
                            </Button>
                            <Link to={"/login"} >
                                all ready have an account
                            </Link>
                        </form>
                    </Form>

                </CardContent>
            </Card>

        </div>
    )
}

export default RegisterForm