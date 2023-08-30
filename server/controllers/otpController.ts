import { Request, Response } from "express"
import generateOtp from "../utils/generateOtp"
import otpModel from "../models/otpModel"
import nodemailer from "nodemailer"

export const getOtp = (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const otp = new otpModel({
            otp: generateOtp()
        })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "shadinmhd97@gmail.com",
                pass: "njjmojfmbbacjnay"
            }
        })

        const mail = {
            from: "shadin@gmail.com",
            to: email,
            subject: "otp for mentoore",
            text:
                `\n
                otp for registering to mentoore\n
                ${otp}
            `
        }

        transporter.sendMail(mail, (err, inf) => {
            if (err) {
                console.log(err)
            } else {
                console.log(inf)
            }
        })

        otp.save()
        res.send({
            success: true,
            message: "email sent"
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong couldnt generate otp"
        })
    }
}

export const verifyOtp = (req: Request, res: Response) => {
    try {

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "couldn't verify otp"
        })
    }
}