import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewChatScreen = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1 justify-end">
        <View className="rounded-t-3xl h-[95%] overflow-hidden">
          <View className="px-5 pt-3 pb-3 border-b border-surface-light flex-row items-center">
            <Pressable
              className="w-9 h-9 rounded-full items-center justify-center mr-2 bg-surface-card"
              onPress={() => router.back()}
            >
              <Ionicons name="close" size={20} color="#F4A261" />
            </Pressable>
            <View className="flex-1">
              <Text className="text-forehead text-xl font-semibold">
                New Chat
              </Text>
              <Text className="text-muted-foreground text-xs mt-05">
                Search for a user to start chatting
              </Text>
            </View>
          </View>

          <View className="px-5 pt-3 pb-2 ">
            <View className="flex-row items-start rounded-full px-3 py-1.5 gap-2 border ">
              <Ionicons name="search" size={18} color="#6B6B70" />
              <TextInput
                placeholder="Search Users"
                placeholderTextColor="#6B6B70"
                className="flex-1 text-forehead text-sm"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* <View className="flex-1 bg-surface">
            {isCreatingChat || isLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#F4A261" />
              </View>
            ) : !users || users.length === 0 ? (
              <View className="flex-1 items-center justify-center px-5">
                <Ionicons name="person-outline" size={64} color="#6B6B70" />
                <Text className="text-muted-foreground text-lg mt-4">No users found</Text>
                <Text className="text-subtle-foreground text-sm mt-1 text-center">
                  Try a different search term
                </Text>
              </View>
            ) : (
              <ScrollView
                className="flex-1 px-5 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
              >
                <Text className="text-muted-foreground text-xs mb-3">USERS</Text>
                {users.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    isOnline={onlineUsers.has(user._id)}
                    onPress={() => handleUserSelect(user)}
                  />
                ))}
              </ScrollView>
            )}
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewChatScreen;
