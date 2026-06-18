import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'ProMatch',
  slug: 'promatch-mobile',
  scheme: 'promatch',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  splash: {
    backgroundColor: '#f8fafc',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.promatch.mobile',
  },
  android: {
    package: 'com.promatch.mobile',
    permissions: ['POST_NOTIFICATIONS'],
  },
  plugins: [
    'expo-router',
    'expo-secure-store',
    'expo-image-picker',
    [
      'expo-notifications',
      {
        color: '#0084ff',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || '',
    socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL || '',
    eas: {
      projectId: 'replace-with-eas-project-id',
    },
  },
};

export default config;
