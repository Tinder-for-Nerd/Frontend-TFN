import { useMemo, useRef, useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Avatar, Badge, Button, Icon } from '../../../components/ui';
import { profiles } from '../../../constants/profiles';
import '../../../styles/student-feed.css';

export function StudentFeedPage() {
  const composerRef = useRef(null);
  const [query, setQuery] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
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
  };

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
            onClick={() =>
              composerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          >
            New post
          </Button>
        </div>
      }
    >
      <div className="pm-student-feed">
        <section
          ref={composerRef}
          className="pm-student-feed__composer pm-card"
          aria-label="Create post"
        >
          <div className="pm-student-feed__composer-head">
            <Avatar
              name={profiles.me.name}
              src={profiles.me.src}
              initials={profiles.me.avatar}
              tone={profiles.me.tone}
              size="md"
            />
            <div className="pm-student-feed__composer-meta">
              <strong>Share an update</strong>
              <span>Keep it short. Link work when possible.</span>
            </div>
          </div>

          <textarea
            className="pm-student-feed__textarea"
            value={newPostContent}
            onChange={(event) => setNewPostContent(event.target.value)}
            placeholder="What are you building this week?"
          />

          <div className="pm-student-feed__composer-actions">
            <div className="pm-student-feed__composer-tools" aria-label="Add attachment">
              <button
                className="pm-icon-button pm-student-feed__tool"
                type="button"
                aria-label="Add link"
              >
                <Icon name="connections" size={18} />
              </button>
              <button
                className="pm-icon-button pm-student-feed__tool"
                type="button"
                aria-label="Add image"
              >
                <Icon name="spark" size={18} />
              </button>
              <button
                className="pm-icon-button pm-student-feed__tool"
                type="button"
                aria-label="Add document"
              >
                <Icon name="events" size={18} />
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

        <section className="pm-student-feed__list" aria-label="Network posts">
          {filteredPosts.length === 0 ? (
            <div className="pm-student-feed__empty pm-card">
              <Badge tone="teal" variant="soft">
                No results
              </Badge>
              <h2>Nothing matched your search.</h2>
              <p>Try searching for a name, skill, or topic.</p>
            </div>
          ) : (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </section>
      </div>
    </AppShell>
  );
}

function PostCard({ post }) {
  const iconForType = (type) => {
    if (type === 'image') return 'spark';
    if (type === 'link') return 'connections';
    return 'events';
  };

  return (
    <article className="pm-student-post pm-card">
      <header className="pm-student-post__head">
        <div className="pm-student-post__identity">
          <Avatar
            name={post.author.name}
            src={post.author.src}
            initials={post.author.avatar}
            tone={post.author.tone}
            size="md"
          />
          <div className="pm-student-post__meta">
            <div className="pm-student-post__name-row">
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

        <button className="pm-icon-button pm-student-post__menu" type="button" aria-label="Post options">
          <Icon name="more" size={18} />
        </button>
      </header>

      <div className="pm-student-post__body">
        <p>{post.content}</p>
      </div>

      {post.attachments?.length ? (
        <div className="pm-student-post__attachments">
          {post.attachments.map((attachment) => (
            <a key={attachment.name} className="pm-student-attachment" href={attachment.url}>
              <span className="pm-student-attachment__icon" aria-hidden="true">
                <Icon name={iconForType(attachment.type)} size={18} />
              </span>
              <span className="pm-student-attachment__copy">
                <strong>{attachment.name}</strong>
                <span>{attachment.type?.toUpperCase?.() ?? 'ATTACHMENT'}</span>
              </span>
              <Icon name="chevron-right" size={18} className="pm-student-attachment__chev" />
            </a>
          ))}
        </div>
      ) : null}

      <footer className="pm-student-post__footer">
        <button className="pm-student-post__action" type="button" aria-label="Like">
          <Icon name="spark" size={18} />
          <span>{post.likes}</span>
        </button>
        <button className="pm-student-post__action" type="button" aria-label="Comment">
          <Icon name="messages" size={18} />
          <span>{post.comments}</span>
        </button>
        <button className="pm-student-post__action pm-student-post__action--end" type="button" aria-label="Share">
          <Icon name="connections" size={18} />
        </button>
      </footer>
    </article>
  );
}

