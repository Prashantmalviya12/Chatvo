import ChatItem from "@/components/chatItem";
import EmptyUI from "@/components/emptyUI";
import { useGetChats } from "@/lib/hooks/useChat";
import { ChatlistModel } from "@/lib/types/chat.types";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

const ChatTabs = () => {
  const { data, isLoading, error, refetch } = useGetChats();
  // console.log("chat data", data);

  // if (isLoading) {
  //   return (
  //     <View className="flex-1 bg-surface items-center justify-center">
  //       <ActivityIndicator size={"large"} color={"#00b4d8"} />
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500 text-3xl">Failed to load chats</Text>
        <Pressable
          onPress={() => refetch()}
          className="bg-[##00b4d8] mt-4 px-4 py-2 bg-primary rounded-lg"
        >
          <Text className="text-white">
            <Ionicons name="refresh" size={15} /> Retry
          </Text>
        </Pressable>
      </View>
    );
  }

  const handleChatPress = (chat: ChatlistModel) => {
    // console.log("chat--", chat);
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        // participantId: chat.participant,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    });
  };
  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={data.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem chatData={item} onpress={() => handleChatPress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyUI
            title="No chats Yet"
            subtitle="Start a conversation!"
            iconName="chatbubbles-outline"
            iconColor="#6B6B70"
            buttonLabel="New Chat"
            onPressButton={() => router.push("/new-chat")}
          />
        }
      />
    </View>
  );
};

export default ChatTabs;

function Header() {
  const router = useRouter();

  return (
    <View className="px-5 pt-2 pb-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">Chats</Text>
        <Pressable
          className="size-10 bg-primary rounded-full items-center justify-center"
          onPress={() => router.push("/new-chat")}
        >
          <Ionicons name="create-outline" size={20} color="#0D0D0F" />
        </Pressable>
      </View>
    </View>
  );
}
