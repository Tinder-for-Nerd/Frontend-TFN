import {
  mockConversations,
  mockMessages,
  mockNotifications,
  mockProfiles,
  mockProjects,
  mockUser,
} from './mockData.js';

const delay = (value, ms = 120) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });

export function createApiClient(options = {}) {
  const baseUrl = options.baseUrl || '';

  async function request(path, init = {}) {
    if (!baseUrl) {
      throw new Error('No API base URL configured');
    }

    const response = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.getToken?.() ? { Authorization: `Bearer ${options.getToken()}` } : {}),
        ...init.headers,
      },
      ...init,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  }

  const mock = {
    auth: {
      me: () => delay(mockUser),
      login: (payload) => delay({ ...mockUser, ...payload, token: 'mock.jwt.token' }),
      signup: (payload) => delay({ ...mockUser, ...payload, token: 'mock.jwt.token' }),
    },
    discovery: {
      profiles: (filters = {}) =>
        delay(
          mockProfiles.filter((profile) => {
            const haystack = [
              profile.name,
              profile.title,
              profile.location,
              profile.availability,
              ...profile.skills,
            ]
              .join(' ')
              .toLowerCase();
            return Object.values(filters).every((value) => !value || haystack.includes(String(value).toLowerCase()));
          }),
        ),
    },
    projects: {
      list: () => delay(mockProjects),
      create: (payload) => delay({ id: `project-${Date.now()}`, status: 'draft', ...payload }),
    },
    chat: {
      conversations: () => delay(mockConversations),
      messages: (conversationId) => delay(mockMessages[conversationId] || []),
      send: (conversationId, text) =>
        delay({
          id: `msg-${Date.now()}`,
          conversationId,
          senderId: 'me',
          text,
          createdAt: new Date().toISOString(),
          read: false,
        }),
    },
    notifications: {
      list: () => delay(mockNotifications),
      registerDevice: (payload) => delay({ ok: true, ...payload }),
    },
    billing: {
      plan: () => delay({ plan: 'free', gatedFeatures: ['advanced-analytics', 'priority-matches'] }),
      checkout: (payload) =>
        delay({
          checkoutUrl: payload?.successUrl || '/billing/checkout?mock=success',
          provider: 'mock',
        }),
    },
    analytics: {
      summary: () =>
        delay({
          matchQuality: [
            { label: 'Mon', value: 72 },
            { label: 'Tue', value: 78 },
            { label: 'Wed', value: 84 },
            { label: 'Thu', value: 88 },
          ],
          responseRate: 64,
          skillDemand: [
            { skill: 'React', demand: 92 },
            { skill: 'AI', demand: 86 },
            { skill: 'Design', demand: 74 },
          ],
        }),
    },
  };

  return {
    request,
    auth: baseUrl
      ? {
          me: () => request('/auth/me'),
          login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
          signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
        }
      : mock.auth,
    discovery: baseUrl ? { profiles: (filters) => request(`/discovery?${new URLSearchParams(filters)}`) } : mock.discovery,
    projects: baseUrl
      ? {
          list: () => request('/projects'),
          create: (payload) => request('/projects', { method: 'POST', body: JSON.stringify(payload) }),
        }
      : mock.projects,
    chat: baseUrl
      ? {
          conversations: () => request('/chat/conversations'),
          messages: (id) => request(`/chat/conversations/${id}/messages`),
          send: (id, text) => request(`/chat/conversations/${id}/messages`, { method: 'POST', body: JSON.stringify({ text }) }),
        }
      : mock.chat,
    notifications: baseUrl
      ? {
          list: () => request('/notifications'),
          registerDevice: (payload) => request('/notifications/devices', { method: 'POST', body: JSON.stringify(payload) }),
        }
      : mock.notifications,
    billing: baseUrl
      ? {
          plan: () => request('/billing/plan'),
          checkout: (payload) => request('/billing/checkout', { method: 'POST', body: JSON.stringify(payload) }),
        }
      : mock.billing,
    analytics: baseUrl ? { summary: () => request('/analytics/summary') } : mock.analytics,
  };
}

export const apiClient = createApiClient();
