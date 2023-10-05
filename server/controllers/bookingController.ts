import { Request, Response } from "express"
import { Mentor, User } from "../models/userModel"
import bookingModel from "../models/slotModel"
import jwt from "jsonwebtoken"
import transactionModel from "../models/transactionModel"
import moment from "moment"
import slotModel from "../models/slotModel"

export const book = async (req: Request, res: Response) => {
    try {
        console.log("bookings")
        const { bookingId } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const userId = (payload as { id: string }).id

        const searchUser = await User.findById(userId)
        const searchBooking = await bookingModel.findById(bookingId)

        if (!searchUser || !searchBooking) {
            return res.send({
                success: false,
                message: "couldn't find user or slot"
            })
        }

        if (searchUser.wallet.balance! < 100) {
            return res.send({
                success: false,
                message: "insufficient balance"
            })
        }

        await User.updateOne({ _id: searchUser._id }, { $inc: { "wallet.balance": -100 } })
        await bookingModel.updateOne({ _id: searchBooking._id }, { $set: { user: userId, status: "booked" } })
        await Mentor.updateOne({ _id: searchBooking.mentor }, { $inc: { "wallet.balance": 100 } })
        await new transactionModel({
            amount: 100,
            from: userId,
            to: searchBooking.mentor,
            type: "booking",
            time: moment()
        }).save()

        res.send({
            success: true,
            message: "slot booked"
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const cancel = async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const userid = (payload as { id: string }).id
        console.log(id)
        const searchBooking = await slotModel.findOne({ _id: id })
        if (!searchBooking) {
            return res.send({
                success: false,
                message: "booking doesn't exist",
            })
        }

        await slotModel.updateOne({ _id: id }, { $set: { status: "cancelled" } })
        await new slotModel({
            date: searchBooking.date,
            startTime: searchBooking.startTime,
            status: "open",
            mentor: searchBooking.mentor
        }).save({})
        await User.updateOne({ _id: userid }, { $inc: { "wallet.balance": 100 } })
        await new transactionModel({
            amount : 100,
            from : searchBooking.mentor,
            to : userid,
            time : moment(),
            type : "cancel booking"
        }).save()
        await Mentor.updateOne({ _id: searchBooking.mentor }, { $inc: { "wallet.balance": -100 } })

        res.send({
            success: true,
            message: "booking cancelled"
        })
    } catch (err) {
        console.log(err)
    }

}