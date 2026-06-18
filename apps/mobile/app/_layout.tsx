import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createPromatchQueryClient } from '../../../packages/shared/src/query/index.js';
import { useUserStore } from '../../../packages/shared/src/stores/index.js';
import { useMobileSocket } from '../src/hooks/useMobileSocket';
import { getToken } from '../src/services/tokenStorage';
import '../src/styles/global.css';

export default function RootLayout() {
  const [queryClient] = useState(() => createPromatchQueryClient());
  const setToken = useUserStore((state) => state.setToken);
  useMobileSocket();

  useEffect(() => {
    getToken().then((token) => {
      if (token) setToken(token);
    });
  }, [setToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
