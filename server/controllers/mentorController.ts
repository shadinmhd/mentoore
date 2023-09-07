import { Request, Response } from "express"
import userModel from "../models/userModel"
import mentorModel from "../models/mentorModel"
import bookingModel from "../models/bookingModel"
import jwt, { JwtPayload } from "jsonwebtoken"

const registerMentor = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, category } = req.body

        const searcMentor = (await mentorModel.findOne({ email })) || (await userModel.findOne({ email }))
        if (searcMentor) {
            res.send({
                success: false,
                message: "email all ready in use"
            })
            return
        }

        await new mentorModel({
            firstName,
            lastName,
            email,
            password,
            category
        }).save()

        res.send({
            success: true,
            message: "user created"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

const getAllMentors = async (req: Request, res: Response) => {
    try {
        const mentors = await mentorModel.find({}, { password: 0 })
        res.send({
            success: true,
            message: "fetched all mentors",
            mentors
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

const getMentor = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const mentor = await mentorModel.findOne({ _id: payload.id }, { password: 0 })
        console.log(payload?.id)
        res.send({
            success: true,
            message: "user fetched",
            mentor
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }

}

const updateMentor = async (req: Request, res: Response) => {
    try {
        const { id, firstName, lastName, email } = req.body
        const oldUser = await mentorModel.findById(id)
        if (!oldUser) {
            return res.send({
                success: false,
                message: "no user exists"
            })
        }

        let image = oldUser.image
        if (req.file) {
            image = `http://localhost:8000/public/mentor/${firstName}.${req.file.filename.split(".")[1]}`
            console.log(firstName)
        }

        const updatededUser = await mentorModel.findOneAndUpdate({ _id: id }, { lastName, firstName, email, image })
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

const deleteMentor = async (req: Request, res: Response) => {
    try {

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

const createBookings = async (req: Request, res: Response) => {
    try {
        const { date, endTime, startTime } = req.body
        const id = req.params.id
        const mentor = await mentorModel.findOne({ _id: id })
        if (!mentor) {
            return res.send({
                success: false,
                message: "mentor not found"
            })
        }

        const booking = await bookingModel.insertMany([{ date, startTime, endTime, mentor: id }])
        console.log(booking)

        res.send({
            success: true,
            message: "booking created successfully"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

const getAllBookings = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const id = (payload as { id: string })?.id as string
        const mentor = await mentorModel.findOne({ _id: id })
        if (!mentor) {
            return res.send({
                success: false,
                message: "invalid user"
            })
        }

        const bookings = await bookingModel.find({ mentor: id })
        res.send({
            success: true, 
            message: "bookings fetched",
            bookings
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

const createBooking = async (req: Request, res: Response) => {
    try {
        const { date, startTime, endTime } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const id = (payload as { id: string })?.id

        const booking = new bookingModel({
            mentor: id,
            date,
            startTime,
            endTime
        }).save()

        const mentorSearch = await mentorModel.findOne({ _id: id })
        console.log(mentorSearch)

        res.send({
            success: true,
            message: "got"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export {
    registerMentor, getAllMentors, getMentor, updateMentor, deleteMentor,
    createBookings, getAllBookings, createBooking
}
