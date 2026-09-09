import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, Logo, Heading, Subtitle, Spacer, Input, Button } from '../../components/shared';
import { useLogin } from '../../features/auth/hooks/useLogin';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isLoading } = useLogin();
  const router = useRouter();

  const handleLogin = () => {
    login({ email, password }, {
      onSuccess: () => router.replace('/tabs'),
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
            <Heading>Welcome Back! 🎉</Heading>
            <Subtitle>Sign in to continue and get things done</Subtitle>
          </View>
          <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" leftIcon="✉️" />
          <Input label="Password" placeholder="•••••••••" value={password} onChangeText={setPassword} secureTextEntry leftIcon="🔒" />
          <Button title="Sign In" onPress={handleLogin} loading={isLoading} />
          <Spacer size="small" />
          <Button title="Create Account" variant="outline" onPress={() => router.push('/auth/register')} />
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

