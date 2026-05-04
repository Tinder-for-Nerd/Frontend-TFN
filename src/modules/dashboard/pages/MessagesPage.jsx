import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cx } from '../../../utils/helpers';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Icon, Avatar, Badge } from '../../../components/ui';
import { studentThreads, proThreads, profiles } from '../../../data/mockData';
import '../../../styles/messages.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
];

const PAGE_META = {
  student: {
    title: 'Messages | Tinder for Nerds',
    subtitle: 'Keep the momentum high with real-time conversations.',
    heading: 'Messages',
  },
  pro: {
    title: 'Inbox | Tinder for Nerds',
    subtitle: 'Keep the momentum high with real-time conversations.',
    heading: 'Inbox',
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ThreadItem({ thread, isActive, onSelect }) {
  const hasUnread = thread.unread > 0;
  return (
    <button
      className={cx('wa-thread', isActive && 'is-active')}
      onClick={() => onSelect(thread.id)}
      aria-current={isActive ? 'true' : undefined}
    >
      <div className="wa-thread__avatar-wrap">
        <Avatar
          name={thread.person.name}
          src={thread.person.avatar_url}
          initials={thread.person.avatar}
          tone={thread.person.tone}
          size="lg"
        />
        {thread.status === 'Online' && <span className="wa-thread__online-dot" />}
      </div>

      <div className="wa-thread__body">
        <div className="wa-thread__row">
          <span className={cx('wa-thread__name', hasUnread && 'is-unread')}>
            {thread.person.name}
          </span>
          <span className={cx('wa-thread__time', hasUnread && 'is-unread')}>
            {thread.time}
          </span>
        </div>
        <div className="wa-thread__row">
          <p className={cx('wa-thread__preview', hasUnread && 'is-unread')}>
            {thread.last}
          </p>
          {hasUnread && (
            <span className="wa-thread__badge">{thread.unread}</span>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageBubble({ msg, isLast }) {
  const isSent = msg.from === 'me';
  return (
    <div className={cx('wa-bubble', isSent ? 'is-sent' : 'is-received')}>
      <div className="wa-bubble__tail" />
      <p className="wa-bubble__text">{msg.body}</p>
      <span className="wa-bubble__meta">
        <span>{msg.time}</span>
        {isSent && (
          <Icon
            name="check-double"
            size={14}
            className={cx('wa-bubble__check', isLast && 'is-seen')}
            aria-label="Seen"
          />
        )}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="wa-empty" role="status" aria-label="No conversation selected">
      <div className="wa-empty__visual">
        <div className="wa-empty__ring">
          <Icon name="message-circle" size={56} />
        </div>
      </div>
      <h2 className="wa-empty__title">Tinder for Nerds Web</h2>
      <p className="wa-empty__desc">
        Send and receive messages with builders and mentors.
        <br />
        Select a conversation from the sidebar to get started.
      </p>
      <div className="wa-empty__security">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>End-to-end encrypted</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MessagesPage({ variant = 'student' }) {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const threads = variant === 'student' ? studentThreads : proThreads;
  const meta = PAGE_META[variant] ?? PAGE_META.student;

  const [activeThread, setActiveThread] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  usePageMeta(meta.title, meta.subtitle);

  // Sync active thread with URL param
  useEffect(() => {
    const match = threads.find((t) => t.id === threadId);
    setActiveThread(match ?? threads[0] ?? null);
  }, [threadId, threads]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeThread]);

  const handleThreadSelect = useCallback(
    (id) => navigate(`/${variant}/messages/${id}`),
    [navigate, variant]
  );

  const handleSendMessage = useCallback(
    (e) => {
      e?.preventDefault();
      if (!message.trim()) return;
      setMessage('');
      inputRef.current?.focus();
    },
    [message]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const filteredThreads = threads.filter((t) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      t.person.name.toLowerCase().includes(query) ||
      t.last.toLowerCase().includes(query);
    const matchesFilter = filter === 'all' || (filter === 'unread' && t.unread > 0);
    return matchesSearch && matchesFilter;
  });

  const canSend = message.trim().length > 0;
  const msgCount = activeThread?.messages?.length ?? 0;

  return (
    <AppShell
      variant={variant}
      title={meta.heading}
      subtitle={meta.subtitle}
      hideTopbar
      className="pm-messages-shell"
    >
      <div className="wa-layout">
        {/* ── Thread sidebar ── */}
        <aside className="wa-sidebar" aria-label="Conversations">
          {/* Sidebar header */}
          <header className="wa-sidebar__head">
            <div className="wa-sidebar__top">
              <h1 className="wa-sidebar__title">Chats</h1>
              <div className="wa-sidebar__icons">
                <button className="wa-icon-btn" aria-label="New chat" title="New chat">
                  <Icon name="plus" size={20} />
                </button>
                <button className="wa-icon-btn" aria-label="More options" title="More options">
                  <Icon name="more" size={20} />
                </button>
              </div>
            </div>

            <div className="wa-search" role="search">
              <Icon name="search" size={16} className="wa-search__icon" />
              <input
                type="search"
                className="wa-search__input"
                placeholder="Search or start new chat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search conversations"
              />
            </div>

            <div className="wa-tabs" role="tablist">
              {FILTER_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  role="tab"
                  aria-selected={filter === value}
                  className={cx('wa-tab', filter === value && 'is-active')}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </header>

          {/* Thread list */}
          <div className="wa-thread-list" role="listbox">
            {filteredThreads.length === 0 ? (
              <div className="wa-thread-list__empty">
                <Icon name="search" size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                <p>No conversations found</p>
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <ThreadItem
                  key={thread.id}
                  thread={thread}
                  isActive={activeThread?.id === thread.id}
                  onSelect={handleThreadSelect}
                />
              ))
            )}
          </div>
        </aside>

        {/* ── Chat panel ── */}
        <main className="wa-chat" aria-label="Conversation">
          {activeThread ? (
            <>
              {/* Chat header */}
              <header className="wa-chat__head">
                <button
                  className="wa-chat__contact"
                  aria-label={`View ${activeThread.person.name}'s profile`}
                >
                  <Avatar
                    name={activeThread.person.name}
                    src={activeThread.person.avatar_url}
                    initials={activeThread.person.avatar}
                    tone={activeThread.person.tone}
                    size="md"
                  />
                  <div className="wa-chat__contact-info">
                    <span className="wa-chat__contact-name">{activeThread.person.name}</span>
                    <span className="wa-chat__contact-status">
                      {activeThread.status === 'Online' && (
                        <span className="wa-status-dot" />
                      )}
                      {activeThread.status}
                    </span>
                  </div>
                </button>

                <div className="wa-chat__head-actions">
                  <button className="wa-icon-btn" aria-label="Video call" title="Video call">
                    <Icon name="video" size={20} />
                  </button>
                  <button className="wa-icon-btn" aria-label="Voice call" title="Voice call">
                    <Icon name="phone" size={20} />
                  </button>
                  <button className="wa-icon-btn" aria-label="Search in chat" title="Search">
                    <Icon name="search" size={20} />
                  </button>
                  <button className="wa-icon-btn" aria-label="Chat options" title="Options">
                    <Icon name="more" size={20} />
                  </button>
                </div>
              </header>

              {/* Messages area */}
              <div
                className="wa-messages"
                ref={scrollRef}
                role="log"
                aria-live="polite"
              >
                <div className="wa-messages__inner">
                  <div className="wa-date-chip">
                    <span>TODAY</span>
                  </div>

                  {activeThread.messages?.map((msg, i) => (
                    <MessageBubble key={msg.id} msg={msg} isLast={i === msgCount - 1} />
                  ))}
                </div>
              </div>

              {/* Composer */}
              <form
                className="wa-composer"
                onSubmit={handleSendMessage}
                aria-label="Compose message"
              >
                <button className="wa-icon-btn" type="button" aria-label="Emoji">
                  <Icon name="smile" size={22} />
                </button>
                <button className="wa-icon-btn" type="button" aria-label="Attach file">
                  <Icon name="plus" size={22} />
                </button>

                <div className="wa-composer__input-area">
                  <input
                    ref={inputRef}
                    type="text"
                    className="wa-composer__input"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Message input"
                  />
                </div>

                <button
                  className={cx('wa-icon-btn wa-composer__send', canSend && 'is-active')}
                  type={canSend ? 'submit' : 'button'}
                  aria-label={canSend ? 'Send message' : 'Voice message'}
                >
                  <Icon name={canSend ? 'send' : 'microphone'} size={22} />
                </button>
              </form>
            </>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </AppShell>
  );
}