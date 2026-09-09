import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Logo, Heading, Subtitle, Spacer, Input, Button } from '../../components/shared';
import { useRegister } from '../../features/auth/hooks/useRegister';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: register, isLoading } = useRegister();
  const router = useRouter();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    register({ email, password }, {
      onSuccess: () => {
        alert('Account created! Please login.');
        router.replace('/');
      },
      onError: (err) => alert(err.message),
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.glassCard}>
          <View style={styles.header}>
            <Logo size="small" />
            <Spacer size="small" />
            <Heading>Create Account 🚀</Heading>
            <Subtitle>Join TaskFlow and start managing your tasks</Subtitle>
          </View>
          <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" leftIcon="✉️" />
          <Input label="Password" placeholder="•••••••••" value={password} onChangeText={setPassword} secureTextEntry leftIcon="🔒" />
          <Input label="Confirm Password" placeholder="•••••••••" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry leftIcon="🔒" />
          <Button title="Create Account" onPress={handleRegister} loading={isLoading} />
          <Spacer size="small" />
          <Button title="Back to Login" variant="outline" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0ff' },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  glassCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: 32,
    padding: 28,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  header: { alignItems: 'center', marginBottom: 20 },
});

