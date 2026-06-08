import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Avatar } from '../../../components/ui';
import { SectionHeader, StatCard, ActivityItem } from '../../../components/common';
import { profiles, availabilityWeeks, events } from '../../../data/mockData';

export function ProCompanyPage() {
  usePageMeta('Tinder for Nerds | Company', 'Create and edit a company profile with team, role, and skill requirements.');

  return (
    <AppShell variant="pro" title="Company" subtitle="Your startup page and needs profile" actions={<Button variant="secondary">Edit mode</Button>}>
      <section className="pm-panel">
        <div className="pm-company-header">
          <Avatar name="ArcVector" initials="AV" tone="violet" size="xl" />
          <div>
            <p className="pm-kicker">Company profile</p>
            <h1>ArcVector</h1>
            <p>Workflow automation for teams that want to move faster with less noise.</p>
          </div>
          <div className="pm-card-actions">
            <Button variant="secondary">Website</Button>
            <Button variant="secondary">LinkedIn</Button>
          </div>
        </div>
        <div className="pm-badge-row">
          <Badge tone="violet">Seed</Badge>
          <Badge tone="teal">FinTech</Badge>
          <Badge tone="amber">Hiring</Badge>
        </div>
      </section>

      <div className="pm-two-column pm-two-column--company">
        <div className="pm-panel">
          <SectionHeader eyebrow="Editable sections" title="About and what we're building" />
          <label className="pm-field">
            <span>About</span>
            <textarea className="pm-textarea" rows={4} defaultValue="ArcVector is building a workflow automation product for growing teams." />
          </label>
          <label className="pm-field">
            <span>What we're building</span>
            <textarea className="pm-textarea" rows={4} defaultValue="A faster way to automate repetitive work across tools, docs, and handoffs." />
          </label>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Looking for" title="People who match what the company needs" />
          <div className="pm-chip-row">
            {['Technical co-founder', 'Product designer', 'ML engineer', 'Growth lead', 'Data engineer'].map((item) => (
              <Chip key={item} tone="teal" active>
                {item}
              </Chip>
            ))}
          </div>
          <div className="pm-stack-list">
            {[profiles.nora, profiles.priya, profiles.raj].map((profile) => (
              <MiniProfileCard key={profile.id} profile={profile} compact ctaLabel="Invite" secondaryLabel="Shortlist" extraLink={`/profile/${profile.username}`} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}