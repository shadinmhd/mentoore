import express from "express"
const router = express.Router()
import { checkout } from "../controllers/paymentController"

router.route("/checkout")
    .post(checkout)

export default router