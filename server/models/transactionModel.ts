import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        ref : "User"
    },
    to: {
        type : String,
        required : true,
        ref : "User"
    },
    time: {
        type : String,
        required : true
    },
    amount: {
        type : Number,
        required : true
    },
    type : {
        type : String,
        required : true
    }
})

export default mongoose.model("transactions", transactionSchema)