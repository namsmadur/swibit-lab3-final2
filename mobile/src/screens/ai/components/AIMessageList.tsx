import React, { useRef, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { AIMessageBubble } from './AIMessageBubble';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIMessageListProps {
  messages: Message[];
  ListFooterComponent?: React.ReactNode;
}

export const AIMessageList: React.FC<AIMessageListProps> = ({
  messages,
  ListFooterComponent,
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AIMessageBubble
          text={item.text}
          isUser={item.isUser}
          timestamp={item.timestamp.toLocaleTimeString()}
        />
      )}
      contentContainerStyle={styles.container}
      ListFooterComponent={ListFooterComponent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 20 },
});
