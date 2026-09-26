import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
// import { ApiResponse } from "../utils/apiResponse.js";/

export const authController = {
  me: asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user;

    const userDetail = await User.findById(userId);
    if (!userDetail) {
      throw ApiError({ statusCode: 404, message: "User not found" });
    }

    return res
      .status(200)
      .json(
        ApiResponse({
          message: "User Detail Successfully",
          data: userDetail,
          statusCode: 200,
        }),
      );
  }),
};
