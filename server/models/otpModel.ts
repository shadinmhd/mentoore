import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true,
        ref: "User"
    },
    time: {
        type: String,
        required: true
    },
    used : {
        type : Boolean,
        default : false
    }
}, { timestamps: true })

export default mongoose.model("otp", otpSchema)