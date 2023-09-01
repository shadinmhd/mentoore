import express from "express"
const router = express.Router()
import { adminGet , adminEdit} from "../controllers/adminController"

router.route("/")
    .get(adminGet)
    .put(adminEdit)
    .delete()

export default router
