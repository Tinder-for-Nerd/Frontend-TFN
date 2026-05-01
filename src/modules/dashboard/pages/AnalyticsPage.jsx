import { useState } from 'react';
import { Icon } from '../../../components/ui';
import '../../../styles/analytics.css';

export function AnalyticsPage() {
  const [stats] = useState({
    viewsThisWeek: 342,
    matchesThisWeek: 18,
    messagesThisWeek: 47,
    callsScheduled: 5,
    conversionRate: '12.5%',
    topSkillsSearched: ['Product', 'Design', 'Engineering'],
  });

  return (
    <div className="pm-analytics-page">
      <header className="pm-analytics-header">
        <h1 className="pm-analytics-header__title">Analytics</h1>
        <p className="pm-analytics-subtitle">This week</p>
      </header>

      <div className="pm-stats-grid">
        <div className="pm-stat-card">
          <div className="pm-stat-icon">
            <Icon name="chart" />
          </div>
          <div className="pm-stat-info">
            <p className="pm-stat-label">Views</p>
            <p className="pm-stat-value">{stats.viewsThisWeek}</p>
          </div>
        </div>

        <div className="pm-stat-card">
          <div className="pm-stat-icon">
            <Icon name="spark" />
          </div>
          <div className="pm-stat-info">
            <p className="pm-stat-label">Matches</p>
            <p className="pm-stat-value">{stats.matchesThisWeek}</p>
          </div>
        </div>

        <div className="pm-stat-card">
          <div className="pm-stat-icon">
            <Icon name="messages" />
          </div>
          <div className="pm-stat-info">
            <p className="pm-stat-label">Messages</p>
            <p className="pm-stat-value">{stats.messagesThisWeek}</p>
          </div>
        </div>

        <div className="pm-stat-card">
          <div className="pm-stat-icon">
            <Icon name="calendar" />
          </div>
          <div className="pm-stat-info">
            <p className="pm-stat-label">Calls booked</p>
            <p className="pm-stat-value">{stats.callsScheduled}</p>
          </div>
        </div>
      </div>

      <section className="pm-analytics-section">
        <h2 className="pm-analytics-section__title">Conversion rate</h2>
        <div className="pm-conversion-meter">
          <div className="pm-conversion-bar">
            <div
              className="pm-conversion-fill"
              style={{ width: stats.conversionRate }}
            ></div>
          </div>
          <p className="pm-conversion-text">{stats.conversionRate} match to message</p>
        </div>
      </section>

      <section className="pm-analytics-section">
        <h2 className="pm-analytics-section__title">Top searched skills</h2>
        <div className="pm-top-skills">
          {stats.topSkillsSearched.map((skill, idx) => (
            <div key={skill} className="pm-skill-rank">
              <span className="pm-skill-rank__number">{idx + 1}</span>
              <span className="pm-skill-rank__name">{skill}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
