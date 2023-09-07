import express, { Request, Response } from "express"
const router = express.Router()
import { getAllMentors, registerMentor, getMentor, deleteMentor, updateMentor, getAllBookings, createBooking } from "../controllers/mentorController"
import mentorAuthorizationMiddleware from "../middlewares/mentorAuthorizationMiddleware"
import { upload } from "../middlewares/uploadMiddleware"


router.route("/")
    .get(mentorAuthorizationMiddleware, getMentor)
    .put(mentorAuthorizationMiddleware, upload, updateMentor)
    .delete(mentorAuthorizationMiddleware, deleteMentor)

router.route("/bookings")
    .get(getAllBookings)
    .post(createBooking)

router.route("/booking/:id")
    .get()
    .put()

router.post("/register", registerMentor)
router.get("/getAll", getAllMentors)

export default router