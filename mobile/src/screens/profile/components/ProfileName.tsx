import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ProfileNameProps {
  name: string;
}

export const ProfileName: React.FC<ProfileNameProps> = ({ name }) => (
  <Text style={styles.name}>{name}</Text>
);

const styles = StyleSheet.create({
  name: { fontSize: 20, fontWeight: '700', color: '#1f2937' },
});
