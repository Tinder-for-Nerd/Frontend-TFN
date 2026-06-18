import { create } from 'zustand';

const PRO_FEATURES = new Set([
  'advanced-analytics',
  'priority-matches',
  'portfolio-analyzer',
  'unlimited-projects',
]);

export const useSubscriptionStore = create((set, get) => ({
  plan: 'free',
  gatedFeatures: Array.from(PRO_FEATURES),
  setPlan: (plan) =>
    set({
      plan,
      gatedFeatures: plan === 'pro' ? [] : Array.from(PRO_FEATURES),
    }),
  setBillingState: ({ plan = 'free', gatedFeatures = Array.from(PRO_FEATURES) }) =>
    set({ plan, gatedFeatures }),
  canUse: (feature) => get().plan === 'pro' || !get().gatedFeatures.includes(feature),
}));
