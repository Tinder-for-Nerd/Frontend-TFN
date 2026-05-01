import { useMemo } from 'react';
import { cx } from '../../../utils/helpers';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Icon, Badge } from '../../../components/ui';
import {
  StatCard,
  SectionHeader,
  MiniProfileCard,
  ActivityItem,
} from '../../../components/common';
import { profiles } from '../../../constants/profiles';

export function StudentHomePage() {
  usePageMeta(
    'ProMatch | Student Dashboard',
    'Student dashboard overview with matches, activity, and profile growth signals.'
  );

  const firstName = useMemo(() => profiles.me.name.split(' ')[0], []);

  const recommendedProfiles = useMemo(
    () =>
      [profiles.sarah, profiles.raj, profiles.mei, profiles.ethan].map((profile) => ({
        ...profile,
        verified: true,
        status: 'Online',
        domain: 'Product Strategy',
      })),
    []
  );

  const stats = useMemo(
    () => [
      {
        value: '73%',
        label: 'Profile strength',
        detail: 'Add 2 more skills to reach 85%.',
        ring: 73,
        trend: 5,
        accent: 'teal',
      },
      {
        value: '12',
        label: 'Matches today',
        detail: 'Top 10% of candidates in AI/ML.',
        spark: [18, 32, 44, 38, 58, 64, 72],
        trend: 12,
        accent: 'violet',
      },
      {
        value: '5',
        label: 'New messages',
        detail: 'Response time: < 2 hours.',
        trend: -2,
        accent: 'amber',
      },
      {
        value: '2',
        label: 'Upcoming events',
        detail: 'AI Founders Meetup starts in 2h.',
        accent: 'rose',
      },
    ],
    []
  );

  const activityFeed = useMemo(
    () => [
      {
        icon: 'connections',
        title: 'Sarah Chen accepted your request',
        meta: 'Just now',
        unread: true,
      },
      {
        icon: 'messages',
        title: 'New message from Priya K.',
        meta: '5h ago',
        unread: true,
      },
      {
        icon: 'events',
        title: 'Event starting: AI Design Sync',
        meta: '2h ago',
      },
      {
        icon: 'chart',
        title: 'Your profile appeared in 45 searches',
        meta: 'This week',
      },
    ],
    []
  );

  const onboardingItems = useMemo(
    () => [
      {
        label: 'Upload a professional photo',
        sub: 'Increases profile views by 40%',
        checked: true,
      },
      {
        label: 'Verify student identity',
        sub: 'Required for exclusive event access',
        checked: true,
      },
      {
        label: 'Link GitHub/Portfolio',
        sub: 'Essential for technical role ranking',
        checked: true,
      },
      {
        label: 'Add a 30-second video intro',
        sub: 'New! Profiles with video get 3x more interest',
        checked: false,
      },
      {
        label: 'Request 2 skill endorsements',
        sub: 'Boosts match score by 15%',
        checked: false,
      },
      {
        label: 'Complete your founder bio',
        sub: 'Tell your story to attract co-founders',
        checked: false,
      },
    ],
    []
  );

  return (
    <AppShell
      variant="student"
      title={`Good morning, ${firstName}`}
      subtitle="Your momentum is high. You have 3 new match suggestions based on your recent skill updates."
      actions={<DashboardActions />}
    >
      <MomentumBanner />
      <StatsSection stats={stats} />

      <section className="pm-two-column pm-two-column--asym">
        <RecommendedMatches profiles={recommendedProfiles} />
        <SidebarPanels activityFeed={activityFeed} />
      </section>

      <OnboardingSection items={onboardingItems} />
    </AppShell>
  );
}

function DashboardActions() {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="secondary" icon="search">
        Search
      </Button>
      <Button to="/student/discover" icon="spark">
        Unlock 5 new matches
      </Button>
    </div>
  );
}

function MomentumBanner() {
  return (
    <section className="pm-momentum-banner">
      <div className="pm-momentum-banner__content">
        <Badge tone="teal" variant="solid" className="pm-momentum-badge">
          Action Required
        </Badge>

        <h1>Complete your bio to get ranked for founder roles.</h1>
        <p>
          Profiles with a bio are 4.5x more likely to receive connection requests
          from mentors.
        </p>

        <div className="pm-momentum-banner__actions">
          <Button to="/student/profile/edit" variant="primary">
            Add bio now
          </Button>
          <Button variant="ghost">Maybe later</Button>
        </div>
      </div>

      <div className="pm-momentum-banner__visual" aria-hidden="true">
        <Icon
          name="chart"
          size={120}
          style={{ opacity: 0.1, transform: 'rotate(-10deg)' }}
        />
      </div>
    </section>
  );
}

function StatsSection({ stats }) {
  return (
    <section className="pm-stat-grid">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          detail={stat.detail}
          ring={stat.ring}
          spark={stat.spark}
          trend={stat.trend}
          accent={stat.accent}
        />
      ))}
    </section>
  );
}

function RecommendedMatches({ profiles: recommendedProfiles }) {
  return (
    <div className="pm-panel">
      <SectionHeader
        eyebrow="Matches"
        title="Highly recommended"
        description="AI-ranked candidates that match your current Product focus."
        actions={
          <Button to="/student/discover" variant="ghost">
            Explore all
          </Button>
        }
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        {recommendedProfiles.map((profile) => (
          <MiniProfileCard
            key={profile.id}
            profile={profile}
            compact
            ctaLabel="Connect"
            extraLink={`/profile/${profile.username}`}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarPanels({ activityFeed }) {
  return (
    <div className="pm-sidebar-content">
      <div className="pm-panel pm-nudge-panel">
        <SectionHeader eyebrow="Smart nudge" title="Behavioral insight" />
        <div className="pm-nudge-card">
          <Icon name="spark" size={24} className="pm-nudge-icon" />
          <div>
            <p>
              <strong>Refine your search</strong>
            </p>
            <span>
              You&apos;ve viewed 3 Frontend profiles today. Should we prioritize
              Frontend matches in your feed?
            </span>
            <div className="pm-nudge-actions">
              <Button size="xs" variant="primary">
                Yes, prioritize
              </Button>
              <Button size="xs" variant="ghost">
                No, keep current
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pm-panel">
        <SectionHeader
          eyebrow="Activity"
          title="Real-time feed"
          description="Keep track of your momentum."
        />
        <div className="pm-activity-list">
          {activityFeed.map((item) => (
            <ActivityItem
              key={`${item.title}-${item.meta}`}
              icon={item.icon}
              title={item.title}
              meta={item.meta}
              unread={item.unread}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OnboardingSection({ items }) {
  return (
    <section className="pm-panel">
      <SectionHeader
        eyebrow="Onboarding"
        title="Guided profile completion"
        description="Complete these steps to unlock the Elite Builder badge and gain early access to Founders events."
      />

      <div className="pm-onboarding-grid">
        {items.map((item) => (
          <div
            key={item.label}
            className={cx(
              'pm-checklist-item pm-checklist-item--actionable',
              item.checked && 'is-checked'
            )}
          >
            <div className="pm-checklist-icon">
              {item.checked ? (
                <Icon name="check-circle" size={20} />
              ) : (
                <div className="pm-checkbox-empty" />
              )}
            </div>

            <div className="pm-checklist-content">
              <strong>{item.label}</strong>
              <span>{item.sub}</span>
            </div>

            {!item.checked && (
              <Button
                size="xs"
                variant="secondary"
                className="pm-checklist-btn"
              >
                Complete
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
