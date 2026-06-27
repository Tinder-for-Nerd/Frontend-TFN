import { useMemo, useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Button, Icon } from '../../../components/ui';
import { SectionHeader, MiniProfileCard, EmptyState } from '../../../components/common';
import { profiles, studentConnections } from '../../../data/mockData';
import { getBookedSessions } from '../../../data/bookedSessions';
import { usePageMeta } from '../../../hooks/usePageMeta';
import '../../../styles/discover.css';
import '../../../styles/connections.css';

export function ConnectionsPage() {
  usePageMeta('My Connections | Tinder for Nerds', 'Manage your network, view pending requests, and discover suggested matches.');

  const [activeTab, setActiveTab] = useState('connected');
  const [query, setQuery] = useState('');
  const upcomingMeetings = useMemo(() => {
    const candidates = Object.values(profiles ?? {});
    return getBookedSessions().map((session) => ({
      ...session,
      person: candidates.find((profile) => profile?.username === session.withUser || profile?.id === session.withUser),
    }));
  }, []);

  const tabs = [
    { id: 'connected', label: 'Connected', count: studentConnections.connected.length },
    { id: 'pending', label: 'Pending', count: studentConnections.pendingReceived.length + studentConnections.pendingSent.length },
    { id: 'suggested', label: 'Suggested', count: studentConnections.suggested.length },
  ];

  const getConnections = () => {
    switch (activeTab) {
      case 'connected': return studentConnections.connected;
      case 'pending': return [...studentConnections.pendingReceived, ...studentConnections.pendingSent];
      case 'suggested': return studentConnections.suggested;
      default: return [];
    }
  };

  const filteredConnections = getConnections().filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppShell 
      variant="student" 
      title="Connections" 
      subtitle="Manage your professional network and discover new builders."
      actions={
        <div className="pm-connections-toolbar">
          <div className="pm-search-input">
            <Icon name="search" size={16} />
            <input 
              type="text" 
              placeholder="Search connections..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      }
    >
      <div className="pm-connections-container">
        {upcomingMeetings.length > 0 ? (
          <section className="pm-connections-upcoming">
            <SectionHeader
              eyebrow="Upcoming meeting"
              title="Your booked 1:1 sessions"
              description="Join confirmed one-to-one sessions directly from your connections workspace."
            />
            <div className="pm-upcoming-meeting-list">
              {upcomingMeetings.map((meeting) => (
                <article className="pm-upcoming-meeting pm-upcoming-meeting--section" key={meeting.id}>
                  <div>
                    <span className="pm-upcoming-meeting__eyebrow">Upcoming meeting</span>
                    <strong>1:1 with {meeting.person?.name || 'your connection'}</strong>
                    <p>{meeting.day} · {meeting.slot}</p>
                  </div>
                  <Button
                    to={`/call/${encodeURIComponent(meeting.id)}?ready=1`}
                    variant="primary"
                    size="sm"
                    icon="video"
                  >
                    Join
                  </Button>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Tab Navigation */}
        <nav className="pm-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'is-active' : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.count > 0 && <span className="pm-tab-count">{tab.count}</span>}
            </button>
          ))}
        </nav>

        <section className="pm-connections-content">
          <SectionHeader 
            title={tabs.find(t => t.id === activeTab).label} 
            description={
              activeTab === 'connected' ? "People you have already successfully connected with." :
              activeTab === 'pending' ? "Requests that are waiting for approval." :
              "AI-ranked builders based on your skills and intent."
            }
          />

          {filteredConnections.length > 0 ? (
            <div className="pm-connections-grid">
              {filteredConnections.map((profile) => (
                <MiniProfileCard 
                  key={profile.id}
                  profile={{
                    ...profile,
                    verified: true, // Mocking verified status for better UI
                    status: 'Online',
                    domain: profile.domain || 'Engineering'
                  }} 
                  ctaLabel={activeTab === 'connected' ? 'Book 1:1 Session' : 'Accept'}
                  ctaTo={activeTab === 'connected' ? `/student/sessions?with=${encodeURIComponent(profile.username || profile.id)}` : undefined}
                  secondaryLabel={activeTab === 'connected' ? 'Message' : 'Ignore'}
                  secondaryTo={activeTab === 'connected' ? `/student/messages/${profile.username || profile.id}` : undefined}
                  secondaryIcon={activeTab === 'connected' ? 'messages' : undefined}
                  extraLink={`/profile/${profile.username}`} 
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              icon="connections" 
              title="No connections found" 
              description={query ? `No results for "${query}" in this section.` : "Start exploring to build your network."}
            />
          )}
        </section>
      </div>

    </AppShell>
  );
}
