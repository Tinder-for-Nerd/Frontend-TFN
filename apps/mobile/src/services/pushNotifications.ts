import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { apiClient } from '../../../../packages/shared/src/api/index.js';
import { useNotificationStore } from '../../../../packages/shared/src/stores/index.js';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
});

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    return null;
  }

  const current = await Notifications.getPermissionsAsync();
  let finalStatus = current.status;

  if (current.status !== 'granted') {
    const requested = await Notifications.requestPermissionsAsync();
    finalStatus = requested.status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ||
    Constants.easConfig?.projectId;

  const token = await Notifications.getExpoPushTokenAsync(
    projectId ? { projectId } : undefined,
  );

  useNotificationStore.getState().setDeviceToken(token.data);
  await apiClient.notifications.registerDevice({
    token: token.data,
    platform: Device.osName || 'unknown',
    provider: 'expo',
  });

  return token.data;
}
