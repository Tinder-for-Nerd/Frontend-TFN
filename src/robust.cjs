const fs = require('fs');
let code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');

// Ensure React is imported
if (!code.includes("import React")) {
    code = "import React from 'react';\n" + code;
}

// Make MessagesPage extremely robust
const robustMessagesPage = `function MessagesPage({ variant }) {
  const { threadId } = useParams();
  const threads = (variant === 'pro' ? proThreads : studentThreads) || [];
  const defaultThread = threads[0] || { id: 'fallback', person: { name: 'Chat', avatar: '?', tone: 'violet' }, status: 'Offline', messages: [] };
  const [activeThreadId, setActiveThreadId] = useState(threadId || defaultThread.id);
  
  const activeThread = threads.find((thread) => thread.id === activeThreadId) || defaultThread;

  useEffect(() => {
    if (threadId && threadId !== activeThreadId) {
      setActiveThreadId(threadId);
    }
  }, [threadId, activeThreadId]);

  usePageMeta(
    variant === 'pro' ? 'ProMatch | Inbox' : 'ProMatch | Messages',
    'Immersive messaging experience.'
  );

  return (
    <AppShell
      variant={variant || 'student'}
      title={variant === 'pro' ? 'Inbox' : 'Messages'}
      subtitle="Keep the conversation moving"
    >
      <div className="pm-premium-messages">
        <aside className="pm-premium-threads">
          <div className="search-box">
            <Icon name="search" />
            <input type="text" placeholder="Search threads..." />
          </div>
          <div className="pm-thread-list-container" style={{ flex: 1, overflowY: 'auto' }}>
            {threads.map((thread) => (
              <div 
                key={thread.id} 
                className={cx('pm-premium-thread-item', activeThreadId === thread.id && 'is-active')}
                onClick={() => setActiveThreadId(thread.id)}
              >
                <Avatar 
                  name={thread?.person?.name || 'User'} 
                  initials={thread?.person?.avatar || '?'} 
                  tone={thread?.person?.tone || 'violet'} 
                  size="md" 
                  online={thread?.status === 'Online'} 
                />
                <div className="item-body">
                  <div className="item-meta">
                    <strong>{thread?.person?.name || 'User'}</strong>
                    <span>{thread?.time || ''}</span>
                  </div>
                  <p>{thread?.last || 'No messages yet'}</p>
                </div>
                {thread?.unread ? <span className="count">{thread.unread}</span> : null}
              </div>
            ))}
          </div>
        </aside>

        <section className="pm-premium-chat">
          <header className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar 
                name={activeThread?.person?.name || 'User'} 
                initials={activeThread?.person?.avatar || '?'} 
                tone={activeThread?.person?.tone || 'violet'} 
                size="sm" 
                online={activeThread?.status === 'Online'} 
              />
              <div>
                <h2 style={{ fontSize: '16px' }}>{activeThread?.person?.name || 'Chat'}</h2>
                <span style={{ fontSize: '11px' }}>{activeThread?.status || 'Active'}</span>
              </div>
            </div>
            <div className="pm-card-actions">
              <button className="pm-icon-button"><Icon name="search" /></button>
              <button className="pm-icon-button"><Icon name="phone" /></button>
              <button className="pm-icon-button"><Icon name="more" /></button>
            </div>
          </header>

          <div className="chat-body" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {(activeThread?.messages || []).map((msg) => (
              <div key={msg.id} className={cx('pm-message-group', msg.from === 'me' && 'is-me')}>
                {msg.from !== 'me' && (
                  <Avatar 
                    name={activeThread?.person?.name} 
                    initials={activeThread?.person?.avatar} 
                    tone={activeThread?.person?.tone} 
                    size="sm" 
                  />
                )}
                <div className="pm-bubble-stack">
                  <div className="pm-message-bubble-modern">
                    {msg.body}
                  </div>
                  <div className="pm-message-info">
                     <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pm-chat-input-area">
            <div className="pm-chat-input-container">
              <Icon name="attachment" style={{ opacity: 0.5 }} />
              <input type="text" placeholder="Type a message..." style={{ width: '100%', outline: 'none' }} />
              <Icon name="mic" style={{ opacity: 0.5 }} />
              <Icon name="send" style={{ color: '#5b4bf5', cursor: 'pointer' }} />
            </div>
          </div>
        </section>

        <aside className="pm-premium-info">
           <div className="pm-info-card">
              <h3 style={{ fontSize: '14px', margin: 0 }}>Conversation Info</h3>
              <div style={{ marginTop: '20px' }}>
                 <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>Shared Media</p>
                 <div className="pm-accordion-item">
                    <span><Icon name="image" size="sm" /> 24 items</span>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </AppShell>
  );
}`;

// Replace MessagesPage
const startTag = 'function MessagesPage';
const nextFunc = 'function SessionsPage';
const startIndex = code.indexOf(startTag);
const endIndex = code.indexOf(nextFunc);

if (startIndex !== -1 && endIndex !== -1) {
    code = code.substring(0, startIndex) + robustMessagesPage + "\n\n" + code.substring(endIndex);
    fs.writeFileSync('src/ProMatchDarkApp.jsx', code);
    console.log('Robust MessagesPage applied.');
} else {
    console.log('Indices fail.');
}
