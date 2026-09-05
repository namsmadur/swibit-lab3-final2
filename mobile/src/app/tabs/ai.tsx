import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useAI } from "../../features/ai/hooks/useAI";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! I'm your AI assistant. Ask me about your tasks, project progress, or anything else! ✨", isUser: false, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const { sendMessage, isLoading } = useAI();
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), text: input.trim(), isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    const history = messages.map(m => ({ role: m.isUser ? "user" : "assistant", content: m.text }));
    const result = await sendMessage.mutateAsync({ messages: [...history, { role: "user", content: userMessage.text }] });
    if (result.response) {
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: result.response, isUser: false, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  useEffect(() => { if (messages.length > 0) flatListRef.current?.scrollToEnd({ animated: true }); }, [messages]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#f5f3ff" }} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={100}>
      <View style={{ padding: 18, paddingTop: 16, backgroundColor: "#7c3aed", borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: "#7c3aed", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 6 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#fff" }}>✨ AI Assistant</Text>
        <Text style={{ fontSize: 14, color: "#e0d7ff" }}>Ask me about your tasks and projects</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              maxWidth: "85%",
              padding: 14,
              borderRadius: 20,
              marginBottom: 10,
              alignSelf: item.isUser ? "flex-end" : "flex-start",
              backgroundColor: item.isUser ? "#7c3aed" : "#fff",
              borderBottomRightRadius: item.isUser ? 4 : 20,
              borderBottomLeftRadius: item.isUser ? 20 : 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Text style={{ color: item.isUser ? "#fff" : "#1f2937", fontSize: 15 }}>{item.text}</Text>
            <Text style={{ fontSize: 10, color: item.isUser ? "#e0d7ff" : "#9ca3af", marginTop: 4, alignSelf: "flex-end" }}>
              {item.timestamp.toLocaleTimeString()}
            </Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
        ListFooterComponent={
          isLoading ? (
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10, alignSelf: "flex-start" }}>
              <ActivityIndicator size="small" color="#7c3aed" />
              <Text style={{ marginLeft: 8, color: "#6b7280", fontSize: 14 }}>AI is thinking...</Text>
            </View>
          ) : null
        }
      />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 12, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#e5e7eb" }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1.5,
            borderColor: "#e5e7eb",
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginRight: 10,
            fontSize: 15,
            backgroundColor: "#fafafa",
          }}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
          placeholderTextColor="#9ca3af"
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!input.trim() || isLoading}
          style={{
            backgroundColor: "#7c3aed",
            borderRadius: 24,
            paddingVertical: 10,
            paddingHorizontal: 20,
            opacity: !input.trim() || isLoading ? 0.5 : 1,
            shadowColor: "#7c3aed",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
