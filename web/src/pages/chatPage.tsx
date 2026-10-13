import { UserButton } from "@clerk/react";
import { MessageSquareIcon, PlusIcon,  } from "lucide-react";
import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { useCurrentUser } from "../lib/hooks/useAuth";
import { useGetChats, useGetorCreateChat } from "../lib/hooks/useChats";
import { useGetMessage } from "../lib/hooks/useMessage";
import type { ChatlistModel } from "../lib/types/chat.types";
import ChatListItem from "../components/chatListItem";
import ChatHeader from "../components/chatHeader";
import MessageBubble from "../components/messageBubble";
import ChatInput from "../components/chatInput";
// import NewChatModel from "../components/newChatModel";
import { useSocketStore } from "../lib/socket.io";
import { useSocketConnection } from "../lib/hooks/socketConnection";
import NewChatModel from "../components/newChatModel";

export default function ChatPage() {
   const { data: currentUser } = useCurrentUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeChatId = searchParams.get("chat");

  const [messageInput, setMessageInput] = useState("");
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { socket, sendTyping, sendMessage } = useSocketStore();

  useSocketConnection(String(activeChatId));

  const { data: chats, isLoading: chatsLoading } = useGetChats();
  const { data: messages, isLoading: messagesLoading } = useGetMessage(String(activeChatId));
  // console.log("message",messages)
  const startChatMutation = useGetorCreateChat();

  // scroll to bottom when chat or messages changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, messages]);

  const handleStartChat = (participantId:string) => {
    startChatMutation.mutate(participantId, {
      onSuccess: (chat) => setSearchParams({ chat: chat._id }),
    });
  };

  const handleSend = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId || !socket || !currentUser?.data) return;

    const text = messageInput.trim();
    sendMessage(activeChatId, text, currentUser.data);
    setMessageInput("");
    sendTyping(activeChatId, false);
  };

  const handleTyping = (e:ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
    if (!activeChatId) return;

    sendTyping(activeChatId, true);
    if (typingTimeoutRef.current !== null) {
  clearTimeout(typingTimeoutRef.current);
}
    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(activeChatId, false);
    }, 2000);
  };

  const activeChat = chats?.data.find((c:ChatlistModel) => c.id === activeChatId);

  // console.log("chat user",activeChat)

  return (
    <div className="h-screen bg-base-100 text-base-content flex">
      {/* Sidebar */}
      <div className="w-80 shadow-xl bg-surface-light border-base-300 flex flex-col bg-base-200">
        {/* HEADER */}
        <div className="!p-4 border-b border-gray-400 ">
          <div className="flex items-center justify-between !mb-4">
            <Link to="/chat" className="flex items-center gap-2">
              <img
                src="../../public/images/logo.png"
                className="w-25 h-7    object-cover"
              />
            </Link>
           <UserButton />
          </div>
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="btn btn-primary w-full text-center flex items-center !px-2 !py-1 text-foreground btn-block gap-2 rounded-xl bg-linear-to-r
             from-primary to-surface border-none"
          >
            <PlusIcon className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* chat list */}
        <div className="flex-1 overflow-y-auto">
          {chatsLoading && (
            <div className="flex items-center justify-center py-8">
              <span className="loading loading-spinner loading-sm text-amber-400" />
            </div>
          )}

          {chats?.data.length === 0 && !chatsLoading && <NoConversationsUI />}

          <div className="flex flex-col gap-1 !mt-2">
            {chats?.data.map((chat:ChatlistModel) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                isActive={activeChatId === chat._id}
                onClick={() => setSearchParams({ chat: chat.id })}
              />
            ))}
          </div>
        </div>
      </div>

      {/* main chat area */}
      <div className="flex-1 flex flex-col">
        {activeChatId && activeChat ? (
          <>
            <ChatHeader participant={activeChat.participant} chatId={activeChatId} />

           
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messagesLoading && (
                <div className="flex items-center justify-center h-full">
                  <span className="loading loading-spinner loading-md text-amber-400" />
                </div>
              )}

              {messages?.data.length === 0 && !messagesLoading && <NoMessagesUI />}

              {messages?.data && messages?.data?.length > 0 &&
                messages.data.map((msg) => (
                  <MessageBubble key={msg._id} message={msg} userId={currentUser?.data._id??""} />
                ))}

              <div ref={messagesEndRef} />
            </div>

            <ChatInput
              value={messageInput}
              onChange={handleTyping}
              onSubmit={handleSend}
              disabled={!messageInput.trim()}
            />
          </>
        ) : (
          <NoChatSelectedUI />
        )}
      </div>

      <NewChatModel
        onStartChat={handleStartChat}
        isPending={startChatMutation.isPending}
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
      />
    </div>
  );
}


function NoConversationsUI() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <MessageSquareIcon className="w-10 h-10 text-surface mb-3" />
      <p className="text-base-content/70 text-sm">No conversations yet</p>
      <p className="text-base-content/60 text-xs mt-1">Start a new chat to begin</p>
    </div>
  );
}

function NoMessagesUI() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 rounded-2xl bg-base-300/40 flex items-center justify-center mb-4">
        <MessageSquareIcon className="w-8 h-8 text-base-content/20" />
      </div>
      <p className="text-base-content/70">No messages yet</p>
      <p className="text-base-content/60 text-sm mt-1">Send a message to start the conversation</p>
    </div>
  );
}

function NoChatSelectedUI() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
      <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-surface-light to-surface-light flex items-center justify-center mb-6">
        <MessageSquareIcon className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Welcome to Chatvo</h2>
      <p className="text-base-content/70 max-w-sm">
        Select a conversation from the sidebar or start a new chat to begin messaging
      </p>
    </div>
  );
}