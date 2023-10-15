import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Admin } from "../../models/userModel"

export const adminGet = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const admin = await Admin.findOne({ _id: payload.id }, { password: 0 })
        if (!admin) {
            return res.send({
                success: false,
                message: "admin doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "fetched admin data",
            user: admin
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const adminEdit = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body
        const oldAdmin = await Admin.findOne({ email })
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        if (!oldAdmin) {
            return res.send({
                success: false,
                message: "admin doesn't exist"
            })
        }
        let image = oldAdmin.image
        if (req.file) {
            image = `http://localhost:8000/public/user/${name}.${req.file.filename.split(".")[1]}`
        }

        const updatededUser = await Admin.findOneAndUpdate({ _id: payload.id }, { name, email, image })
        res.send({
            success: true,
            message: "profile updated",
            user: updatededUser
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const adminDelete = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        await Admin.deleteOne({ _id: payload.id })
        res.send({
            success: true,
            message: "user deleted"
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}