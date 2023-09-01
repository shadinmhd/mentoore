import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import adminModel from "../models/adminModel"
import userModel from "../models/userModel"

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
        const { id } = req.body
        const searchUser = await userModel.findOne({ _id: id })
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
        const users = await userModel.find()
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
            success : true,
            message : "user created success fully",
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
        const { _id, name, email, image } = req.body
        const userSearch = await userModel.findOne({ _id })
        if (!userSearch) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        const newUser = await userModel.updateOne({ _id }, { name, email, image })
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
        const { _id } = req.body
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