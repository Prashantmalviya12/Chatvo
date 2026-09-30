import { useGetChats } from "@/lib/hooks/useChat";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatTabs = () => {
  const { data, isLoading } = useGetChats();

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size={"large"} color={"#00b4d8"} />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View>
        <Text>Tabs</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatTabs;
