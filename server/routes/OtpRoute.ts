import express from "express"
const router = express.Router()
import {getOtp,verify, status} from "../controllers/otpController"


router.route("/")
    .get(getOtp)
    .post(verify)

    router.route("/status")
    .get(status)

export default router