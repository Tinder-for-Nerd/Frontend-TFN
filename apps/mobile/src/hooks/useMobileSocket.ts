import { useEffect, useMemo, useState } from 'react';
import Constants from 'expo-constants';
import {
  bindSocketToStores,
  getSharedSocket,
  SOCKET_EVENTS,
} from '../../../../packages/shared/src/socket/index.js';
import {
  useChatStore,
  useNotificationStore,
  useUserStore,
} from '../../../../packages/shared/src/stores/index.js';

export function useMobileSocket() {
  const token = useUserStore((state) => state.token);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketUrl = Constants.expoConfig?.extra?.socketUrl;
    const socket = getSharedSocket({
      url: typeof socketUrl === 'string' ? socketUrl : undefined,
      token,
    });

    bindSocketToStores(socket, {
      chat: useChatStore.getState(),
      notifications: useNotificationStore.getState(),
    });

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    socket.on?.('connect', handleConnect);
    socket.on?.('disconnect', handleDisconnect);
    socket.connect?.();

    if (socket.connected) handleConnect();

    return () => {
      socket.off?.('connect', handleConnect);
      socket.off?.('disconnect', handleDisconnect);
    };
  }, [token]);

  return useMemo(
    () => ({
      connected,
      events: SOCKET_EVENTS,
      emit: getSharedSocket().emit?.bind(getSharedSocket()),
    }),
    [connected],
  );
}
