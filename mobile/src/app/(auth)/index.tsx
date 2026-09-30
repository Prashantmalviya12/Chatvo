import useSocialAuth from "@/lib/hooks/useSocialAuth";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Dimensions, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Authscreen = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isLoading = loadingStrategy !== null;

  return (
    <SafeAreaView className="flex-1 ">
      <View className="items-center pt-10">
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{
            width: width - 48,
            height: 150,
            // borderWidth:1
            // marginVertical:-20
          }}
          contentFit="cover"
          // className="border"
        />
        {/* <Text className="text-4xl font-bold text-primary font-serif tracking-wider uppercase">
          ChatVo
        </Text> */}
      </View>
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={require("../../../assets/images/auth.png")}
          style={{
            width: width - 48,
            height: height * 0.4,
          }}
          contentFit="contain"
        />
      </View>
      <View className="mt-4 items-center">
        <Text className="text-2xl font-bold text-foreground text-center text-[#00b4d8]">
          Login with
        </Text>
      </View>
      <View className="flex-row gap-4 mt-10 px-5">
        {/* GOOGLE BTN */}
        <Pressable
          className="flex-1 flex-row items-center justify-center gap-2 bg-[#00b4d8] py-4 rounded-2xl active:scale-[0.97]"
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          onPress={() => !isLoading && handleSocialAuth("oauth_google")}
        >
          <>
            <Image
              source={require("../../../assets/images/google.png")}
              style={{ width: 20, height: 20 }}
              contentFit="contain"
            />
            <Text className="text-gray-900 font-semibold text-sm">Google</Text>
          </>
        </Pressable>

        {/* APPLE BTN */}
        <Pressable
          className="flex-1 flex-row items-center justify-center gap-2 bg-[#00b4d8]/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Continue with Apple"
          onPress={() => !isLoading && handleSocialAuth("oauth_apple")}
        >
          <>
            <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
            <Text className="text-foreground font-semibold text-sm">Apple</Text>
          </>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Authscreen;
