import React from 'react';
import { Button } from '../../../components/ui/Button';

interface LoginButtonProps {
  onPress: () => void;
  loading?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ onPress, loading }) => (
  <Button title="Sign In" onPress={onPress} loading={loading} />
);
