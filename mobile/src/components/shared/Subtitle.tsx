import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface SubtitleProps {
  children: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ children }) => {
  return <Text style={styles.subtitle}>{children}</Text>;
};

const styles = StyleSheet.create({
  subtitle: { fontSize: 13, color: '#6b7280', textAlign: 'center', marginTop: 2 },
});
