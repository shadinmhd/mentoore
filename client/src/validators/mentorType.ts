import { z } from "zod"

export const mentorSchema = z.object({
    _id: z.string(),
    name : z.string(),
    email: z.string(),
    status: z.string(),
    category: z.string(),
    image: z.string(),
    description: z.string(),
    bookings: z.array(z.object({
        _id : z.string(),
        mentor: z.string(),
        user: z.string(),
        status: z.string(),
        date : z.string(),
        startTime : z.string(),
    }))
})