import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface AIInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const AIInput: React.FC<AIInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Type your message...',
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    multiline
    maxLength={500}
    placeholderTextColor="#9ca3af"
  />
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 15,
    backgroundColor: '#f9fafb',
    maxHeight: 100,
  },
});
