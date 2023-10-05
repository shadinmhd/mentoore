import express from "express"
import {
    register, studentGet, studentDelete, studentUpdate,
    getAllBooking, getBooking
} from "../controllers/studentController"
import { upload } from "../middlewares/uploadMiddleware"
import studentAuthorizationMiddleware from "../middlewares/studentAuthorizationMiddleware"
const router = express.Router()

router.route("/")
    .get(studentAuthorizationMiddleware, studentGet)
    .delete(studentAuthorizationMiddleware, studentDelete)
    .put(studentAuthorizationMiddleware, upload, studentUpdate)

router.route("/booking")
    .get(studentAuthorizationMiddleware, getBooking)

router.get("/getAllBookings", getAllBooking)
router.post("/register", register)


export default router