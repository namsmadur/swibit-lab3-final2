import React from 'react';
import { Button } from '../../../components/ui/Button';

interface TaskFormSubmitButtonProps {
  onPress: () => void;
  label?: string;
  loading?: boolean;
}

export const TaskFormSubmitButton: React.FC<TaskFormSubmitButtonProps> = ({
  onPress,
  label = 'Create Task',
  loading = false,
}) => (
  <Button title={label} onPress={onPress} loading={loading} />
);
