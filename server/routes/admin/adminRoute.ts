import express from "express"
const router = express.Router()
import { adminGet, adminEdit } from "../../controllers/admin/adminController"
import studentRoute from "./studentRoute"
import mentorRoute from "./mentorRoute"

router.route("/")
    .get(adminGet)
    .put(adminEdit)
    .delete()
    .post()

router.use("/student", studentRoute)
router.use("/mentor", mentorRoute)

export default router
