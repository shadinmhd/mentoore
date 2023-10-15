import { Request, Response } from 'express'
import { checkBookingsTimeCollition } from "../utils/checkBookingsTImeCollition"
import jwt from "jsonwebtoken"
import slotModel from "../models/slotModel"
import { Mentor, Student, User } from '../models/userModel'
import colors from "colors"
import transactionModel from '../models/transactionModel'
import moment from 'moment'

export const getSlot = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const searchSlot = await slotModel.findOne({ _id: id })
        if (!searchSlot) {
            return res.send({
                success: false,
                message: "slot doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "slot fetched",
            slot: searchSlot
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getAllSlots = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const bookings = await slotModel.find({ mentor: (payload as { id: string }).id }).populate("user")
        console.log(bookings)
        res.send({
            success: true,
            message: "bookings fetched",
            bookings
        })

    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const createSlot = async (req: Request, res: Response) => {
    try {
        const { date, startTime } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const id = (payload as { id: string })?.id

        let collition = await checkBookingsTimeCollition(startTime)

        if (collition) {
            new slotModel({
                mentor: id,
                date,
                startTime,
            }).save()

            const bookings = await slotModel.find({ mentor: id })
            const bookingids = bookings.map((e) => e._id)
            await Mentor.updateOne({ _id: id }, { $set: { bookings: bookingids } })

            return res.send({
                success: true,
                message: "created bookings successfully"
            })

        } else {
            return res.send({
                success: false,
                message: "time colliding with one or more bookings"
            })
        }


    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const deleteSlot = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const searchSlot = await slotModel.findOne({ _id: id })
        if (!searchSlot) {
            return res.send({
                success: false,
                message: "slot doesn't exit"
            })
        }

        if (searchSlot.status == "booked") {
            const searchMentor = await User.findOne({ _id: searchSlot.mentor })
            if (searchMentor?.wallet.balance! < 100) {
                return res.send({
                    success: false,
                    message: "insuficcent balance"
                })
            }
            await Student.updateOne({ _id: searchSlot.user }, { $inc: { "wallet.balance": 100 } })
            await Mentor.updateOne({ _id: searchSlot.mentor }, { $inc: { "wallet.balance": -100 } })
            await new transactionModel({
                amount: 100,
                from: searchSlot.mentor,
                to: searchSlot.user,
                time: moment(),
                type: "cancel booking"
            }).save()
        }

        await slotModel.deleteOne({ _id: id })

        res.send({
            success: true,
            message: "slot deleted successfully"
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const completeSession = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }

        const mentor = await Mentor.findOne({ _id: payload.id }, { password: 0 })
        const slot = await slotModel.findOne({ _id: id, mentor: mentor._id })

        if (!slot) {
            return res.send({
                success: false,
                message: "invalid mentor or slot"
            })
        }

        const now = moment()
        const sessionTime = moment(slot.startTime)
        const diff = now.diff(sessionTime, "minutes")
        console.log(diff)
        if (diff < 1) {
            return res.send({
                success: false,
                message: "cannot complete session before session time"
            })
        }

        await slotModel.updateOne({ _id: id }, { $set: { status: "complete" } })

        res.send({
            success: true,
            message: "session completed"
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}