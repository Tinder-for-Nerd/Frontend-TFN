import { create } from 'zustand';

export const useChatStore = create((set) => ({
  activeConversationId: null,
  typingByConversation: {},
  readReceipts: {},
  presence: {},
  setActiveConversation: (activeConversationId) => set({ activeConversationId }),
  setTyping: (conversationId, userId, isTyping) =>
    set((state) => ({
      typingByConversation: {
        ...state.typingByConversation,
        [conversationId]: {
          ...(state.typingByConversation[conversationId] || {}),
          [userId]: isTyping,
        },
      },
    })),
  setReadReceipt: (conversationId, userId, messageId) =>
    set((state) => ({
      readReceipts: {
        ...state.readReceipts,
        [conversationId]: {
          ...(state.readReceipts[conversationId] || {}),
          [userId]: messageId,
        },
      },
    })),
  setPresence: (userId, status) =>
    set((state) => ({
      presence: {
        ...state.presence,
        [userId]: status,
      },
    })),
}));
