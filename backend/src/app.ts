import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/apiError.middleware.js";
import authRouter from "./routes/auth.route.js"



dotenv.config();

const app = express();

app.use(express.json())

app.use("/api",authRouter)



app.use(errorHandler)

export default app