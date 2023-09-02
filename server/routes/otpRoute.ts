import express from "express"
import { verifyOtp } from "../controllers/otpController"
const router = express.Router()

router.route("/")
    .post(verifyOtp)

export default router
