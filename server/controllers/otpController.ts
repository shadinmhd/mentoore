import { Request, Response } from "express"
import otpModel from "../models/otpModel"

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { otp } = req.body

        if (!otp) {
            return res.send({
                success: false,
                message: "please enter an otp"
            })
        }

        const otpSearch = await otpModel.findOne({ otp })
        if (!otpSearch) {
            return res.send({
                success: false,
                message: "invalid otp"
            })
        }

        console.log(otp)
        res.send({
            success: true,
            message: "otp recieved"
        })


    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "couldn't verify otp"
        })
    }
}
