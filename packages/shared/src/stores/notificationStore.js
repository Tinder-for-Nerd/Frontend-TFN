import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  deviceToken: null,
  setNotifications: (notifications) => set({ notifications }),
  pushNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          id: notification.id || `notif-${Date.now()}`,
          read: false,
          createdAt: new Date().toISOString(),
          ...notification,
        },
        ...state.notifications,
      ].slice(0, 100),
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, read: true })),
    })),
  clearNotifications: () => set({ notifications: [] }),
  setDeviceToken: (deviceToken) => set({ deviceToken }),
}));

export const selectUnreadCount = (state) =>
  state.notifications.filter((notification) => !notification.read).length;
