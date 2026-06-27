import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAuth } from './AuthContext';
import { notifications as seedNotifications } from '../data/mockData';
import {
  connectSocket,
  disconnectSocket,
  getSocket,
  getSocketMode,
  isMockSocket,
  SOCKET_EVENTS,
} from '../lib/socket';
import {
  useChatStore,
  useNotificationStore,
} from '../../packages/shared/src/stores/index.js';

export const SocketContext = createContext(null);

function normalizeSeedNotifications(items) {
  return items.map((item, index) => ({
    id: String(item.id ?? index),
    type:
      item.icon === 'messages'
        ? 'message'
        : item.icon === 'connections'
          ? 'connection'
          : item.icon === 'chart'
            ? 'profile_view'
            : item.icon === 'calendar'
              ? 'booking'
              : 'event',
    title: item.title,
    message: item.action || item.title,
    timestamp: item.meta,
    read: !item.unread,
    link:
      item.icon === 'messages'
        ? '/student/messages'
        : item.icon === 'connections'
          ? '/student/connections'
          : item.icon === 'calendar'
            ? '/student/sessions'
            : item.icon === 'chart'
              ? '/dashboard/analytics'
              : '/student/events',
  }));
}

function formatRelativeTime(iso) {
  if (!iso) return 'Now';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

export function SocketProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const pushSharedNotification = useNotificationStore((state) => state.pushNotification);
  const setSharedPresence = useChatStore((state) => state.setPresence);
  const setSharedTyping = useChatStore((state) => state.setTyping);
  const setSharedReadReceipt = useChatStore((state) => state.setReadReceipt);
  const [status, setStatus] = useState(() => getSocketMode());
  const [notifications, setNotifications] = useState(() =>
    normalizeSeedNotifications(seedNotifications.slice(0, 5)),
  );
  /** @type {[Record<string, 'online' | 'offline'>, Function]} */
  const [presence, setPresence] = useState({});
  const activeRoomRef = useRef(null);

  const setActiveRoom = useCallback((conversationId) => {
    activeRoomRef.current = conversationId;
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket();
      setStatus('disconnected');
      return undefined;
    }

    const socket = connectSocket();

    const handleConnect = () => setStatus(isMockSocket() ? 'mock' : 'connected');
    const handleDisconnect = () => setStatus('disconnected');
    const handleConnectError = () => setStatus('disconnected');

    const handlePresence = ({ userId, status: nextStatus }) => {
      if (!userId) return;
      setPresence((prev) => ({ ...prev, [userId]: nextStatus }));
      setSharedPresence(userId, nextStatus);
    };

    const handleNotification = ({ type, payload }) => {
      if (!payload) return;

      const conversationId = payload.conversationId;
      const isActiveRoom = conversationId && activeRoomRef.current === conversationId;

      if (type === 'message' && isActiveRoom && document.hasFocus()) {
        return;
      }

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          type: type || 'message',
          title: payload.title || 'Notification',
          message: payload.message || '',
          timestamp: formatRelativeTime(payload.createdAt || new Date().toISOString()),
          read: false,
          link: payload.link,
        },
        ...prev,
      ].slice(0, 50));
      pushSharedNotification({
        type: type || 'message',
        title: payload.title || 'Notification',
        message: payload.message || '',
        link: payload.link,
      });
    };

    const handleTyping = ({ conversationId, userId }) => {
      if (conversationId && userId) setSharedTyping(conversationId, userId, true);
    };

    const handleTypingStopped = ({ conversationId, userId }) => {
      if (conversationId && userId) setSharedTyping(conversationId, userId, false);
    };

    const handleReadAck = ({ conversationId, userId, messageId }) => {
      if (conversationId && userId && messageId) {
        setSharedReadReceipt(conversationId, userId, messageId);
      }
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on(SOCKET_EVENTS.PRESENCE_UPDATE, handlePresence);
    socket.on(SOCKET_EVENTS.NOTIFICATION, handleNotification);
    socket.on(SOCKET_EVENTS.USER_TYPING, handleTyping);
    socket.on(SOCKET_EVENTS.TYPING_STOPPED, handleTypingStopped);
    socket.on(SOCKET_EVENTS.MESSAGE_READ_ACK, handleReadAck);

    if (socket.connected) handleConnect();

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off(SOCKET_EVENTS.PRESENCE_UPDATE, handlePresence);
      socket.off(SOCKET_EVENTS.NOTIFICATION, handleNotification);
      socket.off(SOCKET_EVENTS.USER_TYPING, handleTyping);
      socket.off(SOCKET_EVENTS.TYPING_STOPPED, handleTypingStopped);
      socket.off(SOCKET_EVENTS.MESSAGE_READ_ACK, handleReadAck);
    };
  }, [
    isAuthenticated,
    pushSharedNotification,
    setSharedPresence,
    setSharedReadReceipt,
    setSharedTyping,
  ]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const pushNotification = useCallback((notification) => {
    setNotifications((prev) => [
      {
        id: notification.id || `notif-${Date.now()}`,
        read: false,
        timestamp: 'Now',
        ...notification,
      },
      ...prev,
    ].slice(0, 50));
  }, []);

  const getPresenceLabel = useCallback(
    (userId, isTyping = false) => {
      if (isTyping) return 'Typing…';
      const state = presence[userId];
      if (state === 'online') return 'Online';
      if (state === 'offline') return 'Offline';
      return 'Online';
    },
    [presence],
  );

  const isUserOnline = useCallback(
    (userId) => presence[userId] !== 'offline',
    [presence],
  );

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  );

  const value = useMemo(
    () => ({
      status,
      isConnected: status === 'connected' || status === 'mock',
      notifications,
      unreadCount,
      presence,
      markAsRead,
      markAllAsRead,
      clearAll,
      pushNotification,
      getPresenceLabel,
      isUserOnline,
      setActiveRoom,
      events: SOCKET_EVENTS,
    }),
    [
      status,
      notifications,
      unreadCount,
      presence,
      markAsRead,
      markAllAsRead,
      clearAll,
      pushNotification,
      getPresenceLabel,
      isUserOnline,
      setActiveRoom,
    ],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocketContext() {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error('useSocketContext must be used within SocketProvider');
  }
  return ctx;
}
