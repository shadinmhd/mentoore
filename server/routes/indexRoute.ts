import express from "express"
import { getAll, login } from "../controllers/indexController"
const router = express.Router()

router.post("/login", login)
router.get("/", getAll)

export default router
