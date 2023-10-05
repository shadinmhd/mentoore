import express from "express"
const router = express.Router()
import { checkout, paymentVerfication, getKey,getTransactions } from "../controllers/paymentController"

router.route("/checkout")
    .post(checkout)

router.route("/verify")
    .post(paymentVerfication)

router.get("/key", getKey)
router.get("/transactions", getTransactions)

export default router