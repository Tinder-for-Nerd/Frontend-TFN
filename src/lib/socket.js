/**
 * Singleton Socket.io client.
 * Uses VITE_SOCKET_URL when set; otherwise falls back to the in-browser mock engine.
 */

import { io } from 'socket.io-client';
import { createMockSocket } from './mockSocket';
import { SOCKET_EVENTS } from '../../packages/shared/src/socket/index.js';

/** @typedef {'connecting' | 'connected' | 'disconnected' | 'mock'} SocketMode */

let socketInstance = null;
/** @type {SocketMode} */
let socketMode = 'disconnected';

/**
 * @returns {boolean}
 */
export function isMockSocket() {
  return socketMode === 'mock';
}

/**
 * @returns {SocketMode}
 */
export function getSocketMode() {
  return socketMode;
}

/**
 * @returns {import('socket.io-client').Socket | ReturnType<typeof createMockSocket>}
 */
export function getSocket() {
  if (socketInstance) return socketInstance;

  const url = import.meta.env.VITE_SOCKET_URL;

  if (url) {
    socketInstance = io(url, {
      autoConnect: false,
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 8,
      reconnectionDelay: 1200,
    });
    socketMode = 'connecting';
  } else {
    socketInstance = createMockSocket();
    socketMode = 'mock';
  }

  return socketInstance;
}

/**
 * @returns {import('socket.io-client').Socket | ReturnType<typeof createMockSocket>}
 */
export function connectSocket() {
  const socket = getSocket();

  if (!socket.connected) {
    if (socketMode === 'mock') {
      socketMode = 'mock';
    } else {
      socketMode = 'connecting';
    }
    socket.connect();
  }

  return socket;
}

export function disconnectSocket() {
  if (!socketInstance) return;

  if (socketInstance.connected) {
    socketInstance.disconnect();
  }

  socketMode = 'disconnected';
}

export function resetSocket() {
  disconnectSocket();
  socketInstance = null;
  socketMode = 'disconnected';
}

export { SOCKET_EVENTS };
