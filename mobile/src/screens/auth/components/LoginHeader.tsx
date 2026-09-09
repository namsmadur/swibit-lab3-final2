import React from 'react';
import { View } from 'react-native';
import { Logo } from '../../../components/ui/Logo';
import { Heading } from '../../../components/ui/Heading';
import { Subtitle } from '../../../components/ui/Subtitle';
import { Spacer } from '../../../components/ui/Spacer';

export const LoginHeader = () => (
  <View style={{ alignItems: 'center', marginBottom: 16 }}>
    <Logo />
    <Spacer size="small" />
    <Heading>Welcome Back! 🎉</Heading>
    <Subtitle>Sign in to continue and get things done</Subtitle>
  </View>
);
