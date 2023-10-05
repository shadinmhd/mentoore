import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    balance: {
        type: Number,
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
    }
})

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
    wallet: {
        type: walletSchema,
        default: {
            balance: 0,
            transactions: []
        }

    },
    verified: {
        type: Boolean,
        default: false
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking"
    }]
})


export default mongoose.model("mentor", mentorSchema)