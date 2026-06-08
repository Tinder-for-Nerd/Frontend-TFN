import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Badge, Button } from '../../../components/ui';
import { profiles as allProfiles } from '../../../data/mockData';

export function StudentBillingPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const withUser = params.get('with') || 'me';
  const slot = params.get('slot') || '';
  const day = params.get('day') || '';

  const person = useMemo(() => {
    const candidates = Object.values(allProfiles ?? {});
    return candidates.find((p) => p?.username === withUser) ?? allProfiles?.me ?? null;
  }, [withUser]);

  const amount = 199; // mock amount; wire to real pricing later

  return (
    <AppShell
      variant="student"
      title="Billing"
      subtitle="Complete payment to confirm your session."
      actions={
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      }
    >
      <div className="pm-panel" style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: 10 }}>
          <Badge tone="teal" variant="soft">
            Session payment
          </Badge>
          <h2 style={{ margin: 0 }}>Pay to confirm</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            {person?.name ? `Meeting with ${person.name}.` : 'Meeting details.'}{' '}
            {day || slot ? `Slot: ${day ? `${day} ` : ''}${slot}` : null}
          </p>
        </div>

        <div
          className="pm-card"
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            display: 'grid',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontWeight: 800 }}>Session fee</span>
            <span style={{ fontWeight: 900 }}>{amount} INR</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Taxes</span>
            <span style={{ color: 'var(--text-secondary)' }}>Included</span>
          </div>
          <div style={{ height: 1, background: 'var(--border-subtle)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontWeight: 900 }}>Total</span>
            <span style={{ fontWeight: 900 }}>{amount} INR</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <Button
            variant="primary"
            onClick={() => navigate(`/student/sessions?paid=1&with=${encodeURIComponent(withUser)}`)}
            style={{ flex: 1 }}
          >
            Pay now
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/student/sessions')}
            style={{ flex: 1 }}
          >
            Pay later
          </Button>
        </div>
      </div>
    </AppShell>
  );
}

