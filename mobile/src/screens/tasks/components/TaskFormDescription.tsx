import React from 'react';
import { Input } from '../../../components/ui/Input';

interface TaskFormDescriptionProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const TaskFormDescription: React.FC<TaskFormDescriptionProps> = ({
  value,
  onChangeText,
}) => (
  <Input
    placeholder="Description"
    value={value}
    onChangeText={onChangeText}
    multiline
    style={{ height: 80, textAlignVertical: 'top', marginBottom: 12 }}
  />
);
