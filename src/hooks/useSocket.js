import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SocketContext } from '../context/SocketProvider';
import {
  connectSocket,
  disconnectSocket,
  getSocket,
  getSocketMode,
  isMockSocket,
  SOCKET_EVENTS,
} from '../lib/socket';

/**
 * Low-level socket hook — connection lifecycle + typed emit/on helpers.
 * Prefer SocketContext for notifications/presence; use this for custom listeners.
 */
export function useSocket(options = {}) {
  const { autoConnect = true } = options;
  const context = useContext(SocketContext);
  const [status, setStatus] = useState(() => getSocketMode());

  useEffect(() => {
    if (!autoConnect) return undefined;

    const socket = connectSocket();

    const handleConnect = () => setStatus(isMockSocket() ? 'mock' : 'connected');
    const handleDisconnect = () => setStatus('disconnected');
    const handleConnectError = () => {
      if (!isMockSocket()) setStatus('disconnected');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
    };
  }, [autoConnect]);

  const emit = useCallback((event, payload) => {
    getSocket().emit(event, payload);
  }, []);

  const on = useCallback((event, handler) => {
    getSocket().on(event, handler);
    return () => getSocket().off(event, handler);
  }, []);

  const off = useCallback((event, handler) => {
    getSocket().off(event, handler);
  }, []);

  return useMemo(
    () => ({
      socket: getSocket(),
      status: context?.status ?? status,
      isConnected: context?.isConnected ?? (status === 'connected' || status === 'mock'),
      isMock: isMockSocket(),
      emit,
      on,
      off,
      connect: connectSocket,
      disconnect: disconnectSocket,
      events: SOCKET_EVENTS,
    }),
    [context?.status, context?.isConnected, emit, off, on, status],
  );
}
