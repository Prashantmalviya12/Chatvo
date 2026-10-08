import EmptyUI from "@/components/emptyUI";
import MessageBubble from "@/components/messageBubble";
import { useGetMessage } from "@/lib/hooks/message.hooks";
import { useCurrentUser } from "@/lib/hooks/useAuth";
import { useSocketStore } from "@/lib/socket";
import { MessageSender } from "@/lib/types/chat.types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ChatParams = {
  id: string;
  participantId: string;
  name: string;
  avatar: string;
};

const ChatDetailScreen = () => {
  const {
    id: chatId,
    avatar,
    name,
    participantId,
  } = useLocalSearchParams<ChatParams>();
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const { data: currentUser } = useCurrentUser();
  // console.log("profile", currentUser.data);
  const { data: messageData, isLoading: messageLoading } =
    useGetMessage(chatId);

  // console.log("message", messageData);
  const {
    joinChat,
    leaveChat,
    sendMessage,
    sendTyping,
    isConnected,
    onlineUsers,
    typingUsers,
  } = useSocketStore();

  const isOnline = participantId ? onlineUsers.has(participantId) : false;
  const isTyping = typingUsers.get(chatId) === participantId;
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // console.log("isConnected", isConnected);

  useEffect(() => {
    if (chatId && isConnected) joinChat(chatId);

    return () => {
      if (chatId) leaveChat(chatId);
    };
  }, [chatId, isConnected, joinChat, leaveChat]);

  useEffect(() => {
    if (messageData && messageData.data.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messageData]);

  const handleTyping = useCallback((text: string) => {
    setMessageText(text);
    if (!isConnected || !chatId) return;

    if (text.length > 0) {
      sendTyping(chatId, true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        sendTyping(chatId, false);
      }, 2000);
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      sendTyping(chatId, false);
    }
  }, []);

  const handleSend = () => {
    console.log("useScoket", {
      // currentUser,
      // messageText,
      isSending,
      isConnected,
    });

    if (!messageText.trim() || isSending || !isConnected || !currentUser)
      return;

    // stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    sendTyping(chatId, false);

    setIsSending(true);
    sendMessage(chatId, messageText.trim(), {
      _id: currentUser?.data._id,
      name: currentUser?.data.name,
      email: currentUser?.data.email,
      avatar: currentUser?.data.avatar,
    });
    setMessageText("");
    setIsSending(false);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  console.log("Message", messageData);

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <View className="flex-row items-center px-4 py-2 bg-surface border-b border-surface-light">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#caf0f8" />
        </Pressable>
        <View className="flex-row items-center flex-1 ml-2">
          {avatar && (
            <Image
              source={avatar}
              style={{ width: 40, height: 40, borderRadius: 999 }}
            />
          )}
          <View className="ml-3">
            <Text
              className="text-foreground font-semibold text-base"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text className={`text-xs text-foreground`}>
              {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <Pressable className="w-9 h-9 rounded-full items-center justify-center">
            <Ionicons name="call-outline" size={20} color="#caf0f8" />
          </Pressable>
          <Pressable className="w-9 h-9 rounded-full items-center justify-center">
            <Ionicons name="videocam-outline" size={20} color="#caf0f8" />
          </Pressable>
        </View>
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <View className="flex-1">
          {messageLoading ? (
            <View>
              <ActivityIndicator size="large" color="#00b4d8" />
            </View>
          ) : messageData?.data && messageData?.data?.length === 0 ? (
            <EmptyUI
              title="No Message yet"
              subtitle="Start the Conversation!"
              iconName="chatbubbles-outline"
              iconColor="#6B6B70"
              iconSize={64}
            />
          ) : (
            <ScrollView>
              {messageData?.data?.map((message, idx) => {
                const senderId = (message.senderId as MessageSender)._id;
                const isfromMe = currentUser
                  ? senderId === currentUser.data._id
                  : false;
                console.log("isfromMe", isfromMe);
                console.log("currentUser", currentUser.data);

                return (
                  <MessageBubble
                    key={message._id}
                    message={message}
                    isFromMe={isfromMe}
                  />
                );
              })}
            </ScrollView>
          )}

          <View className="px-3 pb-3 pt-2 bg-surface border-t border-surface-light">
            <View className="flex-row items-end bg-surface-light rounded-3xl px-3 py-1.5 gap-2">
              <Pressable className="w-8 h-8 rounded-full items-center justify-center">
                <Ionicons name="add" size={22} />
              </Pressable>

              <TextInput
                placeholder="Type a message"
                placeholderTextColor="#6B6B70"
                className="flex-1  text-sm mb-2"
                multiline
                style={{ maxHeight: 100 }}
                value={messageText}
                onChangeText={handleTyping}
                onSubmitEditing={handleSend}
                editable={!isSending}
              />

              <Pressable
                className="w-8 h-8 rounded-full items-center justify-center bg-primary"
                onPress={handleSend}
                disabled={!messageText.trim() || isSending}
              >
                {isSending ? (
                  <ActivityIndicator size="small" color="#0D0D0F" />
                ) : (
                  <Ionicons name="send" size={18} color="#0D0D0F" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;
