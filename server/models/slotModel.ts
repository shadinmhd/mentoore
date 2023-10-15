import mongoose from "mongoose"

export const slotSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Types.ObjectId,
        ref : "User"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref : "User"
    },
    status: {
        type: String,
        default: "open",
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    }
},{timestamps: true})

export default mongoose.model("slots", slotSchema)