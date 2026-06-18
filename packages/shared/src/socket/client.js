import { io } from 'socket.io-client';
import { SOCKET_EVENTS } from './events.js';

let socket;

export function getSharedSocket(options = {}) {
  if (socket) return socket;

  const url = options.url || '';
  if (!url) {
    socket = {
      connected: true,
      connect() {},
      disconnect() {},
      emit() {},
      on() {},
      off() {},
    };
    return socket;
  }

  socket = io(url, {
    autoConnect: false,
    transports: ['websocket', 'polling'],
    withCredentials: true,
    auth: options.token ? { token: options.token } : undefined,
  });

  return socket;
}

export function bindSocketToStores(socketClient, stores = {}) {
  socketClient.on?.(SOCKET_EVENTS.NOTIFICATION, ({ payload, type }) => {
    stores.notifications?.pushNotification?.({
      type,
      title: payload?.title || 'Notification',
      message: payload?.message || '',
      link: payload?.link,
    });
  });

  socketClient.on?.(SOCKET_EVENTS.PRESENCE_UPDATE, ({ userId, status }) => {
    if (userId) stores.chat?.setPresence?.(userId, status);
  });

  socketClient.on?.(SOCKET_EVENTS.USER_TYPING, ({ conversationId, userId }) => {
    if (conversationId && userId) stores.chat?.setTyping?.(conversationId, userId, true);
  });

  socketClient.on?.(SOCKET_EVENTS.TYPING_STOPPED, ({ conversationId, userId }) => {
    if (conversationId && userId) stores.chat?.setTyping?.(conversationId, userId, false);
  });

  socketClient.on?.(SOCKET_EVENTS.MESSAGE_READ_ACK, ({ conversationId, userId, messageId }) => {
    if (conversationId && userId && messageId) {
      stores.chat?.setReadReceipt?.(conversationId, userId, messageId);
    }
  });
}
