import { Request, Response } from "express"
import categoryModel from "../models/categoryModel"

export const getCategories = async (req: Request, res: Response) => {
    try {
        const { name } = req.query

        let query = {}
        if (name) {
            query = { name: { $regex: name, $options: 'i' } }
        }

        console.log(name)


        const categories = await categoryModel.find(query).sort({ name: 1 })
        res.send({
            success: true,
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


export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.send({
                success: false,
                message: "name not provided"
            })
        }

        const searchCategory = await categoryModel.findOne({ name })
        if (searchCategory) {
            return res.send({
                success: false,
                message: "category allready exists"
            })
        }

        await new categoryModel({
            name
        }).save()

        res.send({
            success: true,
            message: "category created success fully"
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const deletCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const searchCategory = await categoryModel.findOne({ _id: id })
        if (!searchCategory) {
            return res.send({
                success: false,
                message: "category doesn't exist"
            })
        }

        await categoryModel.deleteOne({ _id: id })
        res.status(200).send({
            success: true,
            message: "deleted category successfully"
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}

export const editCategory = async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body

        if (!name || !id) {
            return res.send({
                success: false,
                message: "id or name not provided"
            })
        }

        const searchCategory = await categoryModel.findOne({ _id: id })
        if (!searchCategory) {
            return res.send({
                success: false,
                message: "category not found"
            })
        }

        await categoryModel.updateOne({ _id: id }, { name })

        res.send({
            success: true,
            message: "category editor successfully"
        })

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
}