import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/userModel";

export const getUser = async (req: Request, res: Response) => {
    try {
        // const { id } = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const { id } = req.params
        const user = await User.findOne({ _id: id }, { password: 0 })

        if (!user) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "user fetched",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}