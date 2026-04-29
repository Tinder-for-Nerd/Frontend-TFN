import { useState } from 'react';
import { Icon, Button } from '../ui';
import '../../styles/messages.css';

export function MessagesPage() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Maya Chen',
      role: 'Founder',
      lastMessage: 'Excited to chat!',
      timestamp: '2m ago',
      unread: 2,
    },
    {
      id: 2,
      name: 'Andre Patel',
      role: 'Product Lead',
      lastMessage: 'Let me check the calendar...',
      timestamp: '1h ago',
      unread: 0,
    },
  ]);

  return (
    <div className="pm-messages-page">
      <header className="pm-messages-header">
        <h1 className="pm-messages-header__title">Messages</h1>
        <Button variant="ghost" size="sm">
          <Icon name="search" />
        </Button>
      </header>

      <div className="pm-conversations-list">
        {conversations.map((conv) => (
          <div key={conv.id} className="pm-conversation-item">
            <div className="pm-conversation-avatar">
              {conv.name.charAt(0)}
            </div>
            <div className="pm-conversation-content">
              <div className="pm-conversation-header">
                <h3 className="pm-conversation-name">{conv.name}</h3>
                <span className="pm-conversation-time">{conv.timestamp}</span>
              </div>
              <p className="pm-conversation-message">{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && (
              <div className="pm-conversation-badge">{conv.unread}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
