import { Request, Response } from "express"
import { instance } from "../configs/razorconfig"


export const checkout = async (req: Request, res: Response) => {
    try {
        const options = {
            amount: (req.body.amout * 100),
            currency: "INR",
        }
        const order = await instance.orders.create(options)
        console.log(order)
        res.send({
            success : true,
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

export const paymentVerfication = (req : Request, res : Response) => {
    try {
        
    } catch (err) {
        console.log(err)
        res.send({
            success : false,
            message : "something went wrong"
        })
    }
}