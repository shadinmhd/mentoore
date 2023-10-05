import { Request, Response } from "express";
import { User } from "../models/userModel"
import jwt from "jsonwebtoken"

export const getWallet = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const searchUser = await User.findOne({ _id: payload.id })
        if (!searchUser) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "wallet fetched",
            wallet: searchUser.wallet,
            userId : searchUser._id
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}