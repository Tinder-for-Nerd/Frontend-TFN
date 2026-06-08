import { Button } from '../../../components/ui';
import '../../../styles/features.css';

export function FeaturesPage() {
  const features = [
    {
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms rank potential collaborators based on skills, domain, intent, and working style. Our embedding-aware system keeps your feed relevant as the network grows.',
      details: ['Skill-based ranking', 'Domain matching', 'Intent alignment', 'Work style compatibility'],
    },
    {
      title: 'Real-Time Communication',
      description: 'Seamlessly connect with matches through instant messaging. Presence indicators and typing states keep conversations flowing naturally.',
      details: ['Instant messaging', 'Presence indicators', 'Typing notifications', 'Message history'],
    },
    {
      title: 'Integrated Calendar',
      description: 'Schedule 1:1 calls directly within the app. Availability management, reminders, and notes keep everyone on the same page.',
      details: ['Calendar integration', 'Availability sync', 'Automatic reminders', 'Meeting notes'],
    },
    {
      title: 'Rich Profiles',
      description: 'Create detailed profiles that help others understand your skills, background, and what you\'re looking for.',
      details: ['Portfolio linking', 'Skills showcase', 'Verified credentials', 'Work history'],
    },
    {
      title: 'Analytics Dashboard',
      description: 'Track your visibility, matches, and conversion rates. Get insights into what\'s working in your profile.',
      details: ['View tracking', 'Match analytics', 'Message metrics', 'Booking trends'],
    },
    {
      title: 'Community Events',
      description: 'Join community events and meetups to expand your network and meet like-minded collaborators.',
      details: ['Event discovery', 'Group networking', 'Event reminders', 'Attendee insights'],
    },
  ];

  return (
    <div className="pm-features-page">
      <header className="pm-features-header">
        <h1>Powerful features for serious collaborators</h1>
        <p>Everything you need to find and connect with your next co-founder or collaborator</p>
      </header>

      <div className="pm-features-list">
        {features.map((feature, idx) => (
          <div key={idx} className="pm-feature-section">
            <div className="pm-feature-content">
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
              <ul className="pm-feature-details">
                {feature.details.map((detail) => (
                  <li key={detail}>✓ {detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <section className="pm-features-cta">
        <h2>Ready to get started?</h2>
        <Button variant="primary" size="lg">
          Start exploring today
        </Button>
      </section>
    </div>
  );
}
