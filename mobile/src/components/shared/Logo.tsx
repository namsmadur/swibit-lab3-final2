import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const fontSize = size === 'small' ? 20 : size === 'large' ? 34 : 26;
  return <Text style={[styles.logo, { fontSize }]}>TaskFlow</Text>;
};

const styles = StyleSheet.create({
  logo: { fontWeight: '800', color: '#7c3aed', letterSpacing: -0.5, textAlign: 'center' },
});
