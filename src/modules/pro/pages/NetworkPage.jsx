import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Avatar } from '../../../components/ui';
import { SectionHeader, StatCard, ActivityItem } from '../../../components/common';
import { profiles, availabilityWeeks, events } from '../../../data/mockData';

export function NetworkPage() {
  const [tab, setTab] = useState('all');

  usePageMeta('Tinder for Nerds | Pro Network', 'Professional network management with connection cards, domain groups, and pipeline tracking.');

  return (
    <AppShell variant="pro" title="Network" subtitle="Manage the relationships that matter most." actions={<Button to="/pro/inbox" variant="secondary">Open inbox</Button>}>
      <div className="pm-tab-row">
        {[
          ['all', 'All connections'],
          ['domain', 'By domain'],
          ['pipeline', 'Pipeline'],
          ['mutual', 'Mutual'],
          ['blocked', 'Blocked'],
        ].map(([id, label]) => (
          <button className={cx('pm-tab', tab === id && 'is-active')} key={id} type="button" onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'all' ? (
        <section className="pm-card-grid">
          {[profiles.sarah, profiles.raj, profiles.priya, profiles.ethan].map((profile) => (
            <MiniProfileCard key={profile.id} profile={profile} compact ctaLabel="Message" secondaryLabel="Book call" extraLink={`/profile/${profile.username}`} />
          ))}
        </section>
      ) : null}

      {tab === 'domain' ? (
        <section className="pm-domain-grid">
          {['FinTech', 'Engineering', 'Product', 'Design'].map((domain) => (
            <article className="pm-card pm-domain-card" key={domain}>
              <SectionHeader eyebrow={domain} title={`${domain} connections`} description="Accordion-style groupings for a denser professional view." />
              <div className="pm-stack-list">
                <MiniProfileCard profile={domain === 'FinTech' ? profiles.priya : domain === 'Engineering' ? profiles.raj : domain === 'Product' ? profiles.sarah : profiles.nora} compact ctaLabel="Message" secondaryLabel="Book" extraLink={`/profile/${domain === 'FinTech' ? 'priya-khan' : domain === 'Engineering' ? 'raj-patel' : domain === 'Product' ? 'sarah-chen' : 'nora-khan'}`} />
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {tab === 'pipeline' ? (
        <section className="pm-kanban">
          {[
            { label: 'Discovered', count: 12, profiles: [profiles.nora, profiles.priya] },
            { label: 'Reached out', count: 5, profiles: [profiles.raj] },
            { label: 'Session booked', count: 3, profiles: [profiles.sarah] },
            { label: 'Active partner', count: 8, profiles: [profiles.ethan] },
          ].map((column) => (
            <article className="pm-card pm-kanban-column" key={column.label}>
              <div className="pm-kanban-column__head">
                <strong>{column.label}</strong>
                <Badge tone="muted">{column.count}</Badge>
              </div>
              <div className="pm-stack-list">
                {column.profiles.map((profile) => (
                  <div className="pm-kanban-card" key={profile.id}>
                    <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="sm" />
                    <div>
                      <strong>{profile.name}</strong>
                      <span>{profile.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {tab === 'mutual' ? <section className="pm-card-grid"><MiniProfileCard profile={profiles.sarah} compact /><MiniProfileCard profile={profiles.priya} compact /></section> : null}
      {tab === 'blocked' ? <section className="pm-panel"><p>Blocked users can be searched and unblocked here once the account history grows.</p></section> : null}
    </AppShell>
  );
}