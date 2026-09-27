import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { getAuth, requireAuth } from "@clerk/express";


export type AuthRequest = Request & { userId?: string };

export const verifyToken = [requireAuth(), async (req:AuthRequest,res:Response,next:NextFunction) => {
  try {
    const {userId:clerkId} = getAuth(req)

    const userDetail = await User.findOne({clerkId})
    if(!userDetail) {
      throw ApiError({statusCode:400,message:"User not found"})
    }

    req.userId = userDetail._id.toString()
    next()
    
  } catch (error) {
    res.status(500)
    next(error)
    
  }

}]
