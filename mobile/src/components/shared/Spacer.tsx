import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  size?: 'small' | 'medium' | 'large';
}

export const Spacer: React.FC<SpacerProps> = ({ size = 'medium' }) => {
  const height = size === 'small' ? 6 : size === 'large' ? 18 : 12;
  return <View style={{ height }} />;
};
