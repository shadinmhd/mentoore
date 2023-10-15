import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import messageModel from "../models/messageModel"
import slotModel from "../models/slotModel"
import { User } from "../models/userModel"

export const getConversations = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string, type: string }
        let users

        if (payload.type == "student") {
            const uniqueUsers = await slotModel.distinct("mentor", { user: payload.id }).populate("mentor")
            users = await User.find({ _id: { $in: uniqueUsers } })
        } else if (payload.type == "mentor") {
            const uniqueUsers = await slotModel.distinct("user", { mentor: payload.id }).populate("user")
            users = await User.find({ _id: { $in: uniqueUsers } })
        }


        res.send({
            success: true,
            message: "mentors fetched successfully",
            users
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }

        if (!id) {
            return res.send({
                success: false,
                message: "id not provided"
            })
        }

        const messages = await messageModel.find({
            $or: [
                { sender: payload.id, reciever: id },
                { sender: id, reciever: payload.id }
            ]
        })

        res.send({
            success: true,
            message: "fetched messages",
            messages
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}