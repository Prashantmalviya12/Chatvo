import { QueryClient } from "@tanstack/react-query";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import {
  ChatlistModel,
  Message,
  messageResponse,
  MessageSender,
} from "./types/chat.types";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL;
interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  typingUsers: Map<string, string>;
  unreadChats: Set<string>;
  currentChatId: string | null;
  queryClient: QueryClient | null;

  connect: (token: string, queryClient: QueryClient) => void;
  disconnect: () => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  sendTyping: (chatId: string, isTyping: boolean) => void;
  sendMessage: (
    chatId: string,
    text: string,
    currentUsers: MessageSender,
  ) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  typingUsers: new Map(),
  unreadChats: new Set(),
  currentChatId: null,
  queryClient: null,

  connect: (token, queryClient) => {
    const existingSocket = get().socket;
    if (existingSocket?.connected) return;

    if (existingSocket) existingSocket.disconnect();

    const socket = io(SOCKET_URL, { auth: { token } });
    // console.log("socket", socket);

    socket.on("connect", () => {
      console.log("Socket connected, id:", socket.id);
      set({ isConnected: true });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnect", socket.id);
      set({ isConnected: false });
    });
    socket.on("online-users", ({ userIds }: { userIds: string[] }) => {
      console.log("Received Online-users:", userIds);
      set({ onlineUsers: new Set(userIds) });
    });
    socket.on("online-offline", ({ userId }: { userId: string }) => {
      set((state) => {
        const onlineUsers = new Set(state.onlineUsers);
        onlineUsers.delete(userId);
        return { onlineUsers: onlineUsers };
      });
    });
    socket.on("socket-error", (error: { message: string }) => {
      console.log("Socket error:", error.message);
    });

    socket.on("new-message", (message: Message) => {
      const senderId = (message.senderId as MessageSender)._id;
      const { currentChatId } = get();

      queryClient.setQueryData<Message[]>(
        ["getMessage", message.chatId],
        (old) => {
          if (!old) return [message];

          const filtered = old.filter((m) => m._id.startsWith("temp-"));
          if (filtered.some((m) => m._id === message._id)) return filtered;
          return [...filtered, message];
        },
      );

      queryClient.setQueryData<ChatlistModel[]>(["chats"], (oldChats) => {
        return oldChats?.map((chat) => {
          if (chat._id === message.chatId) {
            return {
              ...chat,
              lastMessage: {
                _id: message._id,
                content: message.content,
                sender: senderId,
                createdAt: message.createdAt,
              },
              lastMessageAt: message.createdAt,
            };
          }
          return chat;
        });
      });

      if (currentChatId !== message.chatId) {
        const chats = queryClient.getQueryData<ChatlistModel[]>(["chats"]);
        const chat = chats?.find((c) => c._id === message.chatId);
        if (chat?.participant && senderId === chat.participant._id) {
          set((state) => ({
            unreadChats: new Set([...state.unreadChats, message.chatId]),
          }));
        }
      }

      set((state) => {
        const typingUsers = new Map(state.typingUsers);
        typingUsers.delete(message.chatId);
        return { typingUsers: typingUsers };
      });
    });
    socket.on(
      "typing",
      ({
        userId,
        chatId,
        isTyping,
      }: {
        userId: string;
        chatId: string;
        isTyping: boolean;
      }) => {
        set((state) => {
          const typingUsers = new Map(state.typingUsers);
          if (isTyping) typingUsers.set(chatId, userId);
          else typingUsers.delete(chatId);

          return { typingUsers: typingUsers };
        });
      },
    );

    set({ socket, queryClient });
  },
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();

      set({
        socket: null,
        isConnected: false,
        onlineUsers: new Set(),
        typingUsers: new Map(),
        unreadChats: new Set(),
        currentChatId: null,
        queryClient: null,
      });
    }
  },
  joinChat: (chatId) => {
    const socket = get().socket;
    set((state) => {
      const unreadChats = new Set(state.unreadChats);
      unreadChats.delete(chatId);
      return { currentChatId: chatId, unreadChats: unreadChats };
    });
    if (socket?.connected) {
      socket.emit("join-chat", chatId);
    }
  },
  leaveChat: (chatId) => {
    const { socket } = get();
    set({ currentChatId: null });
    if (socket?.connected) {
      socket.emit("leave-chat", chatId);
    }
  },

  sendMessage: (chatId, text, currentUser) => {
    // console.log("socket send message", chatId, "-", text, "-", currentUser);
    const { socket, queryClient } = get();
    if (!socket?.connected || !queryClient) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      _id: tempId,
      chatId: chatId,
      senderId: currentUser,
      content: text,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log("optimisticMessage", optimisticMessage);

    queryClient.setQueryData<messageResponse>(["getMessage", chatId], (old) => {
      if (!old) {
        return {
          data: [optimisticMessage],
          success: true,
          message: "Get Message Successfully",
        };
      }

      return {
        ...old,
        data: [...old.data, optimisticMessage],
      };
    });

    socket.emit("send-message", { chatId, text });

    const errorHandle = (error: { message: string }) => {
      queryClient.setQueryData<Message[]>(["getMessage", chatId], (old) => {
        if (!old) return [];
        return old.filter((m) => m._id !== tempId);
      });
    };
    console.log("socket-error", errorHandle);
  },
  sendTyping: (chatId, isTyping) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit("typing", { chatId, isTyping });
    }
  },
}));
