import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Badge, Button, Icon } from '../../../components/ui';
import '../../../styles/org-dashboard.css';

const cohortStats = [
  { label: 'Active members', value: '248', trend: '+12 this week' },
  { label: 'Hosted events', value: '16', trend: '3 upcoming' },
  { label: 'Team connections', value: '1.2k', trend: '94% response rate' },
];

const recentEvents = [
  { title: 'GDG Build Night', status: 'Upcoming', rsvps: 86 },
  { title: 'Founder Office Hours', status: 'Live', rsvps: 42 },
  { title: 'Demo Day Prep', status: 'Draft', rsvps: 0 },
];

export function OrgDashboardPage() {
  usePageMeta('Organization Dashboard | ProMatch', 'Cohort overview, hosted events, and team connections.');

  return (
    <AppShell
      variant="student"
      title="Organization"
      subtitle="Your community's builder network, supercharged."
    >
      <div className="pm-org-dashboard">
        <header className="pm-org-dashboard__header">
          <div>
            <Badge tone="amber">Organization</Badge>
            <h1>Cohort overview</h1>
            <p>Track members, events, and connections across your community.</p>
          </div>
          <Button to="/org/events" icon="calendar">Manage events</Button>
        </header>

        <div className="pm-org-dashboard__stats">
          {cohortStats.map((stat) => (
            <article key={stat.label} className="pm-org-dashboard__stat">
              <p className="pm-org-dashboard__stat-label">{stat.label}</p>
              <p className="pm-org-dashboard__stat-value">{stat.value}</p>
              <p className="pm-org-dashboard__stat-trend">{stat.trend}</p>
            </article>
          ))}
        </div>

        <section className="pm-org-dashboard__section">
          <div className="pm-org-dashboard__section-head">
            <h2>Hosted events</h2>
            <Button to="/org/events/host" variant="secondary" size="sm" icon="plus">Host event</Button>
          </div>
          <ul className="pm-org-dashboard__events">
            {recentEvents.map((event) => (
              <li key={event.title}>
                <div>
                  <strong>{event.title}</strong>
                  <span>{event.rsvps} RSVPs</span>
                </div>
                <Badge>{event.status}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="pm-org-dashboard__section">
          <div className="pm-org-dashboard__section-head">
            <h2>Team connections</h2>
            <Icon name="connections" />
          </div>
          <p className="pm-org-dashboard__copy">
            38 new mentor matches and 112 student-founder intros this month across your cohort.
          </p>
          <Button to="/org/settings" variant="secondary">Organization settings</Button>
        </section>
      </div>
    </AppShell>
  );
}

export default OrgDashboardPage;
