import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface HeadingProps {
  children: string;
  style?: TextStyle;
}

export const Heading: React.FC<HeadingProps> = ({ children, style }) => {
  return <Text style={[styles.heading, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading: { fontSize: 20, fontWeight: '700', color: '#1f2937', textAlign: 'center' },
});
