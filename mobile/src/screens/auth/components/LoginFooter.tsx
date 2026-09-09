import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/ui/Button';
import { Spacer } from '../../../components/ui/Spacer';

export const LoginFooter = () => {
  const router = useRouter();
  return (
    <View>
      <Spacer size="small" />
      <Button
        title="Create Account"
        variant="outline"
        onPress={() => router.push('/auth/register')}
      />
    </View>
  );
};
