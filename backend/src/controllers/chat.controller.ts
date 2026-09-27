import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiErrors.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Chat } from "../models/chat.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Types } from "mongoose";

export const chatController = {
  getAllChats: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;

      const chats = await Chat.find({ participants: userId })
        .populate("participants", "name email avatar")
        .populate("lastMessage")
        .sort({ lastMessageTime: -1 });

      const otherChats = chats.map((chat) => {
        const otherFormatedChat = chat.participants.find(
          (p) => p._id.toString() !== userId,
        );

        return {
          id: chat._id,
          participant: otherFormatedChat ?? null,
          lastMessage: chat.lastMessage,
          lastMessageTime: chat.lastMessageTime,
          createAt: chat.createdAt,
        };
      });

      return res.status(200).json(
        ApiResponse({
          statusCode: 200,
          message: "Get Chats Successfully",
          data: otherChats,
        }),
      );
    } catch (error) {
      console.log("chats Error:", error);
      throw ApiError({ statusCode: 500, message: "Internal Server Error" });
    }
  },
  getOrCreateChats: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId;
      const { participantId } = req.params;

      if (!participantId) {
        throw ApiError({
          statusCode: 400,
          message: "Participant ID is required!",
        });
      }
      if (!Types.ObjectId.isValid(participantId.toString())) {
        throw ApiError({ statusCode: 400, message: "Invalid participant ID" });
      }

      if (userId === participantId) {
        throw ApiError({
          statusCode: 400,
          message: "Cannot create chat with yourself",
        });
      }

      let chat = await Chat.findOne({
        participants: { $all: [userId, participantId] },
      })
        .populate("participants", "name email avatar")
        .populate("lastMessage");

      if (!chat) {
        const newChat = new Chat({ participantId: [userId, participantId] });
        await newChat.save();
        chat = await newChat.populate("participants", "name email avatar");
      }

      const otherParticipants = chat.participants.find((p: any) => p._id.toString() !== userId);
      const result = {
      _id: chat._id,
      participant: otherParticipants ?? null,
      lastMessage: chat.lastMessage,
      lastMessageAt: chat.lastMessageTime,
      createdAt: chat.createdAt,
    }

    return res.status(200).json(ApiResponse({statusCode:200,message:"Chats Successfully",data:result}))
    } catch (error) {
      console.log("get or create chat error:", error);
      throw ApiError({ statusCode: 500, message: "Internal Server Error" });
    }
  },
};
