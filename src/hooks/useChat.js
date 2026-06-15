import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { studentThreads, proThreads, profiles } from '../data/mockData';
import { useSocketContext } from '../context/SocketProvider';
import { getSocket } from '../lib/socket';
import { formatTime } from '../lib/mockSocket';

function cloneThreads(threads) {
  return threads.map((thread) => ({
    ...thread,
    person: { ...thread.person },
    messages: (thread.messages || []).map((msg) => ({ ...msg, read: msg.read ?? false })),
  }));
}

function mapIncomingMessage(payload, currentUserId = 'me') {
  const isMine = payload.senderId === currentUserId || payload.senderId === 'me';
  return {
    id: payload.messageId,
    from: isMine ? 'me' : 'them',
    body: payload.content,
    time: formatTime(new Date(payload.createdAt || Date.now())),
    read: Boolean(payload.read),
  };
}

function getParticipantId(thread) {
  return thread.person?.id || thread.person?.username || thread.id;
}

export function useChat({ variant = 'student' } = {}) {
  const { threadId } = useParams();
  const {
    events,
    setActiveRoom,
    getPresenceLabel,
    isUserOnline,
    pushNotification,
  } = useSocketContext();

  const seedThreads = variant === 'pro' ? proThreads : studentThreads;
  const [threads, setThreads] = useState(() => cloneThreads(seedThreads));
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [typingByRoom, setTypingByRoom] = useState({});
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const joinedRoomRef = useRef(null);
  const activeThreadIdRef = useRef(activeThreadId);

  useEffect(() => {
    activeThreadIdRef.current = activeThreadId;
  }, [activeThreadId]);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || null,
    [threads, activeThreadId],
  );

  const upsertMessage = useCallback((conversationId, message) => {
    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== conversationId) return thread;
        const exists = thread.messages.some((item) => item.id === message.id);
        const messages = exists
          ? thread.messages.map((item) => (item.id === message.id ? { ...item, ...message } : item))
          : [...(thread.messages || []), message];

        return {
          ...thread,
          last: message.body,
          time: 'Now',
          unread:
            message.from === 'them' && activeThreadIdRef.current !== conversationId
              ? (thread.unread || 0) + 1
              : thread.unread,
          messages,
        };
      }),
    );
  }, []);

  const markMessagesRead = useCallback(
    (conversationId) => {
      const socket = getSocket();

      setThreads((prev) => {
        const thread = prev.find((item) => item.id === conversationId);
        if (!thread) return prev;

        thread.messages?.forEach((msg) => {
          if (msg.from === 'them' && !msg.read) {
            socket.emit(events.MESSAGE_READ, { messageId: msg.id, conversationId });
          }
        });

        return prev.map((item) => {
          if (item.id !== conversationId) return item;
          return {
            ...item,
            unread: 0,
            messages: item.messages.map((msg) =>
              msg.from === 'them' ? { ...msg, read: true } : msg,
            ),
          };
        });
      });
    },
    [events.MESSAGE_READ],
  );

  useEffect(() => {
    if (!threadId) {
      setActiveThreadId((current) => current || seedThreads[0]?.id || null);
      return;
    }

    setThreads((prev) => {
      if (prev.some((thread) => thread.id === threadId)) return prev;

      const profileMatch = Object.values(profiles).find(
        (profile) => profile.id === threadId || profile.username === threadId,
      );

      if (!profileMatch) return prev;

      return [
        {
          id: threadId,
          person: {
            id: profileMatch.id,
            username: profileMatch.username,
            name: profileMatch.name,
            avatar_url: profileMatch.src || profileMatch.avatar_url,
            avatar: profileMatch.avatar,
            tone: profileMatch.tone,
          },
          status: 'Online',
          unread: 0,
          last: 'Start a new conversation',
          time: 'Now',
          messages: [],
        },
        ...prev,
      ];
    });

    setActiveThreadId(threadId);
  }, [threadId, seedThreads]);

  useEffect(() => {
    const socket = getSocket();

    const handleReceive = (payload) => {
      if (!payload?.conversationId) return;
      const message = mapIncomingMessage(payload);
      upsertMessage(payload.conversationId, message);

      if (payload.conversationId === activeThreadId && message.from === 'them') {
        markMessagesRead(payload.conversationId);
      }
    };

    const handleTyping = ({ userId, conversationId }) => {
      if (!conversationId) return;
      setTypingByRoom((prev) => ({ ...prev, [conversationId]: userId }));

      window.setTimeout(() => {
        setTypingByRoom((prev) => {
          if (prev[conversationId] !== userId) return prev;
          const next = { ...prev };
          delete next[conversationId];
          return next;
        });
      }, 3200);
    };

    const handleTypingStopped = ({ conversationId }) => {
      if (!conversationId) return;
      setTypingByRoom((prev) => {
        if (!prev[conversationId]) return prev;
        const next = { ...prev };
        delete next[conversationId];
        return next;
      });
    };

    const handleReadAck = ({ targetMessageId }) => {
      if (!targetMessageId) return;
      setThreads((prev) =>
        prev.map((thread) => ({
          ...thread,
          messages: thread.messages.map((msg) =>
            msg.id === targetMessageId ? { ...msg, read: true } : msg,
          ),
        })),
      );
    };

    socket.on(events.RECEIVE_MESSAGE, handleReceive);
    socket.on(events.USER_TYPING, handleTyping);
    socket.on(events.TYPING_STOPPED, handleTypingStopped);
    socket.on(events.MESSAGE_READ_ACK, handleReadAck);

    return () => {
      socket.off(events.RECEIVE_MESSAGE, handleReceive);
      socket.off(events.USER_TYPING, handleTyping);
      socket.off(events.TYPING_STOPPED, handleTypingStopped);
      socket.off(events.MESSAGE_READ_ACK, handleReadAck);
    };
  }, [activeThreadId, events, markMessagesRead, upsertMessage]);

  useEffect(() => {
    const socket = getSocket();
    const roomId = activeThreadId;

    if (joinedRoomRef.current && joinedRoomRef.current !== roomId) {
      socket.emit(events.LEAVE_ROOM, { conversationId: joinedRoomRef.current });
    }

    if (!roomId) {
      setActiveRoom(null);
      joinedRoomRef.current = null;
      return undefined;
    }

    socket.emit(events.JOIN_ROOM, { conversationId: roomId });
    setActiveRoom(roomId);
    joinedRoomRef.current = roomId;
    markMessagesRead(roomId);

    return () => {
      if (joinedRoomRef.current === roomId) {
        socket.emit(events.LEAVE_ROOM, { conversationId: roomId });
        joinedRoomRef.current = null;
      }
    };
  }, [activeThreadId, events, markMessagesRead, setActiveRoom]);

  const sendMessage = useCallback(
    (body) => {
      const trimmed = body?.trim();
      if (!trimmed || !activeThreadId) return false;

      getSocket().emit(events.SEND_MESSAGE, {
        conversationId: activeThreadId,
        content: trimmed,
      });

      stopTyping();
      return true;
    },
    [activeThreadId, events.SEND_MESSAGE],
  );

  const stopTyping = useCallback(() => {
    if (!activeThreadId || !isTypingRef.current) return;
    isTypingRef.current = false;
    getSocket().emit(events.TYPING_STOP, { conversationId: activeThreadId });
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, [activeThreadId, events.TYPING_STOP]);

  const handleTyping = useCallback(() => {
    if (!activeThreadId) return;

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      getSocket().emit(events.TYPING_START, { conversationId: activeThreadId });
    }

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      stopTyping();
    }, 2000);
  }, [activeThreadId, events.TYPING_START, stopTyping]);

  const getThreadStatus = useCallback(
    (thread) => {
      const participantId = getParticipantId(thread);
      const isTyping = Boolean(typingByRoom[thread.id]);
      return getPresenceLabel(participantId, isTyping);
    },
    [getPresenceLabel, typingByRoom],
  );

  const isThreadOnline = useCallback(
    (thread) => isUserOnline(getParticipantId(thread)),
    [isUserOnline],
  );

  const isThreadTyping = useCallback(
    (threadIdValue) => Boolean(typingByRoom[threadIdValue]),
    [typingByRoom],
  );

  return {
    threads,
    activeThread,
    activeThreadId,
    setActiveThreadId,
    sendMessage,
    handleTyping,
    stopTyping,
    getThreadStatus,
    isThreadOnline,
    isThreadTyping,
    markMessagesRead,
    pushNotification,
  };
}
