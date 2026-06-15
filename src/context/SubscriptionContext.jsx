import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SubscriptionContext = createContext(null);

const PRO_STORAGE_KEY = 'pm_pro_subscription';

export function SubscriptionProvider({ children }) {
  const [isPro, setIsPro] = useState(() => {
    try {
      return localStorage.getItem(PRO_STORAGE_KEY) === 'active';
    } catch {
      return false;
    }
  });

  const activatePro = useCallback(() => {
    localStorage.setItem(PRO_STORAGE_KEY, 'active');
    setIsPro(true);
  }, []);

  const cancelPro = useCallback(() => {
    localStorage.removeItem(PRO_STORAGE_KEY);
    setIsPro(false);
  }, []);

  const value = useMemo(
    () => ({
      isPro,
      activatePro,
      cancelPro,
      canAccess: (feature) => {
        const proOnly = ['analytics', 'portfolio-analyzer', 'unlimited-matches', 'fit-breakdown'];
        if (!proOnly.includes(feature)) return true;
        return isPro;
      },
    }),
    [isPro, activatePro, cancelPro],
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
