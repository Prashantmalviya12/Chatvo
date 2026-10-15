import React from "react";
import type { userModel } from "../lib/types/auth.types";
import { useSocketStore } from "../lib/socket.io";
import {  EllipsisVertical } from "lucide-react";

type ChatHeaderType = {
  participant: userModel;
  chatId: string;
};
export default function ChatHeader({ participant, chatId }: ChatHeaderType) {
  const { onlineUsers, typingUsers } = useSocketStore();
  const isOnline = onlineUsers.has(participant?._id);
  // const isTyping = !!typingUsers.get(chatId);
  const typingUserId = typingUsers.get(chatId);
  const isTyping = typingUserId && typingUserId === participant?._id;

  return (
    <div className="h-16 rounded-tl-md bg-surface-light !px-6 border-b border-base-300  flex items-center  justify-center">
      <div className=" flex w-full justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={participant?.avatar}
              className="w-10 h-10 rounded-full "
              alt=""
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-base-200" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-700">{participant?.name}</h2>
            <p className="text-xs text-gray-400">
              {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <EllipsisVertical className="text-gray-800"/>
      </div>
    </div>
  );
}
