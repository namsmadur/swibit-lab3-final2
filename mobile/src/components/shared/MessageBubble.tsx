import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isUser, timestamp }) => (
  <View style={[styles.container, isUser ? styles.userBubble : styles.botBubble]}>
    <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>{text}</Text>
    <Text style={styles.timestamp}>{timestamp}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { maxWidth: '85%', padding: 12, borderRadius: 16, marginBottom: 8 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#7c3aed', borderBottomRightRadius: 4 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  text: { fontSize: 15 },
  userText: { color: '#fff' },
  botText: { color: '#1f2937' },
  timestamp: { fontSize: 10, color: '#9ca3af', marginTop: 4, alignSelf: 'flex-end' },
});
