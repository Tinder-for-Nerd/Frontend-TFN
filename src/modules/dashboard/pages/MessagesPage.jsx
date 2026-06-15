import { useState, useEffect, useRef, useCallback } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { cx } from '../../../utils/helpers';

import { usePageMeta } from '../../../hooks/usePageMeta';

import { useChat } from '../../../hooks/useChat';

import { useSocket } from '../../../hooks/useSocket';

import { AppShell } from '../../../components/layout';

import { Icon, Avatar } from '../../../components/ui';

import { getDashboardMessages } from '../../../data/dashboardMessages';

import '../../../styles/messages.css';



const FILTER_OPTIONS = [

  { value: 'all', label: 'All' },

  { value: 'unread', label: 'Unread' },

];



function ThreadItem({ thread, isActive, onSelect, status, isOnline, isTyping }) {

  const hasUnread = thread.unread > 0;

  const preview = isTyping ? 'typing…' : thread.last;



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

        {isOnline ? <span className="wa-thread__online-dot" /> : null}

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

          <p className={cx('wa-thread__preview', hasUnread && 'is-unread', isTyping && 'is-typing')}>

            {preview}

          </p>

          {hasUnread ? <span className="wa-thread__badge">{thread.unread}</span> : null}

        </div>

        <span className="wa-thread__presence">{status}</span>

      </div>

    </button>

  );

}



function MessageBubble({ msg, isLast }) {

  const isSent = msg.from === 'me';

  const isSeen = isSent && msg.read === true;



  return (

    <div className={cx('wa-bubble', isSent ? 'is-sent' : 'is-received')}>

      <div className="wa-bubble__tail" />

      <p className="wa-bubble__text">{msg.body}</p>

      <span className="wa-bubble__meta">

        <span>{msg.time}</span>

        {isSent ? (

          <Icon

            name="check-double"

            size={14}

            className={cx('wa-bubble__check', isSeen && 'is-seen')}

            aria-label={isSeen ? 'Read' : 'Delivered'}

          />

        ) : null}

      </span>

    </div>

  );

}



function TypingIndicator() {

  return (

    <div className="wa-typing" aria-live="polite" aria-label="Contact is typing">

      <span className="wa-typing__dot" />

      <span className="wa-typing__dot" />

      <span className="wa-typing__dot" />

    </div>

  );

}



