import { z } from "zod";

export const bookingSchema = z.object({
    _id : z.string(),
    mentor : z.string(),
    user : z.string(),
    status : z.string(),
    date : z.string(),
    startTime : z.string()
})