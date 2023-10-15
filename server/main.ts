import express from "express"
import cookieParser from "cookie-parser"
import colors from "colors"
import sessoin from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import adminAuthorizatoinMiddleware from "./middlewares/adminAuthorizationMiddleware"
import connectDb from "./configs/connectDb"
import messageSocket from "./sockets/messageSocket"
import https from "https"
import fs from "fs"
dotenv.config()

const app = express()
const server = https.createServer({
    key: fs.readFileSync("./localhost+2-key.pem"),
    cert: fs.readFileSync("./localhost+2.pem")
}, app)
messageSocket(server)


connectDb()
app.use("/public/user", express.static("./public/user"))
app.use("/public/mentor", express.static("./public/mentor"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: "*"
}))
app.use(sessoin({
    secret: process.env.session as string,
    resave: false,
    saveUninitialized: true
}))

import mentorRoute from "./routes/mentorRoute"
import studentRoute from "./routes/studentRoute"
import adminRoute from "./routes/admin/adminRoute"
import categoryRoute from "./routes/categoryRoute"
import paymentRoute from "./routes/paymentRoute"
import bookingRoute from "./routes/bookingRoute"
import authRoute from "./routes/authRoute"
import slotRoute from "./routes/slotRoute"
import walletRoute from "./routes/walletRoute"
import messageRoute from "./routes/messageRoute"
import otpRoute from "./routes/OtpRoute"
import dashRoute from "./routes/dashRoute"
import userRoute from "./routes/userRoute"

app.use("/auth", authRoute)
app.use("/admin", adminAuthorizatoinMiddleware, adminRoute)
app.use("/mentor", mentorRoute)
app.use("/student", studentRoute)
app.use("/category", categoryRoute)
app.use("/payment", paymentRoute)
app.use("/booking", bookingRoute)
app.use("/slot", slotRoute)
app.use("/wallet", walletRoute)
app.use("/message", messageRoute)
app.use("/otp", otpRoute)
app.use("/dash", dashRoute)
app.use("/user", userRoute)

app.get("/", (req: any, res: any) => {
    res.send({
        url: "https://localhost:5173"
    })
})

const PORT = process.env.PORT as string || 8000
const localIp = "0.0.0.0"
server.listen(Number(PORT), localIp, () => {
    console.log(colors.cyan.bold(`server started https://${localIp}:${PORT}`))
})