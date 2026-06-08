const fs = require('fs');
let code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');
const lines = code.split('\n');

// 1. Restore AppRoutes (which was roughly around where my script mangled it)
// We know it starts around line 3390-3400.
// Let's find 'function AppRoutes'
let appRoutesIndex = lines.findIndex(l => l.includes('function AppRoutes()'));
if (appRoutesIndex !== -1) {
    const appRoutesContent = `function AppRoutes() {
  useLightThemeClass();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        <Route path="/pro" element={<ProHomePage />} />
        <Route path="/pro/discover" element={<DiscoverPage variant="pro" />} />
        <Route path="/pro/network" element={<NetworkPage />} />
        <Route path="/pro/messages" element={<MessagesPage variant="pro" />} />
        <Route path="/pro/messages/:threadId" element={<MessagesPage variant="pro" />} />
        <Route path="/pro/calendar" element={<ProCalendarPage />} />
        <Route path="/pro/profile" element={<ProfilePage />} />
        <Route path="/pro/settings" element={<ProSettingsPage />} />

        <Route path="/student" element={<StudentHomePage />} />
        <Route path="/student/discover" element={<DiscoverPage variant="student" />} />
        <Route path="/student/messages" element={<MessagesPage variant="student" />} />
        <Route path="/student/messages/:threadId" element={<MessagesPage variant="student" />} />
        <Route path="/student/sessions" element={<SessionsPage />} />
        <Route path="/student/events" element={<EventsPage variant="student" />} />
        <Route path="/student/events/:eventId" element={<EventsPage variant="student" />} />
        <Route path="/student/progress" element={<StudentProgressPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call/:sessionId" element={<CallPage />} />

        <Route path="/discover" element={<Navigate to="/student/discover" replace />} />
        <Route path="/matches" element={<Navigate to="/student/discover" replace />} />
        <Route path="/chat" element={<Navigate to="/student/messages" replace />} />
        <Route path="/chat/:threadId" element={<Navigate to="/student/messages" replace />} />
        <Route path="/booking" element={<Navigate to="/student/sessions" replace />} />
        <Route path="/booking/:professionalId" element={<Navigate to="/student/sessions" replace />} />
        <Route path="/events/:eventId" element={<Navigate to="/student/events" replace />} />
        <Route path="/profile/:userId" element={<Navigate to="/profile/me" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}`;
    // Replace from appRoutesIndex to the end of the component
    let endOfAppRoutes = -1;
    for (let i = appRoutesIndex; i < lines.length; i++) {
        if (lines[i].includes('export default function ProMatchDarkApp')) {
            endOfAppRoutes = i - 1;
            break;
        }
    }
    if (endOfAppRoutes !== -1) {
        lines.splice(appRoutesIndex, endOfAppRoutes - appRoutesIndex + 1, appRoutesContent);
    }
}

// 2. Fix MessagesPage return statement
let msgPageIndex = lines.findIndex(l => l.includes('function MessagesPage'));
if (msgPageIndex !== -1) {
    let startRet = -1;
    let endRet = -1;
    for (let i = msgPageIndex; i < lines.length; i++) {
        if (lines[i].includes('return (') && startRet === -1) {
            startRet = i;
        }
        if (startRet !== -1 && lines[i].includes(');')) {
            // Check if next line is end of function
            if (lines[i+1] && lines[i+1].includes('}')) {
                endRet = i;
                break;
            }
        }
    }

    if (startRet !== -1 && endRet !== -1) {
        const premiumReturn = `  return (
    <AppShell
      variant={variant}
      title={variant === 'pro' ? 'Inbox' : 'Messages'}
      subtitle={variant === 'pro' ? 'Business conversations and partner follow-ups' : 'Keep the conversation moving'}
    >
      <div className="pm-premium-messages">
        <aside className="pm-premium-threads">
          <div className="search-box">
            <Icon name="search" />
            <input type="text" placeholder="Search" />
          </div>
          <div className="pm-thread-list-container" style={{ flex: 1, overflowY: 'auto' }}>
            {threads.map((thread) => (
              <div key={thread.id} className={cx('pm-premium-thread-item', activeThreadId === thread.id && 'is-active')} onClick={() => setActiveThreadId(thread.id)}>
                <Avatar name={thread.person.name} initials={thread.person.avatar} tone={thread.person.tone} size="md" online={thread.status === 'Online'} />
                <div className="item-body">
                  <div className="item-meta"><strong>{thread.person.name}</strong><span>{thread.time}</span></div>
                  <p>{thread.last}</p>
                </div>
                {thread.unread ? <span className="count">{thread.unread}</span> : null}
              </div>
            ))}
          </div>
        </aside>

        <section className="pm-premium-chat">
          <header className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar name={activeThread.person.name} initials={activeThread.person.avatar} tone={activeThread.person.tone} size="sm" online={activeThread.status === 'Online'} />
              <div><h2 style={{ fontSize: '16px' }}>{activeThread.person.name}</h2><span style={{ fontSize: '11px' }}>{activeThread.status}</span></div>
            </div>
            <div className="pm-card-actions">
              <button className="pm-icon-button"><Icon name="search" /></button>
              <button className="pm-icon-button"><Icon name="phone" /></button>
              <button className="pm-icon-button"><Icon name="more" /></button>
            </div>
          </header>
          <div className="chat-body">
            {activeThread.messages.map((msg) => (
              <div key={msg.id} className={cx('pm-message-group', msg.from === 'me' && 'is-me')}>
                {msg.from !== 'me' && <Avatar name={activeThread.person.name} initials={activeThread.person.avatar} tone={activeThread.person.tone} size="sm" />}
                <div className="pm-bubble-stack">
                  {msg.from !== 'me' && <small style={{ display: 'block', fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>{activeThread.person.name}</small>}
                  <div className="pm-message-bubble-modern">{msg.body}</div>
                  <div className="pm-message-info"><span>{msg.time}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="pm-chat-input-area">
            <div className="pm-chat-input-container">
              <Icon name="attachment" style={{ opacity: 0.5 }} /><input type="text" placeholder="Your message" /><Icon name="mic" style={{ opacity: 0.5 }} /><Icon name="send" style={{ color: '#5b4bf5', cursor: 'pointer' }} />
            </div>
          </div>
        </section>

        <aside className="pm-premium-info">
          <div className="pm-info-card">
            <h3 style={{ fontSize: '14px' }}>Group Info</h3>
            <div className="pm-info-section">
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#888' }}>Files</p>
              <div className="pm-accordion-item"><span><Icon name="image" size="sm" /> 265 photos</span><Icon name="chevron-up" /></div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );`;
        lines.splice(startRet, endRet - startRet + 1, premiumReturn);
    }
}

fs.writeFileSync('src/ProMatchDarkApp.jsx', lines.join('\n'));
console.log('Repaired!');
