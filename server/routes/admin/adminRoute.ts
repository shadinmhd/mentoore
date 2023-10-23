import express from "express"
const router = express.Router()
import { adminGet, adminEdit, getReport } from "../../controllers/admin/adminController"
import studentRoute from "./studentRoute"
import mentorRoute from "./mentorRoute"
import adminAuthorizationMiddleware from "../../middlewares/adminAuthorizationMiddleware"

router.route("/")
    .get(adminAuthorizationMiddleware, adminGet)
    .put(adminAuthorizationMiddleware, adminEdit)
    .delete()
    .post()

router.route("/report")
    .get(getReport)

router.use("/student", adminAuthorizationMiddleware, studentRoute)
router.use("/mentor", adminAuthorizationMiddleware, mentorRoute)

export default router
