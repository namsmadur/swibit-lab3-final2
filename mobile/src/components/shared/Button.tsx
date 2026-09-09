import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
}) => {
  const getBackground = () => {
    if (disabled) return '#d1d5db';
    if (variant === 'primary') return '#7c3aed';
    if (variant === 'secondary') return '#3b82f6';
    if (variant === 'danger') return '#dc2626';
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return '#9ca3af';
    if (variant === 'outline') return '#4b5563';
    return '#fff';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackground(), width: fullWidth ? '100%' : 'auto' },
        variant === 'outline' && styles.outline,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#e5e7eb' },
  text: { fontSize: 15, fontWeight: '700' },
});
