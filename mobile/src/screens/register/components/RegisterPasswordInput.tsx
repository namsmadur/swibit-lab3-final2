import React from 'react';
import { Input } from '../../../components/ui/Input';

export const RegisterPasswordInput = ({ value, onChangeText }) => (
  <Input
    label="Password"
    placeholder="•••••••••"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry
    leftIcon="🔒"
  />
);
