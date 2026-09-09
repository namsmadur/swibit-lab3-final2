import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../../features/auth/hooks/useAuth';

export const LogoutButton = () => {
  const { signOut } = useAuth();
  return (
    <TouchableOpacity style={styles.button} onPress={signOut}>
      <Text style={styles.text}>🚪 Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { paddingVertical: 10, alignItems: 'center' },
  text: { color: '#6b7280', fontSize: 14, fontWeight: '500' },
});
