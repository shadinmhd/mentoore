import { Request, Response } from "express";
import { User } from "../models/userModel";
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