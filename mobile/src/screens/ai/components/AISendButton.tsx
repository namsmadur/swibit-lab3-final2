import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AISendButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const AISendButton: React.FC<AISendButtonProps> = ({
  onPress,
  disabled,
}) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>Send</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  disabled: { opacity: 0.5 },
  text: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
