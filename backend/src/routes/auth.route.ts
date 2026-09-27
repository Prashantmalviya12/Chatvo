import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/auth/me", verifyToken, authController.me);
router.get("/auth/callback", authController.callBack);

export default router
