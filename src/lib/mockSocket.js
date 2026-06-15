/**
 * In-browser mock Socket.io server for offline / demo mode.
 * Mirrors the event contract from promatch_build_prompt.md.
 */

const AUTO_REPLIES = {
  'sarah-chen': [
    'That sounds great — let me check my calendar.',
    'Happy to review your deck this week.',
    'Want to hop on a quick call next week?',
  ],
  'raj-patel': [
    'Interesting approach. What stack are you using?',
    'I can intro you to someone on our team.',
    'Send me a link to the repo when ready.',
  ],
  'mei-lin': [
    'Love the energy. Let us sync on scope.',
    'I have bandwidth for a short advisory session.',
  ],
  'ethan-cho': [
    'Could we talk about a co-founder profile?',
    'Your product direction feels strong.',
  ],
  'priya-khan': [
    'Let us block 30 minutes to walk through this.',
    'I will share notes after our call.',
  ],
  'nora-khan': [
    'This aligns well with what we are building.',
    'Happy to collaborate on the next sprint.',
  ],
};

const ONLINE_USERS = [
  'sarah-chen',
  'raj-patel',
  'ethan-cho',
  'mei-lin',
  'nora-khan',
  'priya-khan',
];

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function pickReply(conversationId) {
  const pool = AUTO_REPLIES[conversationId] || [
    'Got it — thanks for reaching out!',
    'Let me get back to you shortly.',
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function createMockSocket() {
  /** @type {Map<string, Set<Function>>} */
  const handlers = new Map();
  const rooms = new Set();
  const typingTimers = new Map();
  const replyTimers = new Map();
  let connected = false;
  let connectTimer = null;
  let presenceTimer = null;

  const emitLocal = (event, payload) => {
    const set = handlers.get(event);
    if (!set) return;
    set.forEach((handler) => {
      try {
        handler(payload);
      } catch (error) {
        console.error(`[mock-socket] handler error (${event})`, error);
      }
    });
  };

  const scheduleReply = (conversationId, sentMessageId) => {
    if (replyTimers.has(conversationId)) {
      clearTimeout(replyTimers.get(conversationId));
    }

    const typingDelay = 900 + Math.random() * 800;
    const replyDelay = typingDelay + 1200 + Math.random() * 1400;

    const typingTimer = window.setTimeout(() => {
      emitLocal('user_typing', { userId: conversationId, conversationId });
    }, typingDelay);

    const replyTimer = window.setTimeout(() => {
      typingTimers.delete(conversationId);
      const messageId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const reply = pickReply(conversationId);

      emitLocal('receive_message', {
        messageId,
        conversationId,
        senderId: conversationId,
        content: reply,
        createdAt: new Date().toISOString(),
        read: rooms.has(conversationId),
      });

      if (!rooms.has(conversationId)) {
        emitLocal('notification', {
          type: 'message',
          payload: {
            conversationId,
            senderId: conversationId,
            title: 'New message',
            message: reply,
            link: `/student/messages/${conversationId}`,
          },
        });
      }

      window.setTimeout(() => {
        emitLocal('message_read_ack', {
          messageId: `read-${sentMessageId}`,
          conversationId,
          targetMessageId: sentMessageId,
          readerId: conversationId,
        });
      }, 600);
    }, replyDelay);

    replyTimers.set(conversationId, replyTimer);
    typingTimers.set(conversationId, typingTimer);
  };

  const broadcastPresence = () => {
    ONLINE_USERS.forEach((userId) => {
      const status = Math.random() > 0.15 ? 'online' : 'offline';
      emitLocal('presence_update', { userId, status });
    });
  };

  const socket = {
    id: `mock-${Math.random().toString(36).slice(2, 9)}`,
    connected: false,
    io: { engine: { transport: { name: 'mock' } } },

    connect() {
      if (connected) return socket;
      connectTimer = window.setTimeout(() => {
        connected = true;
        socket.connected = true;
        emitLocal('connect', undefined);
        broadcastPresence();
        presenceTimer = window.setInterval(broadcastPresence, 28000);
      }, 120);
      return socket;
    },

    disconnect() {
      if (connectTimer) window.clearTimeout(connectTimer);
      if (presenceTimer) window.clearInterval(presenceTimer);
      replyTimers.forEach((timer) => window.clearTimeout(timer));
      typingTimers.forEach((timer) => window.clearTimeout(timer));
      replyTimers.clear();
      typingTimers.clear();
      connected = false;
      socket.connected = false;
      rooms.clear();
      emitLocal('disconnect', undefined);
      return socket;
    },

    on(event, handler) {
      if (!handlers.has(event)) handlers.set(event, new Set());
      handlers.get(event).add(handler);
      return socket;
    },

    off(event, handler) {
      const set = handlers.get(event);
      if (!set) return socket;
      if (handler) set.delete(handler);
      else set.clear();
      return socket;
    },

    emit(event, payload) {
      switch (event) {
        case 'join_room':
          if (payload?.conversationId) rooms.add(payload.conversationId);
          break;

        case 'leave_room':
          if (payload?.conversationId) rooms.delete(payload.conversationId);
          break;

        case 'send_message': {
          const { conversationId, content } = payload || {};
          if (!conversationId || !content?.trim()) break;

          const messageId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
          emitLocal('receive_message', {
            messageId,
            conversationId,
            senderId: 'me',
            content: content.trim(),
            createdAt: new Date().toISOString(),
            read: true,
          });

          scheduleReply(conversationId, messageId);
          break;
        }

        case 'typing_start': {
          const { conversationId } = payload || {};
          if (!conversationId) break;
          emitLocal('user_typing', { userId: conversationId, conversationId });
          break;
        }

        case 'typing_stop': {
          const { conversationId } = payload || {};
          if (!conversationId) break;
          emitLocal('typing_stopped', { userId: conversationId, conversationId });
          break;
        }

        case 'message_read': {
          const { messageId, conversationId } = payload || {};
          if (!messageId) break;
          window.setTimeout(() => {
            emitLocal('message_read_ack', {
              messageId: `read-${messageId}`,
              conversationId,
              targetMessageId: messageId,
              readerId: conversationId,
            });
          }, 350);
          break;
        }

        default:
          break;
      }

      return socket;
    },
  };

  return socket;
}

export { formatTime, AUTO_REPLIES, ONLINE_USERS };
