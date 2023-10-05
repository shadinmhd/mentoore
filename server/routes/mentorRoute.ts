import express from "express"
const router = express.Router()
import {
    getAllMentors, registerMentor, getMentor, deleteMentor, updateMentor, getMentorDetails,
} from "../controllers/mentorController"
import mentorAuthorizationMiddleware from "../middlewares/mentorAuthorizationMiddleware"
import { upload } from "../middlewares/uploadMiddleware"


router.route("/")
    .get(mentorAuthorizationMiddleware, getMentor)
    .put(mentorAuthorizationMiddleware, upload, updateMentor)
    .delete(mentorAuthorizationMiddleware, deleteMentor)
    
router.get("/getDetails/:id", getMentorDetails)

router.post("/register", registerMentor)

router.get("/getAll", getAllMentors)

export default router