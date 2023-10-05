import { Request, Response } from "express"
import { Mentor } from "../../models/userModel"

export const mentorGet = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id
        if (!_id) {
            return res.send({
                success: false,
                message: "mentor id not provided"
            })
        }

        const searchUser = await Mentor.findOne({ _id })
        if (!searchUser) {
            return res.send({
                success: false,
                messaeg: "mentor doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "mentor data fetched",
            mentor: searchUser
        })


    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}


export const mentorGetAll = async (req: Request, res: Response) => {
    try {
        const mentors = await Mentor.find()
        res.send({
            success: true,
            message: "all users fetched",
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

export const mentorNew = async (req: Request, res: Response) => {
    try {
        const { name, email, image, password } = req.body
        if (!name || !email || !image) {
            return res.send({
                success: false,
                message: "fill all fields"
            })
    }

        const newMentor = new Mentor({
            name,
            email,
            image,
            password
        })

        await newMentor.save()
        res.send({
            success: false,
            message: "new mentor created",
            mentor: newMentor
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const mentorEdit = async (req: Request, res: Response) => {
    try {
        const { _id, firstName, lastName, email, image, status, bookings, description } = req.body
        if (!_id || !firstName || !lastName || !email) {
            return res.send({
                success: false,
                message: "please fill all fields"
            })
        }

        const searchMentor = await Mentor.findOne({ _id: _id })
        if (!searchMentor)
            return res.send({
                success: false,
                message: "mentor doesn't exist"
            })


        const newMentor = await Mentor.updateOne({ _id: _id }, { firstName, lastName, email, image, status, description, bookings })
        res.send({
            success: true,
            message: "mentor edited successfully",
            mentor: newMentor
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const mentorDelete = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id
        const searchMentor = await Mentor.findOne({ _id })
        if (!searchMentor) {
            return res.send({
                success: false,
                message: "mentor doesn't exist"
            })
        }

        await Mentor.deleteOne({ _id })
        res.send({
            success: true,
            message: "mentor deleted success fully"
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}