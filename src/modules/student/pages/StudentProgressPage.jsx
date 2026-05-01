import { useState } from 'react';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Icon } from '../../../components/ui';
import { SectionHeader, StatCard } from '../../../components/common';
import { cx } from '../../../utils/helpers';

function MatchArc({ value, size = 180, stroke = 12 }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--surface-container-high)"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--primary)"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1s ease-in-out' }}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function StudentProgressPage() {
  usePageMeta('My Progress | ProMatch', 'Track profile quality, activity growth, skill gaps, and your network progress.');

  return (
    <AppShell 
      variant="student" 
      title="My Progress" 
      subtitle="See how your profile is growing over time" 
      actions={<Button variant="primary" icon="spark">Analyze profile</Button>}
    >
      <div className="pm-progress-container">
        {/* Progress Hero */}
        <section className="pm-card pm-progress-hero">
          <div className="pm-progress-hero__main">
            <SectionHeader 
              eyebrow="Growth Engine" 
              title="Profile Strength" 
              description="A stronger profile increases your visibility to top builders by 3.4x." 
            />
            <div className="pm-progress-stats">
              <div className="pm-progress-ring-wrapper">
                <MatchArc value={73} size={160} stroke={14} />
                <div className="pm-progress-ring-label">
                  <strong>73</strong>
                  <span>pts</span>
                </div>
              </div>
              <div className="pm-progress-summary">
                <h3>Good progress, Sarah!</h3>
                <p>Complete your LinkedIn integration to reach "Professional" status.</p>
                <div style={{ display: 'flex' }}>
                  <Button variant="secondary" size="sm">Complete now</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pm-progress-checklist">
            {[
              { label: 'Profile photo added', done: true, points: '+10' },
              { label: 'Bio written', done: true, points: '+15' },
              { label: 'Skills added (5+)', done: true, points: '+20' },
              { label: 'Add LinkedIn link', done: false, points: '+10' },
              { label: 'First connection made', done: false, points: '+15' },
            ].map((item) => (
              <div className={cx('pm-checklist-item', item.done && 'is-done')} key={item.label}>
                <div className="pm-check-icon">
                  <Icon name={item.done ? 'check' : 'circle'} size={14} />
                </div>
                <div className="pm-check-content">
                  <strong>{item.label}</strong>
                  <span>{item.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="pm-stat-grid">
          <StatCard value="28" label="Profile views" detail="+12% from last week" accent="teal" />
          <StatCard value="5" label="Connections" detail="3 pending requests" accent="violet" />
          <StatCard value="12" label="Messages sent" detail="High response rate" accent="amber" />
          <StatCard value="1" label="Events" detail="Upcoming: Pro Mixer" accent="rose" />
        </section>

        {/* Insights Section */}
        <div className="pm-two-column">
          <section className="pm-card">
            <SectionHeader 
              title="Growth Trend" 
              description="Profile views and interaction signals over the last 30 days."
            />
            <div className="pm-chart-container" style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingTop: '24px' }}>
              {[30, 45, 35, 60, 70, 65, 85].map((h, i) => (
                <div key={i} className="pm-chart-bar" style={{ height: `${h}%`, flex: 1, background: 'var(--primary)', opacity: 0.1 + (i * 0.1), borderRadius: '4px 4px 0 0' }} />
              ))}
            </div>
          </section>

          <section className="pm-card">
            <SectionHeader 
              title="Skill Demand" 
              description="The most requested skills in your target engineering roles."
            />
            <div className="pm-skill-gap-list">
              {[
                { name: 'System Design', value: 85 },
                { name: 'TypeScript', value: 70 },
                { name: 'GraphQL', value: 45 },
              ].map((skill) => (
                <div key={skill.name} className="pm-skill-row">
                  <div className="pm-skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.value}% match</span>
                  </div>
                  <div className="pm-skill-track">
                    <div className="pm-skill-fill" style={{ width: `${skill.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style>{`
        .pm-progress-container {
          display: grid;
          gap: 32px;
        }
        .pm-progress-hero {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 40px;
          padding: 40px;
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-xl);
        }
        .pm-progress-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-top: 24px;
        }
        .pm-progress-ring-wrapper {
          position: relative;
          display: grid;
          place-items: center;
        }
        .pm-progress-ring-label {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
        }
        .pm-progress-ring-label strong {
          font-size: 2.5rem;
          font-family: var(--font-display);
          color: var(--primary);
        }
        .pm-progress-ring-label span {
          font-size: 12px;
          color: var(--on-surface-variant);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .pm-progress-summary h3 {
          margin-bottom: 8px;
        }
        .pm-progress-summary p {
          color: var(--on-surface-variant);
          margin-bottom: 20px;
          max-width: 300px;
          font-size: 14px;
        }
        .pm-progress-checklist {
          display: grid;
          gap: 12px;
          background: var(--surface-container-low);
          padding: 24px;
          border-radius: var(--radius-lg);
        }
        .pm-checklist-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px;
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
        }
        .pm-checklist-item.is-done {
          opacity: 0.7;
          border-color: transparent;
          background: transparent;
        }
        .pm-check-icon {
          color: var(--primary);
          margin-top: 2px;
        }
        .pm-check-content {
          display: grid;
          gap: 2px;
        }
        .pm-check-content strong {
          font-size: 14px;
        }
        .pm-check-content span {
          font-size: 11px;
          color: var(--on-surface-variant);
        }
        .pm-skill-gap-list {
          display: grid;
          gap: 20px;
          margin-top: 24px;
        }
        .pm-skill-info {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .pm-skill-track {
          height: 6px;
          background: var(--surface-container-high);
          border-radius: 3px;
          overflow: hidden;
        }
        .pm-skill-fill {
          height: 100%;
          background: var(--primary);
          border-radius: 3px;
        }
      `}</style>
    </AppShell>
  );
}