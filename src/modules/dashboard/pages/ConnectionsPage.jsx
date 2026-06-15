import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import { SectionHeader, MiniProfileCard, EmptyState } from '../../../components/common';
import { ProfessionalSearchModal } from '../components/discover/ProfessionalSearchModal';
import { profiles, studentConnections } from '../../../data/mockData';
import { saveProfessionalSearch } from '../../../data/professionalSearch';
import { usePageMeta } from '../../../hooks/usePageMeta';
import '../../../styles/discover.css';
import '../../../styles/connections.css';

export function ConnectionsPage() {
  usePageMeta('My Connections | Tinder for Nerds', 'Manage your network, view pending requests, and discover suggested matches.');

  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
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
          <Button variant="primary" icon="spark" onClick={() => setSearchOpen(true)}>
            Discover more
          </Button>
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
              actionLabel="Discover more"
              onAction={() => setSearchOpen(true)}
            />
          )}
        </section>
      </div>

      <ProfessionalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSubmit={(criteria) => {
          saveProfessionalSearch(criteria);
          setSearchOpen(false);
          navigate('/student/search', { state: { professionalSearch: criteria } });
        }}
      />

    </AppShell>
  );
}
