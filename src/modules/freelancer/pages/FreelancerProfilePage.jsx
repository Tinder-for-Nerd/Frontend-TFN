import { useParams } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Avatar, Badge, Button } from '../../../components/ui';
import { FitScore } from '../../../components/fit/FitScore';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { profiles } from '../../../data/mockData';

export function FreelancerProfilePage() {
  const { username } = useParams();
  const profile = Object.values(profiles).find(
    (p) => p.username === username || p.id === username,
  ) || profiles.sarah;

  usePageMeta(`${profile.name} | Freelancer profile`, profile.headline || profile.bio);

  return (
    <AppShell variant="student" hideTopbar>
      <div className="fl-profile">
        <header className="fl-profile__hero">
          <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="xl" />
          <div className="fl-profile__intro">
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
            <div className="fl-profile__meta">
              <Badge tone="teal">{profile.intent}</Badge>
              <Badge tone="muted">{profile.domain}</Badge>
              <Badge tone="muted">{profile.commitment}</Badge>
            </div>
          </div>
          <div className="fl-profile__score">
            <FitScore profile={profile} label="Skill score" showBars />
          </div>
          <Button variant="primary" to="/student/messages">Message</Button>
        </header>

        <div className="fl-profile__grid">
          <section className="fl-profile__card">
            <h2>Skills</h2>
            <div className="fl-profile__skills">
              {profile.skills?.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className="fl-profile__card fl-profile__card--wide">
            <h2>About</h2>
            <p>{profile.bio}</p>
          </section>

          <section className="fl-profile__card">
            <h2>Availability</h2>
            <ul className="fl-profile__list">
              <li><strong>Commitment</strong> {profile.commitment}</li>
              <li><strong>Work style</strong> {profile.workStyle}</li>
              <li><strong>Location</strong> {profile.location}</li>
              <li><strong>Response</strong> {profile.avgResponse}</li>
            </ul>
          </section>

          <section className="fl-profile__card">
            <h2>Portfolio</h2>
            <p className="fl-profile__muted">LinkedIn · GitHub · Portfolio links on profile.</p>
            <Button variant="secondary" size="sm" to="/freelancer/portfolio">Run analyzer</Button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
