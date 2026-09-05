import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7c3aed",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          borderTopColor: "transparent",
          paddingBottom: 6,
          paddingTop: 6,
          height: 58,
          shadowColor: "#7c3aed",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        headerShown: false,
        tabBarItemStyle: { borderRadius: 12 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "🏠 Home" }} />
      <Tabs.Screen name="profile" options={{ title: "👤 Profile" }} />
      <Tabs.Screen name="ai" options={{ title: "🤖 AI Chat" }} />
    </Tabs>
  );
}
