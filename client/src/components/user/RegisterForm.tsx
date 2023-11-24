import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { userregisterSchema } from '@/validators/auth'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Navbar from '../Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Api from '@/services/Api'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'

type Input = z.infer<typeof userregisterSchema>

const RegisterForm = () => {
	const form = useForm<Input>({
		resolver: zodResolver(userregisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		}
	})

	const navigate = useNavigate()

	console.log(form.watch())

	const onSubmit = async (userData: Input) => {
		try {
			if (userData.password == userData.confirmPassword) {
				const { data } = await Api.post("/student/register", userData)
				if (data.success) {
					toast.success("account created successfully")
					navigate("/otp")
				} else {
					toast.error(data.message)
				}
			}
		} catch (error) {
			if(isAxiosError(error)){
				if(error.response?.data.message){
					toast.error(error.response.data.message)
				}else{
					toast.error(error.message)
				}	
			}else{
				console.log(error) 
			}
		}
	}

	return (
		<div className='flex flex-col gap-20 justify-start items-center'>
			<Navbar />
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
								Register
							</Button>
						</form>
						<div className='flex flex-col mt-2'>
							<Link to={"/login"} className='text-blue-600' >all ready have an account?</Link>
							<Link to={"/mentorRegister"} className='text-blue-600' >become a mentor?</Link>
						</div>
					</Form>

				</CardContent>
			</Card>
		</div>
	)
}

export default RegisterForm
