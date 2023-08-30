import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

export default mongoose.model("admin", adminSchema)