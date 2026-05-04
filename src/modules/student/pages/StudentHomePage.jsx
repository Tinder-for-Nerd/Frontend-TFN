import { useMemo } from 'react';
import { cx } from '../../../utils/helpers';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Avatar, Button, Icon, Badge } from '../../../components/ui';
import {
  StatCard,
  SectionHeader,
  MiniProfileCard,
  ActivityItem,
} from '../../../components/common';
import { profiles } from '../../../constants/profiles';
import '../../../styles/student-feed.css';

export function StudentHomePage() {
  usePageMeta(
    'Tinder for Nerds | Student Dashboard',
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

  const homeFeed = useMemo(
    () => [
      {
        id: 'home-1',
        author: profiles.sarah,
        content:
          'Just published a guide on modern React architecture: state management, routing, and performance optimization. Feedback welcome.',
        timestamp: '2 hours ago',
        attachments: [{ type: 'link', name: 'React Architecture Guide', url: '#' }],
        likes: 24,
        comments: 5,
        trending: true,
      },
      {
        id: 'home-2',
        author: profiles.raj,
        content:
          'Working on an open source project for distributed task scheduling. Looking for contributors interested in Python and Redis.',
        timestamp: '5 hours ago',
        attachments: [{ type: 'image', name: 'architecture.png', url: '#' }],
        likes: 42,
        comments: 12,
        trending: false,
      },
      {
        id: 'home-3',
        author: profiles.priya,
        content:
          'Slides from my talk on Machine Learning for FinTech: fraud detection and credit scoring models.',
        timestamp: '1 day ago',
        attachments: [{ type: 'document', name: 'ML_FinTech_Slides.pdf', url: '#' }],
        likes: 89,
        comments: 18,
        trending: false,
      },
    ],
    []
  );

  return (
    <AppShell
      variant="student"
      title={`Good morning, ${firstName}`}
      subtitle="Your momentum is high. You have 3 new match suggestions based on your recent skill updates."
    >
      <MomentumBanner />
      <StatsSection stats={stats} />

      <section className="pm-two-column pm-two-column--asym">
        <RecommendedMatches profiles={recommendedProfiles} />
        <SidebarPanels activityFeed={activityFeed} />
      </section>

      <HomeFeedSection posts={homeFeed} />
    </AppShell>
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

function HomeFeedSection({ posts }) {
  return (
    <section className="pm-panel">
      <SectionHeader
        eyebrow="Feed"
        title="Latest from your network"
        description="Short updates from builders you may want to collaborate with."
        actions={
          <Button to="/student/feed" variant="ghost">
            Open feed
          </Button>
        }
      />

      <div className="pm-student-feed__list">
        {posts.map((post) => (
          <article key={post.id} className="pm-student-post pm-card">
            <header className="pm-student-post__head">
              <div className="pm-student-post__identity">
                <div>
                  <Avatar
                    name={post.author.name}
                    src={post.author.src}
                    initials={post.author.avatar}
                    tone={post.author.tone}
                    size="md"
                  />
                </div>
                <div className="pm-student-post__meta">
                  <div className="pm-student-post__name-row">
                    <strong>{post.author.name}</strong>
                    {post.trending ? (
                      <Badge tone="teal" variant="soft">
                        Trending
                      </Badge>
                    ) : null}
                  </div>
                  <span>
                    {(post.author.title || post.author.role) ?? 'Member'} · {post.timestamp}
                  </span>
                </div>
              </div>
              <button className="pm-icon-button pm-student-post__menu" type="button" aria-label="Post options">
                <Icon name="more" size={18} />
              </button>
            </header>

            <div className="pm-student-post__body">
              <p>{post.content}</p>
            </div>

            <footer className="pm-student-post__footer">
              <button className="pm-student-post__action" type="button" aria-label="Like">
                <Icon name="spark" size={18} />
                <span>{post.likes}</span>
              </button>
              <button className="pm-student-post__action" type="button" aria-label="Comment">
                <Icon name="messages" size={18} />
                <span>{post.comments}</span>
              </button>
              <button className="pm-student-post__action pm-student-post__action--end" type="button" aria-label="Open feed">
                <Icon name="chevron-right" size={18} />
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
