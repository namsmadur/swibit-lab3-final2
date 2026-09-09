import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ProfileEmailProps {
  email: string;
}

export const ProfileEmail: React.FC<ProfileEmailProps> = ({ email }) => (
  <Text style={styles.email}>{email}</Text>
);

const styles = StyleSheet.create({
  email: { fontSize: 14, color: '#6b7280', marginTop: 2, marginBottom: 16 },
});
