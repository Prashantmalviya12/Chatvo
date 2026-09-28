import {Router} from "express"
import { verifyToken } from "../middlewares/auth.middleware.js"
import { messageController } from "../controllers/message.controller.js"

const router = Router()

router.use(verifyToken)

router.get("/message/:chatId",messageController.getMessage)

export default router