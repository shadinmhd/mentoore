import { Request, Response } from "express";
import userModel from "../models/userModel";
import mentorModel from "../models/mentorModel";
import adminModel from "../models/adminModel"
import jwt from "jsonwebtoken"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.send({
                success: false,
                message: "please enter all fields"
            })
        }
        let type
        let userSearch = (type = "user", await userModel.findOne({ email }, { _id: 1 })) ||
            (type = "mentor", await mentorModel.findOne({ email: email }, { _id: 1 })) ||
            (type = "admin", await adminModel.findOne({ email: email }, { _id: 1 }))

        if (!userSearch) {
            return res.send({
                success: false,
                message: "user doesn't exist",
            })
        }

        const payload = {
            type,
            id: userSearch._id.toString()
        }
        const token = jwt.sign(payload, process.env.jwt as string)

        res.send({
            success: true,
            message: "otp has been send",
            type,
            token
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "somethign went wrong"
        })
    }
}   
