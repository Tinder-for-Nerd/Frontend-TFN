export const queryKeys = {
  user: ['user'],
  discovery: (filters = {}) => ['discovery', filters],
  projects: ['projects'],
  conversations: ['chat', 'conversations'],
  messages: (conversationId) => ['chat', 'messages', conversationId],
  notifications: ['notifications'],
  billingPlan: ['billing', 'plan'],
  analyticsSummary: ['analytics', 'summary'],
};