function EmptyState({ variant = 'student' }) {
  const { messages } = getDashboardMessages(variant);

  return (

    <div className="wa-empty" role="status" aria-label="No conversation selected">

      <div className="wa-empty__visual">

        <div className="wa-empty__ring">

          <Icon name="message-circle" size={56} />

        </div>

      </div>

      <h2 className="wa-empty__title">{messages.emptyTitle}</h2>

      <p className="wa-empty__desc">

        {messages.emptyDescription}

        <br />

        {messages.emptyHint}

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



export function MessagesPage({ variant = 'student' }) {

  const { threadId } = useParams();

  const navigate = useNavigate();

  const scrollRef = useRef(null);

  const inputRef = useRef(null);

  const { status: socketStatus, isConnected } = useSocket();



  const {

    threads,

    activeThread,

    sendMessage,

    handleTyping,

    stopTyping,

    getThreadStatus,

    isThreadOnline,

    isThreadTyping,

  } = useChat({ variant });



  const meta = getDashboardMessages(variant).messages;

  const [message, setMessage] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const [filter, setFilter] = useState('all');



  usePageMeta(meta.pageTitle, meta.subtitle);



  useEffect(() => {

    const previousBodyOverflow = document.body.style.overflow;

    const previousHtmlOverflow = document.documentElement.style.overflow;



    document.body.style.overflow = 'hidden';

    document.documentElement.style.overflow = 'hidden';

    document.body.classList.add('pm-messages-page-active');

    document.documentElement.classList.add('pm-messages-page-active');



    return () => {

      document.body.style.overflow = previousBodyOverflow;

      document.documentElement.style.overflow = previousHtmlOverflow;

      document.body.classList.remove('pm-messages-page-active');

      document.documentElement.classList.remove('pm-messages-page-active');

    };

  }, []);



  useEffect(() => {

    if (scrollRef.current) {

      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    }

  }, [activeThread?.messages?.length, activeThread?.id, isThreadTyping(activeThread?.id)]);



  const inboxPath = variant === 'pro' ? '/pro/inbox' : '/student/messages';



  const handleThreadSelect = useCallback(

    (id) => navigate(`${inboxPath}/${id}`),

    [navigate, inboxPath],

  );



  const handleSendMessage = useCallback(

    (e) => {

      e?.preventDefault();

      if (!message.trim() || !activeThread) return;



      if (sendMessage(message)) {

        setMessage('');

        window.setTimeout(() => {

          if (scrollRef.current) {

            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

          }

        }, 50);

        inputRef.current?.focus();

      }

    },

    [message, activeThread, sendMessage],

  );



  const handleKeyDown = useCallback(

    (e) => {

      if (e.key === 'Enter' && !e.shiftKey) {

        e.preventDefault();

        handleSendMessage();

      }

    },

    [handleSendMessage],

  );



  const handleInputChange = useCallback(

    (event) => {

      setMessage(event.target.value);

      handleTyping();

    },

    [handleTyping],

  );



  const filteredThreads = threads.filter((thread) => {

    const query = searchQuery.toLowerCase();

    const matchesSearch =

      thread.person.name.toLowerCase().includes(query) ||

      thread.last.toLowerCase().includes(query);

    const matchesFilter = filter === 'all' || (filter === 'unread' && thread.unread > 0);

    return matchesSearch && matchesFilter;

  });



  const canSend = message.trim().length > 0;

  const msgCount = activeThread?.messages?.length ?? 0;

  const hasSelectedThread = Boolean(threadId && activeThread);

  const activeIsTyping = activeThread ? isThreadTyping(activeThread.id) : false;

  const activeStatus = activeThread ? getThreadStatus(activeThread) : '';

  const activeIsOnline = activeThread ? isThreadOnline(activeThread) : false;

  const connectionLabel =

    socketStatus === 'mock'

      ? 'Live (demo)'

      : isConnected

        ? 'Connected'

        : 'Reconnecting…';



  return (

    <AppShell

      variant={variant}

      title={meta.heading}

      subtitle={meta.subtitle}

      hideTopbar

      className="pm-messages-shell"

    >

      <div className={cx('wa-layout', hasSelectedThread && 'is-mobile-thread-open')}>

        <aside className="wa-sidebar" aria-label="Conversations">

          <header className="wa-sidebar__head">

            <div className="wa-sidebar__top">

              <h1 className="wa-sidebar__title">{meta.sidebarTitle}</h1>

              <div className="wa-sidebar__icons">

                <span className="wa-socket-status" title={`Socket: ${connectionLabel}`}>

                  <span

                    className={cx(

                      'wa-socket-status__dot',

                      isConnected && 'is-live',

                      socketStatus === 'mock' && 'is-mock',

                    )}

                  />

                  {connectionLabel}

                </span>

                <button className="wa-icon-btn" aria-label="New chat" title="New chat">

                  <Icon name="plus" size={20} />

                </button>

              </div>

            </div>



            <div className="wa-search" role="search">

              <Icon name="search" size={16} className="wa-search__icon" />

              <input

                type="search"

                className="wa-search__input"

                placeholder={meta.searchPlaceholder}

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

                  status={getThreadStatus(thread)}

                  isOnline={isThreadOnline(thread)}

                  isTyping={isThreadTyping(thread.id)}

                />

              ))

            )}

          </div>

        </aside>



        <main className="wa-chat" aria-label="Conversation">

          {activeThread ? (

            <>

              <header className="wa-chat__head">

                <button

                  className="wa-icon-btn wa-chat__back"

                  type="button"

                  aria-label="Back to conversations"

                  onClick={() => navigate(inboxPath)}

                >

                  <Icon name="chevron-left" size={20} />

                </button>



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

                      {activeIsOnline ? <span className="wa-status-dot" /> : null}

                      {activeStatus}

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

                </div>

              </header>



              <div className="wa-messages" ref={scrollRef} role="log" aria-live="polite">

                <div className="wa-messages__inner">

                  <div className="wa-date-chip">

                    <span>TODAY</span>

                  </div>



                  {activeThread.messages?.map((msg, index) => (

                    <MessageBubble

                      key={msg.id}

                      msg={msg}

                      isLast={index === msgCount - 1 && !activeIsTyping}

                    />

                  ))}



                  {activeIsTyping ? <TypingIndicator /> : null}

                </div>

              </div>



              <form

                className="wa-composer"

                onSubmit={handleSendMessage}

                aria-label="Compose message"

              >

                <button className="wa-icon-btn" type="button" aria-label="Emoji">

                  <Icon name="smile" size={22} />

                </button>



                <div className="wa-composer__input-area">

                  <input

                    ref={inputRef}

                    type="text"

                    className="wa-composer__input"

                    placeholder="Type a message"

                    value={message}

                    onChange={handleInputChange}

                    onKeyDown={handleKeyDown}

                    onBlur={stopTyping}

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

            <EmptyState variant={variant} />

          )}

        </main>

      </div>

    </AppShell>

  );

}


