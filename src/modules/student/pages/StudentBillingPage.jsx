import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Badge, Button } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { profiles as allProfiles } from '../../../data/mockData';
import { PaymentCheckoutForm } from '../components/PaymentCheckoutForm';

export function StudentBillingPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const withUser = params.get('with') || 'me';
  const slot = params.get('slot') || '';
  const day = params.get('day') || '';

  usePageMeta('Transaction | Tinder for Nerds', 'Complete payment to confirm your session.');

  const person = useMemo(() => {
    const candidates = Object.values(allProfiles ?? {});
    return candidates.find((p) => p?.username === withUser) ?? allProfiles?.me ?? null;
  }, [withUser]);

  const amount = 199;

  const handleCheckout = () => {
    navigate(`/student/sessions?paid=1&with=${encodeURIComponent(withUser)}`);
  };

  return (
    <AppShell
      variant="student"
      title="Transaction"
      subtitle="Complete payment to confirm your session."
      className="pm-billing-shell"
      actions={
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      }
    >
      <div className="pm-billing-page">
        <header className="pm-billing-page__header">
          <div>
            <Badge tone="teal" variant="soft">
              Session payment
            </Badge>
            <h1 className="pm-billing-page__title">Pay to confirm</h1>
            <p className="pm-billing-page__lede">
              {person?.name ? `Meeting with ${person.name}.` : 'Meeting details.'}{' '}
              {day || slot ? `Slot: ${day ? `${day} ` : ''}${slot}` : null}
            </p>
          </div>
        </header>

        <PaymentCheckoutForm amount={amount} currency="INR" onCheckout={handleCheckout} />

        <div className="pm-billing-page__secondary">
          <Button variant="secondary" onClick={() => navigate('/student/sessions')} style={{ flex: 1 }}>
            Pay later
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
