import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tasks" options={{ title: "Tasks" }} />
        <Stack.Screen name="assistant" options={{ title: "AI Assistant" }} />
      </Stack>
    </QueryClientProvider>
  );
}
