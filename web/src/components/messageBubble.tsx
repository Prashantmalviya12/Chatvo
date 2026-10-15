import React from 'react'
import type { Message, MessageSender } from '../lib/types/chat.types';


type MessageBubble = {
    message:Message
    userId:string
}
export default function MessageBubble({ message, userId }:MessageBubble) {
     const senderId = (message.senderId as MessageSender)._id;
     const isMe = senderId === userId;

    //  console.log(userId)


  return (
    <div className={`flex  ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md !mt-0.5 !px-4 !py-2.5 rounded-2xl ${
          isMe
            ? "bg-primary rounded-br-sm border  border-surface-light"
            : "bg-surface-light rounded-bl-sm  text-gray-800"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        
      </div>
    </div>
  )
}
