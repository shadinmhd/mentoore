import { Request, Response } from "express";
import userModel from "../models/userModel"
import jwt from "jsonwebtoken"
import getOtp from "../utils/getOtp";
import otpModel from "../models/otpModel";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, name, password, } = req.body

        const searchUser = await userModel.findOne({ email })
        if (searchUser) {
            res.send({
                success: false,
                message: "email all ready in use"
            })
            return
        }

        // const otp = getOtp(email)
        // new otpModel({
        //     otp,
        //     email
        // }).save()


        const newUser = new userModel({
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


export const userGet = async (req: Request, res: Response) => {
    try {

        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await userModel.findOne({ _id: payload.id }, { password: 0 })
        res.send({
            success: true,
            message: "user fetched",
            user,
            type: "user"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const userUpdate = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const oldUser = await userModel.findById(payload.id)
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

        const updatededUser = await userModel.findOneAndUpdate({ _id: payload.id }, { name, email, image })
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

export const userDelete = async (req: Request, res: Response) => {
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
