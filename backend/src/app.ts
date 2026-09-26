import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/apiError.middleware.js";

dotenv.config();

const app = express();

app.use(express.json())



app.use(errorHandler)

export default app