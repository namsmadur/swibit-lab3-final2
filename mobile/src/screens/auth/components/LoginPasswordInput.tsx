import React from 'react';
import { Input } from '../../../components/ui/Input';

interface LoginPasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const LoginPasswordInput: React.FC<LoginPasswordInputProps> = ({ value, onChangeText }) => (
  <Input
    label="Password"
    placeholder="•••••••••"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry
    leftIcon="🔒"
  />
);
