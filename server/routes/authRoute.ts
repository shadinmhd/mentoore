import express from "express"
const router = express.Router()
import { login, resetPassword } from "../controllers/authController"

router.post("/login", login)
router.put("/reset", resetPassword)
router.post("/register")

export default router