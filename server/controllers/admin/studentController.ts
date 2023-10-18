import { Request, Response } from "express"
import { Student, Mentor } from "../../models/userModel"

export const studentGet = async (req: Request, res: Response) => {
    try {
        const _id = req.params.id
        const searchUser = await Student.findOne({ _id })
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

export const studentGetAll = async (req: Request, res: Response) => {
    try {
        const { name, status } = req.query
        console.log(name, status)

        let query: any = {}

        if (status) {
            query.status = status
        }

        if (name) {
            query.name = { $regex: name, $options: "i" }
        }

        const users = await Student.find(query, { password: 0 })

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

export const studentNew = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.send({
                success: false,
                message: "please fill all fields"
            })
        }

        const user = new Student({
            name,
            email,
            password,
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

export const studentEdit = async (req: Request, res: Response) => {
    try {
        const { _id, name, email, image, status } = req.body
        console.log(req.body)
        const userSearch = await Student.findOne({ _id })
        if (!userSearch) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        await Student.updateOne({ _id }, { name, email, image, status })
        res.send({
            success: true,
            message: "user edited successfully",
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
        const _id = req.params.id
        const searchUser = await Student.findOne({ _id })
        if (!searchUser) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        await Student.deleteOne({ _id })
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