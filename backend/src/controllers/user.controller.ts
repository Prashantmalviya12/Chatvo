import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";

export const userController = {
  getUsers: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const userList = await User.find({ _id: { $ne: userId } })
        .select("name email avatar")
        .limit(50);

      return res
        .status(200)
        .json(
          ApiResponse({
            statusCode: 200,
            message: "User List Found Successfully.",
            data: userList,
          }),
        );
    } catch (error) {
      console.log("Userlist error:", error);
      throw ApiError({ statusCode: 500, message: "Internal server error." });
    }
  },
};
