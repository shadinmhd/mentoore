import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/userModel"
import sendOtp from "../utils/getOtp"
import otpModel from "../models/otpModel"
import moment from "moment";

export const getOtp = async (req: Request, res: Response) => {
    try {
        const { id } = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await User.findOne({ _id: id })
        const searchOtp = await otpModel.updateMany({ user: id, used: false }, { $set: { used: true } })

        if (!user) {
            return res.send({
                success: false,
                message: "cannot find user"
            })
        }

        const otp = await sendOtp(user.email)
        console.log(otp)

        if (!otp?.success) {
            return res.send({
                success: false,
                message: "failed to send otp"
            })
        }

        await new otpModel({
            otp: otp?.otp,
            time: moment().toString(),
            user: user._id
        }).save()

        res.send({
            success: true,
            message: "otp send success fully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const verify = async (req: Request, res: Response) => {
    try {
        const { otp } = req.body
        const { id } = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await User.findOne({ _id: id })
        const searchOtp = await otpModel.find({ user: user?._id, used: false })

        if (!user) {
            return res.send({
                success: false,
                message: "userd doesn't exist"
            })
        }

        if (user.verified) {
            return res.send({
                success: true,
                message: "user verified"
            })
        }

        let verified = false

        searchOtp.map((e) => {
            if (e.otp == otp) {
                console.log(moment().diff(moment(e.time), "minutes"))
                if (moment().diff(moment(e.time), "minutes") < 5)
                    verified = true
            }
        })

        if (!verified) {
            return res.send({
                success: false,
                message: "invalid otp"
            })
        }

        await User.updateOne({ _id: id }, { $set: { verified: true } })
        await otpModel.updateOne({ otp }, { $set: { used: true } })

        res.send({
            success: true,
            message: "user verified"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const status = async (req: Request, res: Response) => {
    try {
        const { id } = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }
        const user = await User.findOne({ _id: id })

        if (!user) {
            return res.send({
                success: false,
                message: "user doesn't exist"
            })
        }

        res.send({
            success: true,
            message: "fetched status",
            verified: user.verified
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
    }
}