import { Request, Response } from "express";
import { User } from "../models/userModel"
import jwt from "jsonwebtoken"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.send({
                success: false,
                message: "please enter all fields"
            })
        }

        let userSearch = await User.findOne({ email })

        if (!userSearch) {
            return res.send({
                success: false,
                message: "user doesn't exist",
            })
        }

        if (userSearch.password != password) {
            return res.send({
                success: false,
                message: "incorrect passwod"
            })
        }

        if (userSearch.status == "blocked") {
            return res.send({
                success: false,
                message: "this account is blocked "
            })
        }

        const payload = {
            type: userSearch.type.toLocaleLowerCase(),
            id: userSearch._id.toString()
        }
        const token = jwt.sign(payload, process.env.jwt as string)

        res.send({
            success: true,
            message: "otp has been send",
            token,
            type: userSearch.type.toLocaleLowerCase()
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "somethign went wrong"
        })
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { password, currentPassword } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const id = (payload as { id: string }).id

        const userSearch = await User.findOne({ _id: id })
        if (!userSearch) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        if (userSearch.password != currentPassword) {
            return res.send({
                success: false,
                message: "incorrect password"
            })
        }

        await User.updateOne({ _id: id }, { $set: { password } })

        res.send({
            success: true,
            message: "password changed successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}