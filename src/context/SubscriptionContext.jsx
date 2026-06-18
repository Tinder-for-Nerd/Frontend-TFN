import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useBillingPlanQuery } from '../../packages/shared/src/query/index.js';
import { useSubscriptionStore } from '../../packages/shared/src/stores/index.js';

const SubscriptionContext = createContext(null);

const PRO_STORAGE_KEY = 'pm_pro_subscription';

export function SubscriptionProvider({ children }) {
  const { data: billingPlan } = useBillingPlanQuery();
  const setBillingState = useSubscriptionStore((state) => state.setBillingState);
  const canUseSharedFeature = useSubscriptionStore((state) => state.canUse);
  const [isPro, setIsPro] = useState(() => {
    try {
      return localStorage.getItem(PRO_STORAGE_KEY) === 'active';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (billingPlan) {
      setBillingState(billingPlan);
    }
  }, [billingPlan, setBillingState]);

  const activatePro = useCallback(() => {
    localStorage.setItem(PRO_STORAGE_KEY, 'active');
    setIsPro(true);
    setBillingState({ plan: 'pro', gatedFeatures: [] });
  }, [setBillingState]);

  const cancelPro = useCallback(() => {
    localStorage.removeItem(PRO_STORAGE_KEY);
    setIsPro(false);
    setBillingState({
      plan: billingPlan?.plan || 'free',
      gatedFeatures: billingPlan?.gatedFeatures,
    });
  }, [billingPlan, setBillingState]);

  const value = useMemo(
    () => ({
      isPro,
      billingPlan,
      activatePro,
      cancelPro,
      canAccess: (feature) => {
        const proOnly = ['analytics', 'portfolio-analyzer', 'unlimited-matches', 'fit-breakdown'];
        if (!proOnly.includes(feature)) return true;
        return isPro || canUseSharedFeature(feature);
      },
    }),
    [isPro, billingPlan, activatePro, cancelPro, canUseSharedFeature],
  );

  return (
    <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
}

export function FeatureGate({ feature, children, fallback = null }) {
  const { canAccess } = useSubscription();
  return canAccess(feature) ? children : fallback;
}
