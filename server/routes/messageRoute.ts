import express from "express"
const router = express.Router()
import { getConversations, getMessages } from "../controllers/messageController"

router.route("/conversations")
    .get(getConversations)

router.route("/messages/:id")
    .get(getMessages)

export default router