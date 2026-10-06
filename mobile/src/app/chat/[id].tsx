import EmptyUI from "@/components/emptyUI";
import { useGetMessage } from "@/lib/hooks/message.hooks";
import { useCurrentUser } from "@/lib/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
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
  const { data: messageData, isLoading: messageLoading } =
    useGetMessage(chatId);

  const isOnline = false;
  const isTyping = false;

  // useEffect(() => {
  //   if (messageData && messageData.length > 0) {
  //     setTimeout(() => {
  //       scrollViewRef.current?.scrollToEnd({ animated: true });
  //     }, 100);
  //   }
  // }, [messageData]);

  console.log("Message", messageData);
  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <View className="flex-row items-center px-4 py-2 bg-surface border-b border-surface-light">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#F4A261" />
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
            <Text
              className={`text-xs ${isTyping ? "text-primary" : "text-muted-foreground"}`}
            >
              {isTyping ? "typing..." : isOnline ? "Online" : "Offline"}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <Pressable className="w-9 h-9 rounded-full items-center justify-center">
            <Ionicons name="call-outline" size={20} color="#A0A0A5" />
          </Pressable>
          <Pressable className="w-9 h-9 rounded-full items-center justify-center">
            <Ionicons name="videocam-outline" size={20} color="#A0A0A5" />
          </Pressable>
        </View>
      </View>
      <KeyboardAvoidingView className="flex-1" keyboardVerticalOffset={0}>
        <EmptyUI
          title="No Message yet"
          subtitle="Start the Conversation!"
          iconName="chatbubbles-outline"
          iconColor="#6B6B70"
          iconSize={64}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;
