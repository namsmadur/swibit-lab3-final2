import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, leftIcon, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {leftIcon && <Text style={styles.icon}>{leftIcon}</Text>}
        <TextInput style={styles.input} placeholderTextColor="#9ca3af" {...props} />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: { fontSize: 14, fontWeight: '600', color: '#1f2937', marginBottom: 4 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    paddingHorizontal: 14,
  },
  input: { flex: 1, paddingVertical: 11, fontSize: 15, color: '#1f2937' },
  icon: { marginRight: 8, fontSize: 18 },
  inputError: { borderColor: '#dc2626' },
  errorText: { marginTop: 2, fontSize: 12, color: '#dc2626' },
});
