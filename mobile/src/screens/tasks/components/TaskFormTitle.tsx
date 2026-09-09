import React from 'react';
import { Input } from '../../../components/ui/Input';

interface TaskFormTitleProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const TaskFormTitle: React.FC<TaskFormTitleProps> = ({
  value,
  onChangeText,
  placeholder = 'Task Title *',
}) => (
  <Input
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    style={{ marginBottom: 12 }}
  />
);
