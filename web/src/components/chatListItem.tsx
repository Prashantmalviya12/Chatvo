import React from 'react'
import type { ChatlistModel } from '../lib/types/chat.types';
import { formatTime } from '../utils/datetime.util';
import { useSocketStore } from '../lib/socket.io';

type ChatListItemType = {
    chat:ChatlistModel
    isActive:boolean,
    onClick:() => void
}
export default function ChatListItem({ chat, isActive, onClick }:ChatListItemType) {
     const { onlineUsers, typingUsers } = useSocketStore();
  const isOnline = onlineUsers.has(chat.participant?._id);
  const isTyping = !!typingUsers.get(chat._id);

  return (
    <button
      onClick={onClick}
      className={`  flex justify-start gap-3 items-center !px-2 !py-2 rounded-xl w-full normal-case ${
        isActive ? "bg-white" : ""
      }`}
    >
      <div className="relative">
        <img src={chat.participant?.avatar} className="w-11 h-11 rounded-full bg-base-300/40" />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200" />
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center text-gray-700 justify-between">
          <span className="font-medium text-sm ">
            {chat.participant?.name || "Unknown"}
          </span>
          {chat.lastMessageAt && (
            <span className="text-xs text-base-content/60">{formatTime(chat.lastMessageAt)}</span>
          )}
        </div>
        <p className="text-xs text-gray-400 !mt-0.5">
          {isTyping ? "typing..." : chat.lastMessage?.content || "No messages yet"}
        </p>
      </div>
    </button>
  )
}
