import express from "express"
const router = express.Router()
import { getAdmin, getMentor } from "../controllers/dashController"
import mentorAuthorizationMiddleware from "../middlewares/mentorAuthorizationMiddleware"
import adminAuthorizationMiddleware from "../middlewares/adminAuthorizationMiddleware"

router.route("/mentor")
    .get(mentorAuthorizationMiddleware,getMentor)

router.route("/admin")
    .get(adminAuthorizationMiddleware,getAdmin)

export default router