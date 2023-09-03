import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import adminModel from "../models/adminModel"
import userModel from "../models/userModel"
import mentorModel from "../models/mentorModel"

export const adminGet = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const admin = await adminModel.findOne({ _id: payload.id }, { password: 0 })
        if (!admin) {
            return res.send({
                success: false,
                message: "admin doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "fetched admin data",
            admin
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const adminEdit = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body
        const oldAdmin = await adminModel.findOne({ email })
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        if (!oldAdmin) {
            return res.send({
                success: false,
                message: "admin doesn't exist"
            })
        }
        let image = oldAdmin.image
        if (req.file) {
            image = `http://localhost:8000/public/user/${name}.${req.file.filename.split(".")[1]}`
        }

        const updatededUser = await adminModel.findOneAndUpdate({ _id: payload.id }, { name, email, image })
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

export const adminDelete = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        await adminModel.deleteOne({ _id: payload.id })
        res.send({
            success: true,
            message: "user deleted"
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const userGet = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id
        const searchUser = await userModel.findOne({ _id })
        if (!searchUser) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "user fetched successfully",
            user: searchUser
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const userGetAll = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find({}, { password: 0 })
        res.send({
            success: true,
            message: "users fetched",
            users
        })
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const userNew = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.send({
                success: false,
                message: "please fill all fields"
            })
        }

        const user = new userModel({
            name,
            email,
            password
        })

        await user.save()

        res.send({
            success: true,
            message: "user created success fully",
            user
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const userEdit = async (req: Request, res: Response) => {
    try {
        const { id, name, email, image, status } = req.body
        console.log(req.body)
        const userSearch = await userModel.findOne({ _id: id })
        if (!userSearch) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        const newUser = await userModel.updateOne({ _id: id }, { name, email, image, status })
        console.log(newUser)
        res.send({
            success: true,
            message: "user edited successfully",
            user: newUser
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const userDelete = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id
        const searchUser = await userModel.findOne({ _id })
        if (!searchUser) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        await userModel.deleteOne({ _id })
        res.send({
            success: true,
            message: "user deleted successfully"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const mentorGet = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id
        if (!_id) {
            return res.send({
                success: false,
                message: "mentor id not provided"
            })
        }

        const searchUser = await mentorModel.findOne({ _id })
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
        const mentors = await mentorModel.find()
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
        const { firstName, lastName, email, image, password } = req.body
        if (!firstName || !lastName || !email || !image) {
            return res.send({
                success: false,
                message: "fill all fields"
            })
        }

        const newMentor = new mentorModel({
            firstName,
            lastName,
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
        const { _id, firstName, lastName, email, image } = req.body
        if (!_id || !firstName || !lastName || !email || !image) {
            return res.send({
                success: false,
                message: "please fill all fields"
            })
        }

        const searchMentor = await mentorModel.findOne({ _id })
        if (!searchMentor)
            return res.send({
                success: false,
                message: "mentor doesn't exist"
            })


        const newMentor = await mentorModel.updateOne({ _id }, { firstName, lastName, email, image })
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
        const searchMentor = await mentorModel.findOne({ _id })
        if (!searchMentor) {
            return res.send({
                success: false,
                message: "mentor doesn't exist"
            })
        }

        await mentorModel.deleteOne({ _id })
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
