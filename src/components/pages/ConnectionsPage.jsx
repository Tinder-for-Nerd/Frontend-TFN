import { useState } from 'react';
import { Button, Badge } from '../ui';
import '../../styles/connections.css';

export function ConnectionsPage() {
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: 'Maya Chen',
      role: 'Founder',
      domain: 'Tech',
      skills: ['Product', 'Strategy'],
      matchScore: 92,
    },
    {
      id: 2,
      name: 'Andre Patel',
      role: 'Product Lead',
      domain: 'Design',
      skills: ['Leadership', 'UX'],
      matchScore: 88,
    },
  ]);

  return (
    <div className="pm-connections-page">
      <header className="pm-connections-header">
        <h1 className="pm-connections-header__title">Connections</h1>
        <p className="pm-connections-subtitle">{connections.length} matches</p>
      </header>

      <div className="pm-connections-list">
        {connections.map((conn) => (
          <div key={conn.id} className="pm-connection-card">
            <div className="pm-connection-header">
              <div className="pm-connection-info">
                <h3 className="pm-connection-name">{conn.name}</h3>
                <p className="pm-connection-role">{conn.role}</p>
              </div>
              <div className="pm-connection-score">
                <span className="pm-score-value">{conn.matchScore}%</span>
                <span className="pm-score-label">Match</span>
              </div>
            </div>

            <div className="pm-connection-tags">
              {conn.skills.map((skill) => (
                <Badge key={skill} tone="violet" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="pm-connection-actions">
              <Button variant="secondary" size="sm">
                Message
              </Button>
              <Button variant="primary" size="sm">
                Schedule call
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
