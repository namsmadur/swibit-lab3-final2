import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../components/ui/Card';

export const TaskFormContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Card style={styles.container}>{children}</Card>;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(124,58,237,0.06)',
  },
});
