import express from "express"
import cookieParser from "cookie-parser"
import colors from "colors"
import sessoin from "express-session"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import adminAuthorizatoinMiddleware from "./middlewares/adminAuthorizationMiddleware"
import connectDb from "./configs/connectDb"

dotenv.config()
const app = express()
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

import indexRoute from "./routes/indexRoute"
import mentorRoute from "./routes/mentorRoute"
import userRoute from "./routes/userRoute"
import adminRoute from "./routes/adminRoute"
import categoryRoute from "./routes/categoryRoute"
import paymentRoute from "./routes/paymentRoute"
import bookingRoute from "./routes/bookingRoute"

app.use("/", indexRoute)
app.use("/admin", adminAuthorizatoinMiddleware, adminRoute)
app.use("/mentor", mentorRoute)
app.use("/user", userRoute)
app.use("/category", categoryRoute)
app.use("/payment", paymentRoute)
app.use("/bookings", bookingRoute)

const PORT = process.env.PORT as string || 8000
app.listen(PORT, () => {
    console.log(colors.cyan.bold(`server started http://localhost:${PORT}`))
}
)
