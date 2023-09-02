import express from "express"
const router = express.Router()
import {
    adminGet, adminEdit,
    userDelete, userEdit, userGet, userGetAll, userNew,
    mentorGet, mentorDelete, mentorEdit, mentorNew, mentorGetAll
} from "../controllers/adminController"

router.route("/")
    .get(adminGet)
    .put(adminEdit)
    .delete()
    .post()

// user routes
router.get("/userGetAll", userGetAll)
router.route("/user")
    .put(userEdit)
    .post(userNew)

router.route("/user/:id")
    .get(userGet)
    .delete(userDelete)
// user routes

// mentor routes
router.get("mentor/getAll", mentorGetAll)

router.route("/mentor")
    .put(mentorEdit)
    .post(mentorNew)

router.route("/mentor/:id")
    .get(mentorGet)
    .delete(mentorDelete)
// mentor routes


export default router
