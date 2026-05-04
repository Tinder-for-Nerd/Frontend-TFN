import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Avatar } from '../../../components/ui';
import { SectionHeader, StatCard, ActivityItem } from '../../../components/common';
import { profiles, availabilityWeeks, events } from '../../../data/mockData';

export function ProAnalyticsPage() {
  usePageMeta('Tinder for Nerds | Analytics', 'Analytics, charts, and response metrics for professional users.');

  return (
    <AppShell variant="pro" title="Analytics" subtitle="Track the signals that shape your pipeline" actions={<Button variant="secondary">Export CSV</Button>}>
      <section className="pm-two-column pm-two-column--analytics">
        <div className="pm-panel">
          <SectionHeader eyebrow="Trends" title="Profile performance" description="Views vs connection requests over the last 30 days." />
          <div className="pm-chart pm-chart--area">
            {[30, 42, 36, 48, 52, 64, 60, 68, 74, 80, 78, 86].map((value, index) => (
              <span key={value} style={{ height: `${value}%`, animationDelay: `${index * 60}ms` }} />
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Trends" title="Match quality trend" description="Weekly average AI match score across the last four weeks." />
          <div className="pm-chart pm-chart--bars">
            {[62, 70, 74, 81].map((value, index) => (
              <span key={value} style={{ height: `${value}%`, animationDelay: `${index * 60}ms` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="pm-three-column">
        <div className="pm-panel">
          <SectionHeader eyebrow="Traffic" title="Where your views come from" />
          <div className="pm-donut-chart">
            <div className="pm-donut-chart__ring" />
            <div>
              <strong>45%</strong>
              <span>Feed discovery</span>
            </div>
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Matched skills" title="Top skills that got you matched" />
          <div className="pm-stack-list">
            {[
              ['Python', 18],
              ['System Design', 14],
              ['ML / AI', 11],
            ].map(([skill, count]) => (
              <div className="pm-skill-bar" key={skill}>
                <span>{skill}</span>
                <div>
                  <i style={{ width: `${count * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Response stats" title="Reply speed and booking stats" />
          <div className="pm-activity-list">
            <ActivityItem icon="messages" title="Sent messages" meta="24" />
            <ActivityItem icon="connections" title="Received replies" meta="22 - 91% reply rate" />
            <ActivityItem icon="calendar" title="Sessions booked" meta="6" />
          </div>
        </div>
      </section>
    </AppShell>
  );
}