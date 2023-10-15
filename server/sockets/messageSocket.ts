import { Server } from "socket.io"
import colors from "colors"
import messageModel from "../models/messageModel"
import moment from "moment"
import { User } from "../models/userModel"

interface IUser {
    userId: string,
    socketId: string
}

const createServer = (server: any) => {
    let users: Set<IUser> = new Set()

    const io = new Server(server, {
        cors: {
            origin: "*"
        },
        transports: ["websocket", "polling"]
    })

    const addUser = (socketId: string, userId: string) => {
        !users.has({ socketId, userId }) &&
            users.add({ socketId, userId })
        console.log(users)
    }

    const removeUser = (socketId: string) => {
        let user: IUser
        users.forEach((e) => {
            if (e.socketId == socketId)
                user = e
        })
        if (user!) {
            console.log("deleted: ", user)
            users.delete(user)
        }
    }

    const getUser = (userId: string) => {
        let user: IUser
        users.forEach((e) => {
            if (e.userId == userId)
                user = e
        })
        if (user!) {
            return user
        }
    }

    io.on("connection", (socket) => {
        console.log(colors.green.bold(`user connected: ${socket.id}`))

        socket.on("user:add", (userId) => {
            console.log("add user:", userId)
            addUser(socket.id, userId)
        })

        socket.on("msg:send", async ({ sender, reciever, content, time }) => {
            try {

                const user = getUser(reciever)
                if (!time) {
                    time = moment().toString()
                }
                const message = new messageModel({
                    content,
                    reciever,
                    sender,
                    time
                })
                await message.save()
                const senderUser = await User.findOne({ _id: sender })
                if (user) {
                    io.to(user.socketId).emit("msg:get", message)
                    io.to(user.socketId).emit("msg:nt",senderUser?.name,content)
                }
                console.log(user)
            } catch (error) {
                console.error(error)
            }
        })

        //web RTC

        socket.on("offer", (userId, offer) => {
            const user = getUser(userId)
            if (user) {
                io.to(socket.id).emit(offer)
            }
        })

        socket.on("answer", (callerId, answer) => {
            const user = getUser(callerId)
            if (user) {
                io.to(user.socketId).emit("answer", callerId, answer)
            }
        })

        socket.on("ice-candidate", (calledId, candidate) => {
            const user = getUser(calledId)
            if (user) {
                io.to(user.socketId).emit("ice-candidate", candidate)
            }
        })

        socket.on("call:start", (id, callerId) => {
            const user = getUser(id)
            if (user) {
                io.to(user.socketId).emit("call:start", callerId)
            }
        })

        socket.on("call:rejected", (id) => {
            const user = getUser(id)
            if (user) {
                io.to(user.socketId).emit("call:rejected")
            }
        })

        socket.on("call:accepted", (id) => {
            console.log("call accpeted: ", id)
            const user = getUser(id)
            if (user) {
                io.to(user.socketId).emit("call:accepted")
            }
        })

        //web RTC

        socket.on("disconnect", () => {
            console.log(colors.red.bold(`user disconnected: ${socket.id}`))
            removeUser(socket.id)
        })
    })


}

export default createServer