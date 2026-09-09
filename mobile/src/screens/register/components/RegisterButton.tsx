import React from 'react';
import { Button } from '../../../components/ui/Button';

export const RegisterButton = ({ onPress, loading }) => (
  <Button title="Create Account" onPress={onPress} loading={loading} />
);
