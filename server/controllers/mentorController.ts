import { Request, Response } from "express"
import { User, Mentor } from "../models/userModel"
import bookingModel from "../models/slotModel"
import jwt from "jsonwebtoken"

export const registerMentor = async (req: Request, res: Response) => {
    try {
        const { name, email, password, category } = req.body

        const searcMentor = await User.findOne({ email })
        if (searcMentor) {
            res.send({
                success: false,
                message: "email all ready in use"
            })
            return
        }

        await new Mentor({
            email,
            name,
            password,
            category,
            status : "new"
        }).save()

        res.send({
            success: true,
            message: "account created"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getAllMentors = async (req: Request, res: Response) => {
    try {
        const { page, category, name } = req.query

        let query: any = { type: "Mentor", status : "active" }
        if (category) {
            query.category = category
        }
        if (name) {
            query.name = { $regex: name, $options: 'i' }
        }
        
        const numbers = await User.countDocuments({status : "active"})
        const mentors = await User.find(query, { password: 0 })
            .skip((Number(page) - 1) * 15)
            .limit(15)

        console.log(req.query)
        res.send({
            success: true,
            message: "fetched all mentors",
            mentors,
            pages : Math.ceil(numbers / 15)
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getMentorDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id) {
            return res.send({
                success: false,
                message: "no id provided"
            })
        }

        const searchedMentor = await Mentor.findOne({ _id: id })
        const bookings = await bookingModel.find({ mentor: id })

        if (!searchedMentor) {
            return res.send({
                success: false,
                message: "no user found"
            })
        }

        res.send({
            success: true,
            message: "fetched user details",
            mentor: searchedMentor,
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

export const getMentor = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const mentor = await Mentor.findOne({ _id: payload.id }, { password: 0 })
        console.log(payload?.id)
        res.send({
            success: true,
            message: "user fetched",
            user : mentor
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }

}

export const updateMentor = async (req: Request, res: Response) => {
    try {
        const { _id, name, email, category, description } = req.body
        const oldUser = await Mentor.findById(_id)
        if (!oldUser) {
            return res.send({
                success: false,
                message: "no user exists"
            })
        }

        let image = oldUser.image
        if (req.file) {
            image = `http://localhost:8000/public/mentor/${name}.${req.file.filename.split(".")[1]}`
            console.log(name)
        }

        const updatededUser = await Mentor.updateOne({ _id }, { name, email, image, category, description })
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

export const deleteMentor = async (req: Request, res: Response) => {
    try {

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}
