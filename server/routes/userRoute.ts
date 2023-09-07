import express from "express"
import { register, userGet, userDelete, userUpdate } from "../controllers/userController"
import { upload } from "../middlewares/uploadMiddleware"
import userAuthorizationMiddleware from "../middlewares/userAuthorizationMiddleware"
const router = express.Router()

router.route("/")
    .get(userAuthorizationMiddleware, userGet)
    .delete(userAuthorizationMiddleware, userDelete)
    .put(userAuthorizationMiddleware, upload, userUpdate)

router.route("/booking")
    .get(userAuthorizationMiddleware)

router.post("/register", register)

export default router