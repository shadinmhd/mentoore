import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    mentor: {
        type: String,
        required: true
    },
    user: {
        type: String
    },
    status: {
        type: String,
        default: "open",
        enum: ["open", "pending", "booked", "complete", "cancelled"]
    },
    data: {
        type: Date,
        required: true
    }
})


export default mongoose.model("booking", bookingSchema)