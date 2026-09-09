import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Card } from '../../../components/ui/Card';
import { RegisterHeader } from './RegisterHeader';
import { RegisterEmailInput } from './RegisterEmailInput';
import { RegisterPasswordInput } from './RegisterPasswordInput';
import { RegisterConfirmPasswordInput } from './RegisterConfirmPasswordInput';
import { RegisterButton } from './RegisterButton';
import { RegisterFooter } from './RegisterFooter';
import { useRegister } from '../../../features/auth/hooks/useRegister';

export const RegisterForm = () => {
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
    <Card>
      <RegisterHeader />
      <RegisterEmailInput value={email} onChangeText={setEmail} />
      <RegisterPasswordInput value={password} onChangeText={setPassword} />
      <RegisterConfirmPasswordInput value={confirmPassword} onChangeText={setConfirmPassword} />
      <RegisterButton onPress={handleRegister} loading={isLoading} />
      <RegisterFooter />
    </Card>
  );
};
