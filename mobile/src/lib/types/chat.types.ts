export interface MessageSender {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Message {
  _id: string;
  chatId: string;
  senderId: MessageSender | string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatLastMessage {
  _id: string;
  content: string;
  sender: string;
  createdAt: string;
}

export interface ChatlistModel {
  id: string;
  _id: string;
  participant: MessageSender;
  lastMessage: ChatLastMessage | null;
  lastMessageAt: string;
  createdAt: string;
}

export type messageResponse = {
  data: Message[];
  success: boolean;
  message: string;
};
