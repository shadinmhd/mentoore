import express from "express"
import { getOtp, verifyOtp } from "../controllers/otpController"
const router = express.Router()

router.route("/")
    .get(getOtp)
    .post(verifyOtp)

export default router