import express from "express"
import { getCategories, createCategory, deletCategory, editCategory } from "../controllers/categoryController"

const router = express.Router()

router.get("/", getCategories)
router.post("/", createCategory)
router.put("/", editCategory)
router.delete("/:id", deletCategory)

export default router