import { Request, Response } from "express"
import { instance } from "../configs/razorconfig"
import jwt from "jsonwebtoken"
import transactionModel from "../models/transactionModel"
import moment from "moment"
import { User } from "../models/userModel"

export const checkout = async (req: Request, res: Response) => {
    try {
        const options = {
            amount: (req.body.amount * 100),
            currency: "INR",
        }
        const order = await instance.orders.create(options)

        res.send({
            success: true,
            order
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            messag: "server issue"
        })
    }
}

export const paymentVerfication = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string, type: string }
        console.log("from verification")
        console.log(req.body)

        const searchUser = await User.findOne({ _id: payload.id })

        if (!searchUser) {
            return res.send({
                success: false,
                message: "user not found"
            })
        }

        const deposited = await User.updateOne({ _id: payload.id }, { $inc: { "wallet.balance": amount } })

        if (!deposited) {
            return res.send({
                success: false,
                message: "deposit failed"
            })
        }

        await new transactionModel({
            from: payload.id,
            to: payload.id,
            time: moment(),
            amount: Number(amount),
            type: "deposit"
        }).save()

        res.send({
            success: true,
            message: "deposit successfully"
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getKey = (req: Request, res: Response) => {
    try {
        const key = process.env.razor_key_id as string

        if (!key) {
            return res.send({
                success: false,
                messaeg: "couldn't find key"
            })
        }

        res.send({
            success: true,
            message: "fetched key successfully",
            key
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const getTransactions = async (req: Request, res: Response) => {
    try {
        const payload = jwt.verify(req.headers.authorization!, process.env.jwt as string) as { id: string }

        const transactions = await transactionModel.find({ $or: [{ from: payload.id }, { to: payload.id }] }).populate("from").populate("to")
            
        res.send({
            success: true,
            message: "fetched transactions",
            transactions
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}