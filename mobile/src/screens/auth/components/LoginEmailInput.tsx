import React from 'react';
import { Input } from '../../../components/ui/Input';

interface LoginEmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const LoginEmailInput: React.FC<LoginEmailInputProps> = ({ value, onChangeText }) => (
  <Input
    label="Email"
    placeholder="you@example.com"
    value={value}
    onChangeText={onChangeText}
    autoCapitalize="none"
    leftIcon="✉️"
  />
);
