import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Card } from '../../../components/ui/Card';
import { LoginHeader } from './LoginHeader';
import { LoginEmailInput } from './LoginEmailInput';
import { LoginPasswordInput } from './LoginPasswordInput';
import { LoginButton } from './LoginButton';
import { LoginFooter } from './LoginFooter';
import { useLogin } from '../../../features/auth/hooks/useLogin';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isLoading } = useLogin();
  const router = useRouter();

  const handleLogin = () => {
    login({ email, password }, {
      onSuccess: () => router.replace('/tabs'),
      onError: (err: any) => alert(err.message),
    });
  };

  return (
    <Card>
      <LoginHeader />
      <LoginEmailInput value={email} onChangeText={setEmail} />
      <LoginPasswordInput value={password} onChangeText={setPassword} />
      <LoginButton onPress={handleLogin} loading={isLoading} />
      <LoginFooter />
    </Card>
  );
};
