import { AppShell } from '../../../components/layout';
import { Button } from '../../../components/ui';
import { SectionHeader } from '../../../components/common';
import { PlatformAnalyticsCharts } from '../../../components/analytics/PlatformAnalyticsCharts';
import { FeatureGate } from '../../../context/SubscriptionContext';
import { usePageMeta } from '../../../hooks/usePageMeta';

export function ProAnalyticsPage() {
  usePageMeta('Tinder for Nerds | Analytics', 'Recharts analytics for match quality and skill demand.');

  return (
    <AppShell variant="pro" title="Analytics" subtitle="Match quality, skill demand, response rates" actions={<Button variant="secondary" to="/pro/billing">Upgrade</Button>}>
      <FeatureGate
        feature="analytics"
        fallback={
          <div className="pm-panel" style={{ padding: 32, textAlign: 'center' }}>
            <SectionHeader title="Analytics is a Pro feature" description="Upgrade to unlock Recharts dashboards." />
            <Button variant="primary" to="/pro/billing">Upgrade to Pro</Button>
          </div>
        }
      >
        <PlatformAnalyticsCharts />
      </FeatureGate>
    </AppShell>
  );
}