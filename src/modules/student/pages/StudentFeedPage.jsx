import { useMemo, useRef, useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Avatar, Badge, Button, Icon } from '../../../components/ui';
import { profiles } from '../../../constants/profiles';
import '../../../styles/student-feed.css';

export function StudentFeedPage() {
  const composerRef = useRef(null);
  const [query, setQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [posts, setPosts] = useState(() => [
    {
      id: 1,
      author: profiles.sarah,
      content:
        'Just published a guide on modern React architecture: state management, routing, and performance optimization. Feedback welcome.',
      timestamp: '2 hours ago',
      attachments: [{ type: 'link', name: 'React Architecture Guide', url: '#' }],
      likes: 24,
      comments: 5,
      trending: true,
    },
    {
      id: 2,
      author: profiles.raj,
      content:
        'Working on an open source project for distributed task scheduling. Looking for contributors interested in Python and Redis.',
      timestamp: '5 hours ago',
      attachments: [{ type: 'image', name: 'architecture.png', url: '#' }],
      likes: 42,
      comments: 12,
      trending: false,
    },
    {
      id: 3,
      author: profiles.priya,
      content:
        'Slides from my talk on Machine Learning for FinTech: fraud detection and credit scoring models.',
      timestamp: '1 day ago',
      attachments: [{ type: 'document', name: 'ML_FinTech_Slides.pdf', url: '#' }],
      likes: 89,
      comments: 18,
      trending: false,
    },
  ]);

  const filteredPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return posts;
    return posts.filter((post) => {
      const author = post.author?.name?.toLowerCase?.() ?? '';
      const content = post.content?.toLowerCase?.() ?? '';
      return author.includes(needle) || content.includes(needle);
    });
  }, [posts, query]);

  const handleCreatePost = () => {
    const trimmed = newPostContent.trim();
    if (!trimmed) return;

    const newPost = {
      id: Date.now(),
      author: profiles.me,
      content: trimmed,
      timestamp: 'Just now',
      attachments: [],
      likes: 0,
      comments: 0,
      trending: false,
    };

    setPosts((existing) => [newPost, ...existing]);
    setNewPostContent('');
    setComposerOpen(false);
  };

  const handleOpenComposer = () => {
    setComposerOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        window.requestAnimationFrame(() => {
          composerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      return nextOpen;
    });
  };

  const trendingTopics = useMemo(
    () => [
      { label: 'React Server Components', meta: '1,284 mentions today' },
      { label: 'Hackathon co-founders', meta: '928 mentions today' },
      { label: 'Distributed systems', meta: '744 mentions today' },
      { label: 'Figma to React', meta: '612 mentions today' },
    ],
    []
  );

  const peopleToFollow = useMemo(
    () => [
      { id: 'follow-sarah', person: profiles.sarah, note: 'Founder mentor · Product' },
      { id: 'follow-raj', person: profiles.raj, note: 'Backend · Distributed systems' },
      { id: 'follow-priya', person: profiles.priya, note: 'FinTech ML · Fraud detection' },
    ],
    []
  );

  return (
    <AppShell
      variant="student"
      title="Feed"
      subtitle="Updates from your network. Share progress, ask for help, and spot collaborators."
      actions={
        <div className="pm-student-feed__actions">
          <div className="pm-student-feed__search" role="search">
            <Icon name="search" size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts..."
              type="search"
            />
          </div>
          <Button
            variant="primary"
            icon="plus"
            onClick={handleOpenComposer}
          >
            New post
          </Button>
        </div>
      }
    >
      <div className="pm-li-feed">
        <div className="pm-li-feed__main">
          {composerOpen ? (
            <section
              ref={composerRef}
              className="pm-li-composer pm-card"
              aria-label="Create post"
            >
              <div className="pm-li-composer__row">
                <Avatar
                  name={profiles.me.name}
                  src={profiles.me.src}
                  initials={profiles.me.avatar}
                  tone={profiles.me.tone}
                  size="md"
                />
                <textarea
                  className="pm-li-composer__input"
                  value={newPostContent}
                  onChange={(event) => setNewPostContent(event.target.value)}
                  placeholder="Start a post"
                  rows={3}
                  autoFocus
                />
              </div>

              <div className="pm-li-composer__bar">
                <div className="pm-li-composer__tools" aria-label="Add to your post">
                  <button className="pm-li-tool" type="button">
                    <Icon name="spark" size={18} />
                    <span>Media</span>
                  </button>
                  <button className="pm-li-tool" type="button">
                    <Icon name="events" size={18} />
                    <span>Event</span>
                  </button>
                  <button className="pm-li-tool" type="button">
                    <Icon name="connections" size={18} />
                    <span>Link</span>
                  </button>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                >
                  Post
                </Button>
              </div>
            </section>
          ) : null}

          <div className="pm-li-sort" aria-label="Sort feed">
            <span>Sort by:</span>
            <button className="pm-li-sort__btn" type="button">
              Top <Icon name="chevron-down" size={16} />
            </button>
            <span className="pm-li-sort__line" aria-hidden="true" />
          </div>

          <section className="pm-li-feed__list" aria-label="Network posts">
            {filteredPosts.length === 0 ? (
              <div className="pm-student-feed__empty pm-card">
                <Badge tone="teal" variant="soft">
                  No results
                </Badge>
                <h2>Nothing matched your search.</h2>
                <p>Try searching for a name, skill, or topic.</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  commenting={activeCommentId === post.id}
                  onToggleComment={() =>
                    setActiveCommentId((current) => (current === post.id ? null : post.id))
                  }
                />
              ))
            )}
          </section>
        </div>

        <aside className="pm-li-feed__rail" aria-label="Right rail">
          <section className="pm-li-rail-card pm-card">
            <h2>Trending</h2>
            <div className="pm-li-topic-list">
              {trendingTopics.map((topic) => (
                <button key={topic.label} className="pm-li-topic" type="button">
                  <strong>{topic.label}</strong>
                  <span>{topic.meta}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="pm-li-rail-card pm-card">
            <h2>People you may know</h2>
            <div className="pm-li-follow-list">
              {peopleToFollow.map((item) => (
                <div key={item.id} className="pm-li-follow">
                  <Avatar
                    name={item.person.name}
                    src={item.person.src}
                    initials={item.person.avatar}
                    tone={item.person.tone}
                    size="md"
                  />
                  <div className="pm-li-follow__meta">
                    <strong>{item.person.name}</strong>
                    <span>{item.note}</span>
                  </div>
                  <Button variant="secondary" size="sm">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

function PostCard({ post, commenting, onToggleComment }) {
  const iconForType = (type) => {
    if (type === 'image') return 'spark';
    if (type === 'link') return 'connections';
    return 'events';
  };

  return (
    <article className="pm-li-post pm-card">
      <header className="pm-li-post__head">
        <div className="pm-li-post__identity">
          <Avatar
            name={post.author.name}
            src={post.author.src}
            initials={post.author.avatar}
            tone={post.author.tone}
            size="md"
          />
          <div className="pm-li-post__meta">
            <div className="pm-li-post__name-row">
              <strong>{post.author.name}</strong>
              {post.trending ? (
                <Badge tone="teal" variant="soft">
                  Trending
                </Badge>
              ) : null}
            </div>
            <span>
              {(post.author.title || post.author.role) ?? 'Member'} · {post.timestamp}
            </span>
          </div>
        </div>

        <div className="pm-li-post__head-actions">
          <button className="pm-li-follow-btn" type="button">
            Follow
          </button>
          <button className="pm-icon-button pm-li-post__menu" type="button" aria-label="Post options">
          <Icon name="more" size={18} />
          </button>
        </div>
      </header>

      <div className="pm-li-post__body">
        <p>{post.content}</p>
      </div>

      {post.attachments?.length ? (
        <div className="pm-li-post__attachments">
          {post.attachments.map((attachment) => (
            <a key={attachment.name} className="pm-li-attachment" href={attachment.url}>
              <span className="pm-li-attachment__icon" aria-hidden="true">
                <Icon name={iconForType(attachment.type)} size={18} />
              </span>
              <span className="pm-li-attachment__copy">
                <strong>{attachment.name}</strong>
                <span>{attachment.type?.toUpperCase?.() ?? 'ATTACHMENT'}</span>
              </span>
              <Icon name="chevron-right" size={18} className="pm-li-attachment__chev" />
            </a>
          ))}
        </div>
      ) : null}

      <div className="pm-li-post__reactions" aria-label="Reactions summary">
        <div className="pm-li-post__reaction-left">
          <span className="pm-li-reaction-pill" aria-hidden="true">
            <Icon name="thumbs-up" size={14} />
          </span>
          <span>{post.likes}</span>
        </div>
        <div className="pm-li-post__reaction-right">
          <span>{post.comments} comments</span>
        </div>
      </div>

      <footer className="pm-li-post__footer" aria-label="Post actions">
        <button className="pm-li-action" type="button">
          <Icon name="thumbs-up" size={18} />
          <span>Like</span>
        </button>
        <button className="pm-li-action" type="button" onClick={onToggleComment}>
          <Icon name="message-circle" size={18} />
          <span>Comment</span>
        </button>
        <button className="pm-li-action" type="button">
          <Icon name="repeat" size={18} />
          <span>Repost</span>
        </button>
        <button className="pm-li-action" type="button">
          <Icon name="send" size={18} />
          <span>Send</span>
        </button>
      </footer>

      {commenting ? (
        <div className="pm-li-comment" aria-label="Write a comment">
          <Avatar
            name={profiles.me.name}
            src={profiles.me.src}
            initials={profiles.me.avatar}
            tone={profiles.me.tone}
            size="sm"
          />
          <input className="pm-li-comment__input" placeholder="Add a comment..." />
          <button className="pm-icon-button" type="button" aria-label="Post comment">
            <Icon name="send" size={18} />
          </button>
        </div>
      ) : null}
    </article>
  );
}
