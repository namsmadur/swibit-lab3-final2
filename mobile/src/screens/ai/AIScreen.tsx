import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useAI } from '../../features/ai/hooks/useAI';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. Ask me about your tasks, project progress, or anything else! ✨",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const { sendMessage, isLoading } = useAI();
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    const history = messages.map((m) => ({
      role: m.isUser ? 'user' : 'assistant',
      content: m.text,
    }));
    const result = await sendMessage.mutateAsync({
      messages: [...history, { role: 'user', content: userMessage.text }],
    });
    if (result.response) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  useEffect(() => {
    if (messages.length > 0) flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.botMessage]}>
      <Text style={item.isUser ? styles.userText : styles.botText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp.toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>✨ AI Assistant</Text>
          <Text style={styles.headerSubtitle}>Ask me about your tasks and projects</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          ListFooterComponent={isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#7c3aed" />
              <Text style={styles.loadingText}>AI is thinking...</Text>
            </View>
          ) : null}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Type your message..." value={input} onChangeText={setInput} multiline maxLength={500} placeholderTextColor="#9ca3af" />
          <TouchableOpacity style={[styles.sendButton, (!input.trim() || isLoading) && styles.sendButtonDisabled]} onPress={handleSend} disabled={!input.trim() || isLoading}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#7c3aed',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 8,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
  headerSubtitle: { fontSize: 12, color: '#e0d7ff', marginTop: 2 },
  chatContainer: { padding: 12, paddingBottom: 16 },
  messageContainer: { maxWidth: '85%', padding: 10, borderRadius: 16, marginBottom: 8 },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#7c3aed', borderBottomRightRadius: 4 },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4, shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: { width: 0, height: 1 }, shadowRadius: 3, elevation: 1 },
  userText: { color: '#fff', fontSize: 14 },
  botText: { color: '#1f2937', fontSize: 14 },
  timestamp: { fontSize: 9, color: '#9ca3af', marginTop: 3, alignSelf: 'flex-end' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderRadius: 20,
    marginVertical: 8,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  sendButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  sendButtonDisabled: { opacity: 0.5 },
  sendText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, alignSelf: 'flex-start' },
  loadingText: { marginLeft: 6, color: '#6b7280', fontSize: 13 },
});
