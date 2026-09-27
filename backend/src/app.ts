import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/apiError.middleware.js";
import authRouter from "./routes/auth.route.js"
import { clerkMiddleware } from '@clerk/express'



dotenv.config();

const app = express();

app.use(express.json())
app.use(clerkMiddleware())

app.use("/api",authRouter)





app.use(errorHandler)

export default app