import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client.js';
import { queryKeys } from './keys.js';

export function useCurrentUserQuery(api = apiClient) {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => api.auth.me(),
  });
}

export function useDiscoveryProfilesQuery(filters = {}, api = apiClient) {
  return useQuery({
    queryKey: queryKeys.discovery(filters),
    queryFn: () => api.discovery.profiles(filters),
  });
}

export function useProjectsQuery(api = apiClient) {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => api.projects.list(),
  });
}

export function useCreateProjectMutation(api = apiClient) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => api.projects.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
  });
}

export function useConversationsQuery(api = apiClient) {
  return useQuery({
    queryKey: queryKeys.conversations,
    queryFn: () => api.chat.conversations(),
  });
}

export function useMessagesQuery(conversationId, api = apiClient) {
  return useQuery({
    queryKey: queryKeys.messages(conversationId),
    queryFn: () => api.chat.messages(conversationId),
    enabled: Boolean(conversationId),
  });
}

export function useSendMessageMutation(conversationId, api = apiClient) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (text) => api.chat.send(conversationId, text),
    onSuccess: (message) => {
      queryClient.setQueryData(queryKeys.messages(conversationId), (existing = []) => [
        ...existing,
        message,
      ]);
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
    },
  });
}

export function useNotificationsQuery(api = apiClient) {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => api.notifications.list(),
  });
}

export function useRegisterDeviceMutation(api = apiClient) {
  return useMutation({
    mutationFn: (payload) => api.notifications.registerDevice(payload),
  });
}

export function useBillingPlanQuery(api = apiClient) {
  return useQuery({
    queryKey: queryKeys.billingPlan,
    queryFn: () => api.billing.plan(),
  });
}

export function useCheckoutMutation(api = apiClient) {
  return useMutation({
    mutationFn: (payload) => api.billing.checkout(payload),
  });
}

export function useAnalyticsSummaryQuery(api = apiClient) {
  return useQuery({
    queryKey: queryKeys.analyticsSummary,
    queryFn: () => api.analytics.summary(),
  });
}
