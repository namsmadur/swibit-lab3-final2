import React from 'react';
import { Button } from '../../../components/ui/Button';

interface TaskFormCancelButtonProps {
  onPress: () => void;
}

export const TaskFormCancelButton: React.FC<TaskFormCancelButtonProps> = ({
  onPress,
}) => (
  <Button title="Cancel" variant="outline" onPress={onPress} />
);
