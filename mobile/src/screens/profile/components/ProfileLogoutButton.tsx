import React from 'react';
import { ProfileMenuItem } from './ProfileMenuItem';

interface ProfileLogoutButtonProps {
  onPress: () => void;
}

export const ProfileLogoutButton: React.FC<ProfileLogoutButtonProps> = ({ onPress }) => (
  <ProfileMenuItem title="🚪 Logout" onPress={onPress} danger />
);
