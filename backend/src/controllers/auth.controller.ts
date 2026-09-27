import { NextFunction, Response, Request } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { clerkClient, getAuth } from "@clerk/express";
// import { ApiResponse } from "../utils/apiResponse.js";/

export const authController = {
  me: asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;

    const userDetail = await User.findById(userId);
    if (!userDetail) {
      throw ApiError({ statusCode: 404, message: "User not found" });
    }

    return res.status(200).json(
      ApiResponse({
        message: "User Detail Successfully",
        data: userDetail,
        statusCode: 200,
      }),
    );
  }),

  callBack: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId) {
        throw ApiError({ statusCode: 404, message: "Unauthorized" });
        return;
      }

      let user = await User.findOne({ clerkId });
      if (!user) {
        const clerkUser = await clerkClient.users.getUser(clerkId);

        user = await User.create({
          clerkId,
          name: clerkUser.firstName
            ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
            : clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0],
          email: clerkUser.emailAddresses[0]?.emailAddress,
          avatar: clerkUser.imageUrl,
        });
      }

      return res.status(200).json(
        ApiResponse({
          message: "User Login Successfully",
          data: user,
          statusCode: 200,
        }),
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  },
};
