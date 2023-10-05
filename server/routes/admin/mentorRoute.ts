import express from "express"
const router = express.Router()
import {
    mentorGet, mentorDelete, mentorEdit, mentorNew, mentorGetAll
} from "../../controllers/admin/mentorController"
import { upload } from "../../middlewares/uploadMiddleware"

router.get("/getAll", mentorGetAll)

router.route("/")
    .put(upload, mentorEdit)
    .post(mentorNew)

router.route("/:id")
    .get(mentorGet)
    .delete(mentorDelete)

export default router