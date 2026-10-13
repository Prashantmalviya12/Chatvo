import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/apiError.middleware.js";
import authRouter from "./routes/auth.route.js"
import chatRoutes from "./routes/chat.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"



dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8080",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as some server-to-server calls
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json())
app.use(clerkMiddleware())

app.use("/api",authRouter)
app.use("/api",chatRoutes)
app.use("/api",messageRoutes)
app.use("/api",userRoutes)





app.use(errorHandler)

export default app