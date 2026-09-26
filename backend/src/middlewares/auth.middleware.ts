import { Request } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export type AuthRequest = Request & { user?: string };

export const verifyToken = asyncHandler(async (req: AuthRequest, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.split(" ")[1] ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw ApiError({ statusCode: 401, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const userDetail = (await User.findById(decoded.id)) as { _id: string };

    if (!userDetail) {
      throw ApiError({ statusCode: 401, message: "Unauthorized" });
    }

    req.user = userDetail._id.toString();
    next();
  } catch (err) {
    ApiError({ statusCode: 500, message: "Internal Server Error" });
    next(err);
  }
});
