import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage: mongoose.Types.ObjectId;
  lastMessageTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const chatSchema: Schema<IChat> = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: false,
    },
    lastMessageTime: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
