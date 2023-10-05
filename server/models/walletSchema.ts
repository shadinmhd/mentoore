import mongoose from "mongoose"

const walletSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default : 0
    },
})


export default walletSchema