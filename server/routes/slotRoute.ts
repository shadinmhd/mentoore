import express from "express"
const router = express.Router()
import { getAllSlots, createSlot, deleteSlot, getSlot } from "../controllers/slotController"

router.route("/")
    .post(createSlot)

router.route("/all")
    .get(getAllSlots)
        
router.route("/:id")
    .get(getSlot)
    .delete(deleteSlot)


export default router