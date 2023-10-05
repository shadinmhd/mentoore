import { z } from "zod";

export const adminSchema = z.object({
    name : z.string(),
    email : z.string().email(),
})