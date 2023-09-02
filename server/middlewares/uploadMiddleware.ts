import multer from "multer"
import userModel from "../models/userModel"
import jwt from "jsonwebtoken"
import mentorModel from "../models/mentorModel"

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        let type = ""
        let id = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        id && (type = "user", await userModel.findById(id, { _id: 1 })) || (type = "mentor", await mentorModel.findById(id, { _id: 1 }))
        if (type == "user")
            cb(null, "./public/user")
        if (type == "mentor")
            cb(null, "./public/mentor")
    },
    filename: async (req, file, cb) => {
        let type = ""
        let id = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        id && (type = "user", await userModel.findById(id, { _id: 1 })) || (type = "mentor", await mentorModel.findById(id, { _id: 1 }))
        const extenstion = file.originalname.split(".")[1]
        if (type == "user")
            cb(null, `${req.body.name}.${extenstion}`)
        if (type == "mentor")
            cb(null, `${req.body.firstName}.${extenstion}`)
    }
})


export const upload = multer({ storage }).single("image")