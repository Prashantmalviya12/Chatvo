import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/apiError.middleware.js";
import authRouter from "./routes/auth.route.js"
import chatRoutes from "./routes/chat.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import { clerkMiddleware } from '@clerk/express'



dotenv.config();

const app = express();

app.use(express.json())
app.use(clerkMiddleware())

app.use("/api",authRouter)
app.use("/api",chatRoutes)
app.use("/api",messageRoutes)
app.use("/api",userRoutes)





app.use(errorHandler)

export default app