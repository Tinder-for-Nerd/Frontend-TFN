import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge } from '../../../components/ui';
import { StatCard, SectionHeader, ActivityItem } from '../../../components/common';

export function ProOverviewPage() {
  usePageMeta('ProMatch | Professional Overview', 'Professional dashboard for managing your network, pipeline, and mentor activity.');

  return (
    <AppShell variant="pro" title="Good morning, Alex" subtitle="You have 3 new matching requests and 2 upcoming sessions today." actions={<Button variant="primary">New session</Button>}>
      <section className="pm-stat-grid">
        <StatCard value="124" label="Profile views" detail="Up 12% from last week." spark={[24, 38, 42, 36, 52, 60, 68]} accent="teal" />
        <StatCard value="19" label="Total sessions" detail="4 upcoming calls this week." spark={[14, 18, 22, 20, 26, 32, 38]} accent="violet" />
        <StatCard value="94%" label="Response rate" detail="Average response time: 2 hours." ring={94} accent="amber" />
        <StatCard value="6" label="Events hosted" detail="Next event: Apr 24, 7:00 PM." spark={[2, 4, 3, 5, 6, 8, 7]} accent="rose" />
      </section>

      <section className="pm-two-column">
        <div className="pm-panel">
          <SectionHeader eyebrow="Pipeline" title="Connection pipeline" description="Manage your pending matching requests and active conversations." actions={<Button variant="ghost">View all</Button>} />
          <div className="pm-pipeline-summary">
            {[
              { label: 'Requests', count: 3, color: 'teal' },
              { label: 'Active', count: 12, color: 'violet' },
              { label: 'Review', count: 5, color: 'amber' },
            ].map((item) => (
              <div key={item.label} className="pm-pipeline-item">
                <strong>{item.label}</strong>
                <Badge tone={item.color}>{item.count}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Updates" title="Recent activity" description="Notifications and activity from your student matches and network." />
          <div className="pm-activity-list">
            <ActivityItem icon="messages" title="Priya K. sent you a message" meta="30m ago" unread />
            <ActivityItem icon="calendar" title="Session confirmed: Mei Lin" meta="2h ago" unread />
            <ActivityItem icon="connections" title="New request from Ethan C." meta="5h ago" />
            <ActivityItem icon="chart" title="Your workshop has 124 signups" meta="1d ago" />
          </div>
        </div>
      </section>

      <section className="pm-panel">
        <SectionHeader eyebrow="Tracking" title="Match pipeline status" description="Monitor the health of your professional matching and outreach." />
        <div className="pm-kanban-overview">
          <div className="pm-kanban-row">
            {[
              { label: 'New', count: 3, color: 'teal' },
              { label: 'Chatting', count: 8, color: 'violet' },
              { label: 'Scheduled', count: 4, color: 'amber' },
              { label: 'Complete', count: 14, color: 'rose' },
            ].map((column) => (
              <article key={column.label} className="pm-kanban-column">
                <div className="pm-kanban-column__header">
                  <strong>{column.label}</strong>
                  <Badge tone={column.color}>{column.count}</Badge>
                </div>
                <div className="pm-kanban-column__line" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
