import { createBottomTabNavigator } from "expo-router/js-tabs";
import HomeScreen from "../../screens/home/HomeScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import AIScreen from "../../screens/ai/AIScreen";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  console.log("🔥 TabsLayout rendered (using expo-router/js-tabs)");
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#7c3aed",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
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
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "🏠 Home" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "👤 Profile" }} />
      <Tab.Screen name="AI" component={AIScreen} options={{ title: "🤖 AI Chat" }} />
    </Tab.Navigator>
  );
}
