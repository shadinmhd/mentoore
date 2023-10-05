import { z } from "zod"

export const userregisterSchema = z.object({
    name: z.string().min(5, { message: "your name should not be that short" }),
    email: z.string().email(),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export const mentorRegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    category: z.string()
})