import { Message } from "@/lib/types/chat.types";
import { Text, View } from "react-native";

type messageType = {
  message: Message;
  isFromMe: boolean;
};
export default function MessageBubble({ message, isFromMe }: messageType) {
  // console.log("message sent", message);
  return (
    <View className={`flex-row ${isFromMe ? "justify-end" : "justify-start"} `}>
      <View
        className={`max-w-[80%] mb-1 px-3 py-2 rounded-2xl ${
          isFromMe
            ? "bg-primary rounded-br-sm border border-surface-light"
            : "bg-surface-card rounded-bl-sm border border-surface-light"
        }`}
      >
        <Text className={`text-sm `}>{message.content}</Text>
      </View>
    </View>
  );
}
