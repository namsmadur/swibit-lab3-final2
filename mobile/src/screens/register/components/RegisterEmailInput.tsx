import React from 'react';
import { Input } from '../../../components/ui/Input';

export const RegisterEmailInput = ({ value, onChangeText }) => (
  <Input
    label="Email"
    placeholder="you@example.com"
    value={value}
    onChangeText={onChangeText}
    autoCapitalize="none"
    leftIcon="✉️"
  />
);
