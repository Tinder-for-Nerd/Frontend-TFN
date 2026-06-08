const fs = require('fs');
const code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');
const lines = code.split('\n');

const newContent = `  return (
    <div className="pm-premium-messages">
      {/* 1. Left Slim Nav */}
      <aside className="pm-premium-nav-slim">
        <div className="pm-brand-logotype" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Δ</div>
        
        <div className="pm-nav-icon is-active">
          <Icon name="messages" />
          <span className="badge">43</span>
        </div>
        <div className="pm-nav-icon">
          <Icon name="work" />
          <span className="badge">4</span>
        </div>
        <div className="pm-nav-icon">
          <Icon name="friends" />
        </div>
        <div className="pm-nav-icon">
          <Icon name="news" />
        </div>
        <div className="pm-nav-icon">
          <Icon name="archive" />
        </div>

        <div className="pm-nav-logout pm-nav-icon">
          <Icon name="logout" />
        </div>
      </aside>

      {/* 2. Chat Sidebar */}
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

      {/* 3. Main Chat Window */}
      <section className="pm-premium-chat">
        <header className="chat-header">
          <div>
            <h2>{activeThread.person.name}</h2>
            <span>23 members, 10 online</span>
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

      {/* 4. Right Sidebar Info */}
      <aside className="pm-premium-info">
        <div className="pm-info-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <h3 style={{ margin: 0 }}>Group Info</h3>
             <Icon name="close" style={{ opacity: 0.4, height: '14px' }} />
          </div>
          
          <div className="pm-info-section">
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '12px', textTransform: 'uppercase' }}>Files</p>
            <div className="pm-accordion-item">
              <span><Icon name="image" size="sm" style={{ marginRight: '8px' }} /> 265 photos</span>
              <Icon name="chevron-up" />
            </div>
            <div className="pm-media-grid" style={{ marginTop: '12px' }}>
              <div className="pm-media-item"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200" alt="office" /></div>
              <div className="pm-media-item"><img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=200" alt="meeting" /></div>
            </div>
          </div>
        </div>

        <div className="pm-info-card" style={{ background: '#eeecff', color: '#1a1a1a' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <h3 style={{ margin: 0 }}>23 members</h3>
             <Icon name="close" style={{ opacity: 0.2, height: '14px' }} />
          </div>
          <div className="pm-member-list">
             <div className="pm-member-item">
               <Avatar name="Tanisha Combs" initials="TC" tone="violet" size="sm" />
               <span className="name">Tanisha Combs</span>
               <span className="role">admin</span>
             </div>
             <div className="pm-member-item">
               <Avatar name="Alex Hunt" initials="AH" tone="teal" size="sm" />
               <span className="name">Alex Hunt</span>
             </div>
          </div>
        </div>
      </aside>
    </div>
  );`;

// Replacing lines 2223 to 2297 (indices 2222 to 2296)
lines.splice(2222, 2297 - 2223 + 1, newContent);
fs.writeFileSync('src/ProMatchDarkApp.jsx', lines.join('\n'));
console.log('Success');
