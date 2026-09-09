import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ProfileMenuItemProps {
  title: string;
  onPress?: () => void;
  danger?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  title,
  onPress,
  danger = false,
}) => (
  <TouchableOpacity
    style={[styles.item, danger && styles.dangerItem]}
    onPress={onPress}
  >
    <Text style={[styles.text, danger && styles.dangerText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  dangerItem: { backgroundColor: '#fee2e2' },
  text: { color: '#1f2937', fontSize: 16, fontWeight: '500' },
  dangerText: { color: '#dc2626' },
});
