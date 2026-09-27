import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { chatController } from "../controllers/chat.controller.js";

const router = Router();

router.use(verifyToken)

router.get("/getChats",chatController.getAllChats)
router.get("/getChat/:participantId",chatController.getAllChats)

export default router
