import { Request, Response } from "express";
import { User, Student } from "../models/userModel"
import jwt from "jsonwebtoken"
import bookingModel from "../models/slotModel";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, name, password, } = req.body

        const searchUser = await User.findOne({ email })
        console.log(searchUser)
        if (searchUser) {
            return res.send({
                success: false,
                message: "email all ready in use"
            })
        }

        const newUser = new Student({
            email,
            name,
            password,
        })
        await newUser.save()

        res.send({
            success: true,
            message: "user created",
            user: newUser
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong please try again"
        })
    }
}


export const studentGet = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await Student.findOne({ _id: payload.id }, { password: 0 })
        res.send({
            success: true,
            message: "user fetched",
            user,
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const studentUpdate = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const oldUser = await Student.findById(payload.id)
        if (!oldUser) {
            return res.send({
                success: false,
                message: "no user exists"
            })
        }
        let image = oldUser.image
        if (req.file) {
            image = `http://localhost:8000/public/user/${name}.${req.file.filename.split(".")[1]}`
        }

        const updatededUser = await Student.findOneAndUpdate({ _id: payload.id }, { name, email, image })
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

export const studentDelete = async (req: Request, res: Response) => {
    try {
        const id = req.headers.authorization
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getBooking = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const id = (payload as { id: string })?.id

        const bookings = await bookingModel.find({ user: id }).populate("mentor")

        res.send({
            success: true,
            message: "fetched bookings",
            bookings: bookings || []
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getAllBooking = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string)
        const bookings = await bookingModel.find({ user: (payload as { id: string })?.id }).populate("mentor")
        res.send({
            success: true,
            message: "fetched bookings successfully",
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