import mongoose from "mongoose"

const walletSchema = new mongoose.Schema({
    balance: {
        type: Number,
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
    }
})

const userSchema = new mongoose.Schema({

    name: {
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
        required: true
    },
    image: {
        type: String
    },
    status: {
        type: String,
        default: "active"
    },
    bookings: {
        type: Array<String>,
        default: []
    },
    wallet: {
        type: walletSchema,
        default : {
            balance : 0,
            transactions : []
        }
    },
    verified: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("user", userSchema)