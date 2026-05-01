import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cx } from '../../../utils/helpers';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Icon, Button, Avatar, Badge } from '../../../components/ui';
import { MiniProfileCard } from '../../../components/common';
import { studentThreads, proThreads, profiles } from '../../../data/mockData';
import '../../../styles/messages.css';

export function MessagesPage({ variant = 'student' }) {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
  const threads = variant === 'student' ? studentThreads : proThreads;
  const [activeThread, setActiveThread] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread
  const [showProfile, setShowProfile] = useState(null);

  usePageMeta(
    `Messages | ProMatch`,
    'High-momentum messaging for builders and mentors.'
  );

  useEffect(() => {
    if (threadId) {
      const thread = threads.find(t => t.id === threadId);
      if (thread) setActiveThread(thread);
    } else if (threads.length > 0) {
      setActiveThread(threads[0]);
    }
  }, [threadId, threads]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeThread]);

  const handleThreadSelect = (id) => {
    navigate(`/${variant}/messages/${id}`);
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    
    // Logic for sending message would go here
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredThreads = threads.filter(t => {
    const matchesSearch = t.person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.last.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'unread' && t.unread > 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <AppShell 
      variant={variant} 
      title={variant === 'student' ? 'Messages' : 'Inbox'}
      subtitle="Keep the momentum high with real-time conversations."
      hideTopbar={true}
      className={cx('pm-messages-shell', !activeThread && 'is-showing-threads')}
    >
      <div className="pm-messages-layout">
        {/* Thread List Panel */}
        <aside className="pm-thread-panel">
          <header className="pm-panel__header" style={{ padding: '24px', borderBottom: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--surface-container-low)', flexShrink: 0 }}>
            <div className="pm-search-input">
              <Icon name="search" size={16} style={{ opacity: 0.5 }} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: 'var(--on-surface)' }}
              />
            </div>
            <div className="pm-filter-tabs" style={{ display: 'flex', gap: '24px' }}>
              <button 
                className={cx('pm-tab-btn', filter === 'all' && 'is-active')} 
                onClick={() => setFilter('all')}
                style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer', fontSize: '14px', fontWeight: filter === 'all' ? '800' : '500', color: filter === 'all' ? 'var(--primary)' : 'var(--on-surface-variant)', transition: 'all 0.2s', position: 'relative' }}
              >
                All
                {filter === 'all' && <div style={{ position: 'absolute', bottom: '-8px', left: '0', right: '0', height: '2px', background: 'var(--primary)', borderRadius: '2px' }} />}
              </button>
              <button 
                className={cx('pm-tab-btn', filter === 'unread' && 'is-active')} 
                onClick={() => setFilter('unread')}
                style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer', fontSize: '14px', fontWeight: filter === 'unread' ? '800' : '500', color: filter === 'unread' ? 'var(--primary)' : 'var(--on-surface-variant)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}
              >
                Unread {threads.some(t => t.unread > 0) && <Badge tone="primary" dot />}
                {filter === 'unread' && <div style={{ position: 'absolute', bottom: '-8px', left: '0', right: '0', height: '2px', background: 'var(--primary)', borderRadius: '2px' }} />}
              </button>
            </div>
          </header>
          
          <div className="pm-thread-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--surface-container-low)' }}>
            {filteredThreads.map((thread) => {
              const isActive = activeThread?.id === thread.id;
              return (
                <button
                  key={thread.id}
                  onClick={() => handleThreadSelect(thread.id)}
                  style={{ 
                    width: '100%', 
                    display: 'grid', 
                    gridTemplateColumns: 'auto 1fr auto', 
                    alignItems: 'center', 
                    gap: '16px', 
                    padding: '16px 24px', 
                    border: 'none', 
                    borderBottom: '1px solid var(--outline-variant)', 
                    background: isActive ? 'var(--surface-container-high)' : 'transparent', 
                    textAlign: 'left', 
                    cursor: 'pointer', 
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  {isActive && <div style={{ position: 'absolute', left: '0', top: '0', bottom: '0', width: '4px', background: 'var(--primary)' }} />}
                  
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar 
                      name={thread.person.name} 
                      src={thread.person.avatar_url} 
                      initials={thread.person.avatar}
                      tone={thread.person.tone}
                      size="md"
                    />
                    <div className={thread.status === 'Online' || thread.status === 'Typing' ? 'pm-online-dot' : 'pm-offline-dot'} style={{ border: '2px solid var(--surface-container-low)' }} />
                  </div>
                  
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <strong style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--on-surface)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {thread.person.name}
                      </strong>
                    </div>
                    <p style={{ 
                      fontSize: '0.8rem',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: thread.unread > 0 ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                      fontWeight: thread.unread > 0 ? '700' : '400'
                    }}>
                      {thread.status === 'Typing' ? <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Typing...</span> : thread.last}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{thread.time}</span>
                    {thread.unread > 0 && (
                      <Badge tone="primary">{thread.unread}</Badge>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Chat Panel */}
        <main className="pm-chat-panel">
          {activeThread ? (
            <>
              <header className="pm-chat-panel__head">
                <div className="pm-chat-panel__identity" onClick={() => setShowProfile(activeThread.person)} style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar 
                      name={activeThread.person.name} 
                      src={activeThread.person.avatar_url} 
                      initials={activeThread.person.avatar}
                      tone={activeThread.person.tone}
                      size="md"
                    />
                    <div className={activeThread.status === 'Online' || activeThread.status === 'Typing' ? 'pm-online-dot' : 'pm-offline-dot'} />
                  </div>
                  <div>
                    <strong>{activeThread.person.name}</strong>
                    <span style={{ 
                      color: activeThread.status === 'Online' || activeThread.status === 'Typing' ? 'var(--primary)' : 'var(--on-surface-variant)',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {activeThread.status === 'Typing' ? 'Typing...' : activeThread.status === 'Online' ? 'Active now' : activeThread.status}
                    </span>
                  </div>
                </div>
                <div className="pm-chat-panel__actions">
                  <Button variant="ghost" size="sm" title="Voice call"><Icon name="phone" /></Button>
                  <Button variant="ghost" size="sm" title="Video call"><Icon name="video" /></Button>
                  <Button variant="ghost" size="sm" title="View profile" onClick={() => setShowProfile(activeThread.person)}><Icon name="profile" /></Button>
                  <div style={{ width: '1px', height: '24px', background: 'var(--outline-variant)', margin: '0 8px' }} />
                  <Button variant="ghost" size="sm"><Icon name="more" /></Button>
                </div>
              </header>

              <div className="pm-message-stack" ref={scrollRef}>
                <div className="pm-date-divider">
                  <span>Today</span>
                </div>

                {activeThread.messages?.map((msg, idx) => (
                  <div key={msg.id}>
                    {idx === activeThread.messages.length - activeThread.unread && (
                      <div className="pm-unread-divider">
                        <span>New Messages</span>
                      </div>
                    )}
                    <div className={cx('pm-message-bubble', msg.from === 'me' && 'is-sent')}>
                      <p>{msg.body}</p>
                      <div className="pm-message-bubble__footer">
                        <span>{msg.time}</span>
                        {msg.from === 'me' && (
                          <div className="pm-message-status">
                            <Icon name="check-double" size={12} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {activeThread.status === 'Typing' && (
                  <div className="pm-typing-indicator-chat">
                    <div className="pm-typing-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)' }}>{activeThread.person.name.split(' ')[0]} is typing</span>
                  </div>
                )}
              </div>

              <form className="pm-chat-composer" onSubmit={handleSendMessage}>
                <div className="pm-composer-tools">
                  <Button variant="ghost" size="sm" type="button" title="Attach file">
                    <Icon name="plus" />
                  </Button>
                  <Button variant="ghost" size="sm" type="button" title="Add emoji">
                    <Icon name="smile" />
                  </Button>
                </div>
                <input 
                  type="text" 
                  className="pm-input" 
                  placeholder="Ask for feedback or share a thought..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="pm-composer-tools">
                  <Button variant="ghost" size="sm" type="button" title="Record voice">
                    <Icon name="microphone" />
                  </Button>
                  <Button variant="primary" size="sm" type="submit" disabled={!message.trim()}>
                    <Icon name="spark" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="pm-empty-state" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--on-surface-variant)' }}>
              <div className="pm-card" style={{ padding: '48px', textAlign: 'center', maxWidth: '320px', background: 'var(--surface-container-low)' }}>
                <Icon name="messages" size={64} style={{ marginBottom: '24px', opacity: 0.1, color: 'var(--primary)' }} />
                <h3 style={{ color: 'var(--on-surface)', marginBottom: '8px' }}>Select a conversation</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.6 }}>Choose a builder or mentor from the left to start a high-momentum conversation.</p>
                <Button variant="primary" style={{ marginTop: '24px' }} onClick={() => navigate('/student/discover')}>Discover people</Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mini Profile Popup */}
      {showProfile && (
        <div className="pm-modal-overlay" onClick={() => setShowProfile(null)}>
          <div className="pm-modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <MiniProfileCard profile={showProfile} hideActions={true} />
            <div style={{ padding: '24px', borderTop: '1px solid var(--outline-variant)', display: 'grid', gap: '12px', background: 'var(--surface-container-lowest)' }}>
              <Button to={`/profile/${showProfile.id}`} variant="primary" className="pm-btn-full">View Full Profile</Button>
              <Button variant="secondary" onClick={() => setShowProfile(null)} className="pm-btn-full">Close</Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
