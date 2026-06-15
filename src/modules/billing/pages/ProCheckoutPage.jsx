import { useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Button } from '../../../components/ui';
import { useSubscription } from '../../../context/SubscriptionContext';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { PRO_FEATURES } from '../../../data/platformData';
import { PaymentCheckoutForm } from '../../student/components/PaymentCheckoutForm';
import '../../../styles/billing.css';

export function ProCheckoutPage() {
  const { isPro, activatePro } = useSubscription();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  usePageMeta('Pro plan | Tinder for Nerds', 'Upgrade for unlimited matches and analytics.');

  const handlePaymentSuccess = () => {
    activatePro();
    setCheckoutOpen(false);
  };

  return (
    <AppShell variant="pro" title="Pro plan" hideTopbar>
      <div className="pro-checkout">
        <header className="pro-checkout__hero">
          <span className="pro-checkout__badge">Pro</span>
          <h1>Scale your network with Pro</h1>
          <p>$12/month · cancel anytime · mock Stripe checkout for demo</p>
        </header>

        {isPro ? (
          <div className="pro-checkout__active">
            <h2>You&apos;re on Pro 🎉</h2>
            <p>All premium features are unlocked.</p>
            <Button variant="secondary" to="/pro/analytics">View analytics</Button>
          </div>
        ) : (
          <>
            <ul className="pro-checkout__features">
              {PRO_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Button variant="primary" onClick={() => setCheckoutOpen(true)}>
              Upgrade — $12/mo
            </Button>
          </>
        )}

        {checkoutOpen ? (
          <div className="pro-checkout__modal" role="dialog" aria-modal="true">
            <div className="pro-checkout__modal-backdrop" onClick={() => setCheckoutOpen(false)} />
            <div className="pro-checkout__modal-panel">
              <h2>Stripe checkout</h2>
              <p>Demo payment — activates Pro on success.</p>
              <PaymentCheckoutForm
                amount={12}
                currency="USD"
                onCheckout={() => handlePaymentSuccess()}
              />
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
