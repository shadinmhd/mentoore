import express from "express"
const router = express.Router()
import { getSelf, getUser } from "../controllers/userController"


router.route("/")
    .get(getSelf)

router.route("/:id")
    .get(getUser)

export default router