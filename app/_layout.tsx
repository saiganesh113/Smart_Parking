import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Platform } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: Platform.OS === 'ios' ? 'default' : 'fade',
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="parkingDetails/[id]" />
        <Stack.Screen name="booking/[id]" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="qrCode/[id]" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}