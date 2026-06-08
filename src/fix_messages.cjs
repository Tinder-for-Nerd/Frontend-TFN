const fs = require('fs');
const code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');
const lines = code.split('\n');

// The new content will use AppShell and exclude the slim nav
const newContent = `  return (
    <AppShell
      variant={variant}
      title={variant === 'pro' ? 'Inbox' : 'Messages'}
      subtitle={variant === 'pro' ? 'Business conversations and partner follow-ups' : 'Keep the conversation moving'}
    >
      <div className="pm-premium-messages">
        {/* 1. Chat Sidebar */}
        <aside className="pm-premium-threads">
          <div className="search-box">
            <Icon name="search" />
            <input type="text" placeholder="Search" />
          </div>
          
          <div className="pm-thread-list-container" style={{ flex: 1, overflowY: 'auto' }}>
            {threads.map((thread) => (
              <div 
                key={thread.id} 
                className={cx('pm-premium-thread-item', activeThreadId === thread.id && 'is-active')}
                onClick={() => setActiveThreadId(thread.id)}
              >
                <Avatar name={thread.person.name} initials={thread.person.avatar} tone={thread.person.tone} size="md" online={thread.status === 'Online'} />
                <div className="item-body">
                  <div className="item-meta">
                    <strong>{thread.person.name}</strong>
                    <span>{thread.time}</span>
                  </div>
                  <p>{thread.last}</p>
                </div>
                {thread.unread ? <span className="count">{thread.unread}</span> : null}
              </div>
            ))}
          </div>
        </aside>

        {/* 2. Main Chat Window */}
        <section className="pm-premium-chat">
          <header className="chat-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar name={activeThread.person.name} initials={activeThread.person.avatar} tone={activeThread.person.tone} size="sm" online={activeThread.status === 'Online'} />
                <div>
                   <h2 style={{ fontSize: '16px' }}>{activeThread.person.name}</h2>
                   <span style={{ fontSize: '11px' }}>{activeThread.status}</span>
                </div>
              </div>
            </div>
            <div className="pm-card-actions">
              <button className="pm-icon-button"><Icon name="search" /></button>
              <button className="pm-icon-button"><Icon name="phone" /></button>
              <button className="pm-icon-button"><Icon name="more" /></button>
            </div>
          </header>

          <div className="chat-body">
            {activeThread.messages.map((msg, idx) => (
              <div key={msg.id} className={cx('pm-message-group', msg.from === 'me' && 'is-me')}>
                {msg.from !== 'me' && (
                  <Avatar name={activeThread.person.name} initials={activeThread.person.avatar} tone={activeThread.person.tone} size="sm" />
                )}
                <div className="pm-bubble-stack">
                  {msg.from !== 'me' && <small style={{ display: 'block', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>{activeThread.person.name}</small>}
                  <div className="pm-message-bubble-modern">
                    {msg.body}
                  </div>
                  <div className="pm-message-info">
                     <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pm-message-group">
              <Avatar name="Jessie Rollins" initials="JR" tone="rose" size="sm" />
              <div className="pm-bubble-stack">
                <small style={{ display: 'block', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>Jessie Rollins</small>
                <div className="pm-message-bubble-modern" style={{ background: '#fff', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon name="play" style={{ color: '#5b4bf5' }} />
                    <div style={{ flex: 1, height: '20px', background: 'linear-gradient(90deg, #5b4bf5 30%, #eee 30%)', borderRadius: '10px' }} />
                    <span style={{ fontSize: '11px' }}>0:15</span>
                  </div>
                </div>
                <div className="pm-message-info"><span>09:30</span></div>
              </div>
            </div>
          </div>

          <div className="pm-chat-input-area">
            <div className="pm-chat-input-container">
              <Icon name="attachment" style={{ opacity: 0.5 }} />
              <input type="text" placeholder="Your message" />
              <Icon name="mic" style={{ opacity: 0.5 }} />
              <Icon name="send" style={{ color: '#5b4bf5', cursor: 'pointer' }} />
            </div>
          </div>
        </section>

        {/* 3. Right Sidebar Info */}
        <aside className="pm-premium-info">
          <div className="pm-info-card">
            <h3 style={{ margin: 0, fontSize: '14px', marginBottom: '16px' }}>Group Info</h3>
            <div className="pm-info-section">
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>Files</p>
              <div className="pm-accordion-item" style={{ fontSize: '13px' }}>
                <span><Icon name="image" size="sm" style={{ marginRight: '8px' }} /> 265 photos</span>
                <Icon name="chevron-up" />
              </div>
              <div className="pm-media-grid" style={{ marginTop: '8px' }}>
                <div className="pm-media-item"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200" alt="office" /></div>
                <div className="pm-media-item"><img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=200" alt="meeting" /></div>
              </div>
            </div>
          </div>

          <div className="pm-info-card" style={{ background: '#eeecff', color: '#1a1a1a', padding: '16px' }}>
             <h3 style={{ margin: 0, fontSize: '14px', marginBottom: '12px' }}>23 members</h3>
             <div className="pm-member-list">
                <div className="pm-member-item" style={{ marginBottom: '8px' }}>
                  <Avatar name="Tanisha Combs" initials="TC" tone="violet" size="sm" />
                  <span className="name" style={{ fontSize: '13px' }}>Tanisha Combs</span>
                  <span className="role" style={{ fontSize: '9px' }}>admin</span>
                </div>
                <div className="pm-member-item">
                  <Avatar name="Alex Hunt" initials="AH" tone="teal" size="sm" />
                  <span className="name" style={{ fontSize: '13px' }}>Alex Hunt</span>
                </div>
             </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );`;

// Re-applying to the component
// The index shifted after previous edits, so I'll find the start and end of the return
let startIndex = -1;
let endIndex = -1;
let openBrackets = 0;
let foundStart = false;

for (let i = 0; i < lines.length; i++) {
  if (!foundStart && lines[i].includes('function MessagesPage')) {
    foundStart = true;
  }
  if (foundStart) {
    if (lines[i].includes('return (') || lines[i].trim() === 'return (') {
       startIndex = i;
    }
    if (startIndex !== -1) {
       // Search for the closing ); 
       if (lines[i].includes(');')) {
         endIndex = i;
         // But we need the right ); that closes the return
         // Based on structure it's usually the one before function SessionsPage
         if (lines[i+1] && lines[i+1].includes('}')) {
             if (lines[i+2] && lines[i+2].includes('function')) {
                  break;
             }
         }
       }
    }
  }
}

console.log('Detected indices:', startIndex, endIndex);
if (startIndex !== -1 && endIndex !== -1) {
  lines.splice(startIndex, endIndex - startIndex + 1, newContent);
  fs.writeFileSync('src/ProMatchDarkApp.jsx', lines.join('\n'));
  console.log('Success');
} else {
  console.log('Failed to find return block');
}
