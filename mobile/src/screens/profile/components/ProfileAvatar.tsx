import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileAvatarProps {
  email?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ email }) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {email ? email.charAt(0).toUpperCase() : 'U'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  text: { fontSize: 34, color: '#fff', fontWeight: '700' },
});
