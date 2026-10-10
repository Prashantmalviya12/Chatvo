import { useSocketStore } from "@/lib/socket";
import { ChatlistModel } from "@/lib/types/chat.types";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type ChatItemType = {
  chatData: ChatlistModel;
  onpress: () => void;
};

const ChatItem = ({ chatData, onpress }: ChatItemType) => {
  const participant = chatData.participant;

  const { onlineUsers, typingUsers, unreadChats } = useSocketStore();

  const isOnline = onlineUsers.has(participant._id);
  const isTyping = typingUsers.get(chatData._id) === participant._id;
  const hasUnread = unreadChats.has(chatData._id);
  return (
    <Pressable
      className={`flex-row items-center py-3 px-3  active-opacity-70 ${hasUnread ? "bg-surface-light" : "border border-surface-light"}`}
      onPress={onpress}
    >
      <View>
        <Image
          source={participant.avatar}
          style={{ width: 56, height: 56, borderRadius: 999 }}
        />
        {isOnline && (
          <View className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-[3px] " />
        )}
      </View>

      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-base font-medium ${hasUnread ? "text-primary" : "text-black"}`}
          >
            {participant.name}
          </Text>

          <View className="flex-row items-center gap-2">
            {hasUnread && (
              <View className="w-2.5 h-2.5 bg-primary rounded-full" />
            )}
            <Text className="text-xs text-subtle-foreground">
              {chatData.lastMessageAt
                ? formatDistanceToNow(new Date(chatData.lastMessageAt), {
                    addSuffix: false,
                  })
                : ""}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-1">
          {isTyping ? (
            <Text className="text-sm text-primary italic">typing...</Text>
          ) : (
            <Text
              className={`text-sm flex-1 mr-3 ${hasUnread ? "text-foreground font-medium" : "text-subtle-foreground"}`}
              numberOfLines={1}
            >
              {chatData.lastMessage?.content || "No messages yet"}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
