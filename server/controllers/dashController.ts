import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../models/userModel"
import messageModel from "../models/messageModel"
import slotModel from "../models/slotModel"

export const getStudent = async (req: Request, res: Response) => {
    try {
        const { id } = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await User.findOne({})
        const messages = await messageModel.find({ reciever: id }).populate("sender").sort({ createdAt: -1 }).limit(5)
        const wallet = user?.wallet

        res.send({
            success: true,
            message: "data fetched successfully",
            messages,
            wallet
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getMentor = async (req: Request, res: Response) => {
    try {
        const { id } = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await User.findOne({ _id: id })

        if (!user) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        const chartData = await slotModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    date: {
                        $dateFromParts: {
                            year: '$_id.year',
                            month: '$_id.month',
                            day: '$_id.day',
                        },
                    },
                    count: 1,
                    _id: 0,
                },
            },
        ])

        const bookedSlots = await slotModel.countDocuments({ mentor: id, status: "booked" })
        const openslots = await slotModel.countDocuments({ mentor: id, status: "open" })
        const completed = await slotModel.countDocuments({ mentor: id, status: "complete" })
        const messages = await messageModel.find({ reciever: id }).populate("sender").sort({ createdAt: -1 }).limit(5)
        res.send({
            success: true,
            message: "fetched data for dashboard",
            bookedSlots,
            openslots,
            completed,
            wallet: user.wallet,
            messages,
            chartData
        })
    } catch (err) {

        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}
export const getAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await User.findOne({ _id: id })

        if (!user) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}