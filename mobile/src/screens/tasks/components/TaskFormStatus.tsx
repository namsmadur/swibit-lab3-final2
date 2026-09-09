import React from 'react';
import { Input } from '../../../components/ui/Input';

interface TaskFormStatusProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const TaskFormStatus: React.FC<TaskFormStatusProps> = ({
  value,
  onChangeText,
}) => (
  <Input
    placeholder="Status (pending, in_progress, completed)"
    value={value}
    onChangeText={onChangeText}
    style={{ marginBottom: 16 }}
  />
);
