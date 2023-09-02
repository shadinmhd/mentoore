import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },
    user : {
        type : String,
        required : true
    }
}, { timestamps: true })

export default mongoose.model("otp", otpSchema)
