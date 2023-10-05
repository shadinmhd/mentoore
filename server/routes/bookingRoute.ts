import express from "express"
const router = express.Router()
import { book, cancel } from "../controllers/bookingController"

router.post("/book", book)
router.post("/cancel/user", cancel)

export default router