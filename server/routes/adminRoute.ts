import express from "express"
const router = express.Router()
import { adminGet , adminEdit} from "../controllers/adminController"

router.route("/")
    .get(adminGet)
    .put(adminEdit)
    .delete()

router.get("user/getAll")
router.route("/user")
    .get()
    .put()
    .delete()
    
router.get("mentor/getAll")
router.route("/mentor")
    .get()
    .put()
    .delete()
 

export default router
