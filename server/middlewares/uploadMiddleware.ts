import multer from "multer"
import { User } from "../models/userModel"
import jwt from "jsonwebtoken"

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let id = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        await User.findById(id, { _id: 1 })
        cb(null, "./public/user")
    },
    filename: async (req, file, cb) => {
        let id = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        await User.findById(id, { _id: 1 })
        const extenstion = file.originalname.split(".")[1]
        cb(null, `${req.body.name}.${extenstion}`)
    }
})


export const upload = multer({ storage }).single("image")