import mongoose from "mongoose"

interface IMessage {
    sender: mongoose.Schema.Types.ObjectId,
    reciever: string,
    content: string,
    time : string
}

const messageSchema = new mongoose.Schema<IMessage>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    reciever: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time : {
        type : String,
        required : true
    }
},{timestamps: true})

export default mongoose.model("message", messageSchema)