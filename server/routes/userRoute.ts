import express from "express"
const router = express.Router()
import {getUser} from "../controllers/userController"

router.route("/:id")
    .get(getUser)

export default router