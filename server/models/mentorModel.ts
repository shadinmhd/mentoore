import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    status: {
        type: String,
        default: "pending",
        enum: ["approved", "pending"]
    },
    category: {
        type: String,
    },
    description: {
        type: String,
        required: false
    },
    bookings: {
        type: Array<String>,
        default: []
    },
    wallet: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }

})

export default mongoose.model("mentor", mentorSchema)