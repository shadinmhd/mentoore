import express from "express"
import { getWallet } from "../controllers/walletController"
const router = express.Router()

router.route("/")
    .get(getWallet)

export default router