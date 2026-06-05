import { create } from 'zustand';
import type { Conversation, Message } from '../types';
import { mockConversations, mockMessages } from '../data/mockData';
import { generateId } from '../lib/utils';

interface MessageState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  setActiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
  getConversation: (userId: string) => Conversation | undefined;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: mockConversations,
  messages: mockMessages,
  activeConversationId: null,

  setActiveConversation: (id) => {
    set({ activeConversationId: id });
    get().markAsRead(id);
  },

  sendMessage: (conversationId, text) => {
    const newMessage: Message = {
      id: generateId(),
      conversationId,
      senderId: 'u1',
      text,
      timestamp: new Date().toISOString(),
      read: false,
    };

    set((state) => {
      const existing = state.messages[conversationId] || [];
      return {
        messages: {
          ...state.messages,
          [conversationId]: [...existing, newMessage],
        },
        conversations: state.conversations.map((c) =>
          c.id === conversationId
            ? { ...c, lastMessage: newMessage, updatedAt: newMessage.timestamp }
            : c
        ),
      };
    });
  },

  markAsRead: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map((m) =>
          m.senderId !== 'u1' ? { ...m, read: true } : m
        ),
      },
    }));
  },

  getConversation: (userId) => {
    return get().conversations.find((c) =>
      c.participants.includes(userId)
    );
  },
}));
