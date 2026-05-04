import { useMemo } from 'react';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import { StatCard, SectionHeader, ActivityItem, MiniProfileCard } from '../../../components/common';
import { profiles } from '../../../constants/profiles';

export function ProOverviewPage() {
  usePageMeta('Tinder for Nerds | Professional Overview', 'Professional dashboard for managing your network, pipeline, and mentor activity.');

  const pendingRequests = useMemo(
    () =>
      [profiles.sarah, profiles.ethan].map((profile) => ({
        ...profile,
        verified: true,
        status: 'Pending',
        domain: 'Student',
      })),
    []
  );

  return (
    <AppShell variant="pro" title="Good morning, Alex" subtitle="You have 2 new matching requests and 2 upcoming sessions today." actions={<Button variant="primary">New session</Button>}>
      
      <ProMomentumBanner />

      <section className="pm-stat-grid">
        <StatCard value="124" label="Profile views" detail="Up 12% from last week." spark={[24, 38, 42, 36, 52, 60, 68]} accent="teal" />
        <StatCard value="19" label="Total sessions" detail="4 upcoming calls this week." spark={[14, 18, 22, 20, 26, 32, 38]} accent="violet" />
        <StatCard value="94%" label="Response rate" detail="Average response time: 2 hours." ring={94} accent="amber" />
        <StatCard value="6" label="Events hosted" detail="Next event: Apr 24, 7:00 PM." spark={[2, 4, 3, 5, 6, 8, 7]} accent="rose" />
      </section>

      <section className="pm-two-column pm-two-column--asym">
        <div className="pm-panel">
          <SectionHeader eyebrow="Pipeline" title="Pending Requests" description="Students who want to connect and collaborate." actions={<Button variant="ghost" to="/pro/network">View all</Button>} />
          <div className="pm-recommended-grid" style={{ marginTop: '20px' }}>
            {pendingRequests.map(profile => (
              <MiniProfileCard key={profile.id} profile={profile} action={<Button size="sm" variant="primary">Review</Button>} />
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Updates" title="Recent activity" description="Notifications from your active network." />
          <div className="pm-activity-list" style={{ marginTop: '20px' }}>
            <ActivityItem icon="messages" title="Priya K. sent you a message" meta="30m ago" unread />
            <ActivityItem icon="calendar" title="Session confirmed: Mei Lin" meta="2h ago" unread />
            <ActivityItem icon="connections" title="New request from Ethan C." meta="5h ago" />
            <ActivityItem icon="chart" title="Your workshop has 124 signups" meta="1d ago" />
          </div>
        </div>
      </section>


    </AppShell>
  );
}

function ProMomentumBanner() {
  return (
    <section className="pm-momentum-banner" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.12))', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
      <div className="pm-momentum-banner__content">
        <Badge tone="violet" variant="solid" className="pm-momentum-badge">
          High Demand
        </Badge>

        <h1>Share your expertise by hosting a session.</h1>
        <p>
          You appeared in 45 student searches this week. Opening up 2 hours of availability can significantly boost your matching momentum.
        </p>

        <div className="pm-momentum-banner__actions">
          <Button to="/pro/calendar" variant="primary">
            Set availability
          </Button>
          <Button variant="ghost">View analytics</Button>
        </div>
      </div>

      <div className="pm-momentum-banner__visual" aria-hidden="true">
        <Icon
          name="calendar"
          size={120}
          style={{ opacity: 0.1, transform: 'rotate(10deg)', color: 'var(--color-violet-500, #8B5CF6)' }}
        />
      </div>
    </section>
  );
}
