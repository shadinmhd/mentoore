import { Request, Response } from "express"
import otpModel from "../models/otpModel"
import userModel from "../models/userModel"
import mentorModel from "../models/mentorModel"
import adminModel from "../models/adminModel"

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { otp, id } = req.body
        console.log(otp)
        console.log(id)
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

        let type
        let userSearch = (type = "user", await userModel.findOne({ id }, { _id: 1 })) ||
            (type = "mentor", await mentorModel.findOne({ id }, { _id: 1 })) ||
            (type = "admin", await adminModel.findOne({ id }, { _id: 1 }))

        if (!userSearch) {
            return res.send({
                success: false,
                message: "invalid otp"
            })
        }

        if (id !== userSearch._id) {
            return res.send({
                success: false,
                message: "invalid otp"
            })
        }

        const searchOtp = await otpModel.findOne({id : id})
        if(searchOtp != otp){
            return res.send({
                success : true,
                message : "invalid otp"
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
