import express from "express";
const router = express.Router()
import { upload } from "../../middlewares/uploadMiddleware";

import {
    studentDelete, studentEdit, studentGet, studentGetAll, studentNew,
} from "../../controllers/admin/studentController"

router.get("/GetAll", studentGetAll)
router.route("/")
    .put(upload, studentEdit)
    .post(studentNew)

router.route("/:id")
    .get(studentGet)
    .delete(studentDelete)
// user routes


export default router