import { useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import { SectionHeader, MiniProfileCard, EmptyState } from '../../../components/common';
import { profiles, studentConnections } from '../../../data/mockData';
import { usePageMeta } from '../../../hooks/usePageMeta';

export function ConnectionsPage() {
  usePageMeta('My Connections | ProMatch', 'Manage your network, view pending requests, and discover suggested matches.');
  
  const [activeTab, setActiveTab] = useState('connected');
  const [query, setQuery] = useState('');

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
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="pm-search-input">
            <Icon name="search" size={16} />
            <input 
              type="text" 
              placeholder="Search connections..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button variant="primary" icon="spark">Discover more</Button>
        </div>
      }
    >
      <div className="pm-connections-container">
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
                  ctaLabel={activeTab === 'connected' ? 'Message' : 'Accept'}
                  secondaryLabel={activeTab === 'connected' ? 'Book Call' : 'Ignore'}
                  extraLink={`/profile/${profile.username}`} 
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              icon="connections" 
              title="No connections found" 
              description={query ? `No results for "${query}" in this section.` : "Start exploring to build your network."}
              actionLabel="Discover people"
              onAction={() => setActiveTab('suggested')}
            />
          )}
        </section>
      </div>

      <style>{`
        .pm-connections-container {
          display: grid;
          gap: 32px;
        }
        .pm-tabs {
          display: flex;
          gap: 32px;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 2px;
        }
        .pm-tabs button {
          background: none;
          border: none;
          padding: 8px 0 16px;
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--on-surface-variant);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pm-tabs button.is-active {
          color: var(--primary);
        }
        .pm-tabs button.is-active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary);
        }
        .pm-tab-count {
          font-size: 10px;
          background: var(--surface-container-high);
          padding: 2px 6px;
          border-radius: 10px;
          color: var(--on-surface);
        }
        .pm-connections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        .pm-search-input {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          padding: 0 16px;
          border-radius: var(--radius-full);
          height: 40px;
          min-width: 240px;
        }
        .pm-search-input input {
          background: none;
          border: none;
          outline: none;
          color: var(--on-surface);
          font-size: 14px;
          width: 100%;
        }
      `}</style>
    </AppShell>
  );
}
