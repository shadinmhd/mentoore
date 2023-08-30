import express from "express"
import { getCategories } from "../controllers/categoryController"

const router = express.Router()

router.get("/get", getCategories)

export default router