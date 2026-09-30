import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

const TabsLayout = () => {
  const { signOut, isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href={"/(auth)"} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#00b4d8",
          borderTopColor: "#014f86",
          borderTopWidth: 1,
          height: 88,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#0077b6",
        tabBarInactiveTintColor: "#f8f9fa",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, focused, size }) => {
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={size}
              color={color}
            />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused, size }) => {
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
