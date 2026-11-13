import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router()

/**
 * @openapi
 * /users/userlist:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user list
 *     description: >
 *       Returns up to 50 users, excluding the currently authenticated user.
 *       Requires a valid bearer token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: User list retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User List Found Successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 671234567890abcdef123456
 *                       name:
 *                         type: string
 *                         example: Rahul Sharma
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: rahul@example.com
 *                       avatar:
 *                         type: string
 *                         nullable: true
 *                         example: https://example.com/avatar.png
 *       "401":
 *         description: Missing or invalid authentication token.
 *       "500":
 *         description: Internal server error.
 */

router.get("/userlist",verifyToken,userController.getUsers)

export default router