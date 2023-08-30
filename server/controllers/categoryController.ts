import { Request, Response } from "express"
import categoryModel from "../models/categoryModel"

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryModel.find({}, { _id: 0 }).sort({name : 1})
        res.send({
            success : true,
            categories
        })
    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

