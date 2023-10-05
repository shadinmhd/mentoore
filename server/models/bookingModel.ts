import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: String
    },
    status: {
        type: String,
        default: "open",
        enum: ["open", "pending", "booked", "complete", "cancelled"]
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    }
})


export default mongoose.model("booking", bookingSchema)