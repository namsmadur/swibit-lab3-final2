import React from 'react';
import { Input } from '../../../components/ui/Input';

export const RegisterConfirmPasswordInput = ({ value, onChangeText }) => (
  <Input
    label="Confirm Password"
    placeholder="•••••••••"
    value={value}
    onChangeText={onChangeText}
    secureTextEntry
    leftIcon="🔒"
  />
);
