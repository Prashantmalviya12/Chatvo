import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Chat } from "../models/chat.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const messageController = {
  getMessage: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { chatId } = req.params;
      // console.log("chat Id",chatId)

      const chat = await Chat.findOne({ _id: chatId, participants: userId });
      if (!chat) {
        throw ApiError({ statusCode: 400, message: "Chat not found." });
      }

      // console.log("chat", chat);

      const message = await Message.find({ chatId: chatId })
        .populate("senderId", "name email avatar")
        .sort({ createdAt: 1 });
      // console.log("message", message);

      return res.status(200).json(
        ApiResponse({
          statusCode: 200,
          message: "Get Message Successfully",
          data: message,
        }),
      );
    } catch (error) {
      console.log("chats Error:", error);
      throw ApiError({ statusCode: 500, message: "Internal Server Error" });
    }
  },
};
