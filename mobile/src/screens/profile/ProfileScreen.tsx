import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../features/auth/hooks/useAuth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.email || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.email || 'No email'}</Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>⚙️ Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🛡️ Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={signOut}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.version}>TaskFlow v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f3ff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 28,
    width: '100%',
    maxWidth: 380,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.06)',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
  avatarText: { fontSize: 36, color: '#fff', fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: '#1f2937' },
  email: { fontSize: 14, color: '#6b7280', marginTop: 2, marginBottom: 16 },
  divider: { width: '100%', height: 1, backgroundColor: '#e5e7eb', marginVertical: 16 },
  menuItem: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: { color: '#1f2937', fontSize: 16, fontWeight: '500' },
  logoutItem: { backgroundColor: '#fee2e2', marginBottom: 0 },
  logoutText: { color: '#dc2626', fontSize: 16, fontWeight: '600' },
  version: { marginTop: 20, color: '#9ca3af', fontSize: 12 },
});
