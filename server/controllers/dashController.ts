import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Mentor, Student, User } from "../models/userModel"
import messageModel from "../models/messageModel"
import slotModel from "../models/slotModel"
import mongoose from "mongoose"

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

        console.log(id)
        const chartData = await slotModel.aggregate([
            {
                $match: {
                    mentor: `ObjectId${id}`,
                },
            },
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
            {
                $sort: { date: 1 },
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
            user,
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

        const userData = await User.aggregate([
            {
                $project: {
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    }
                }
            },
            {
                $group: {
                    _id: "$date",
                    userCount: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).sort("_id")


        const slotData = await slotModel.aggregate([
            {
                $match: {
                    status: { $ne: "cancelled" },
                },
            },
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
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: {
                                $dateFromParts: {
                                    year: '$_id.year',
                                    month: '$_id.month',
                                    day: '$_id.day',
                                },
                            },
                        },
                    },
                    count: 1,
                    _id: 0,
                },
            },
        ]).sort("date")

        const userCount = await User.countDocuments() - 1
        const mentorCount = await Mentor.countDocuments()
        const studentCount = await Student.countDocuments()
        const newMentors = await Mentor.countDocuments({ status: "new" })

        const completedBookings = await slotModel.countDocuments({ status: "complete" })
        const bookings = await slotModel.countDocuments({ status: "booked" })
        const cancelledBookings = await slotModel.countDocuments({ status: "cancelled" })

        const slots = {
            completed: completedBookings,
            booked: bookings,
            cancelled: cancelledBookings
        }

        res.send({
            success: true,
            message: "data fetched",
            userData,
            slotData,
            userCount,
            mentorCount,
            studentCount,
            slots,
            newMentors
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}