import { Link } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button, Badge } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { freelancerProjects, matchAlerts, profileStrength } from '../../../data/platformData';

export function FreelancerDashboardPage() {
  usePageMeta('Freelancer dashboard | Tinder for Nerds', 'Active projects, match alerts, and profile strength.');

  const strengthPct = Math.round((profileStrength.filter((i) => i.done).length / profileStrength.length) * 100);

  return (
    <AppShell variant="student" title="Freelancer" subtitle="Your workspace" hideTopbar>
      <div className="fl-dash">
        <header className="fl-dash__head">
          <div>
            <h1>Dashboard</h1>
            <p>Track projects, matches, and profile health.</p>
          </div>
          <div className="fl-dash__actions">
            <Button variant="secondary" to="/freelancer/discover">Discover</Button>
            <Button variant="primary" to="/pro/billing">Upgrade to Pro</Button>
          </div>
        </header>

        <div className="fl-dash__grid">
          <section className="fl-dash__card fl-dash__card--wide">
            <h2>Active projects</h2>
            <div className="fl-dash__projects">
              {freelancerProjects.map((project) => (
                <article key={project.id} className="fl-dash__project">
                  <div>
                    <strong>{project.title}</strong>
                    <span>{project.client} · Due {project.due}</span>
                  </div>
                  <Badge tone={project.status === 'active' ? 'teal' : 'amber'}>{project.status}</Badge>
                  <div className="fl-dash__progress"><span style={{ width: `${project.progress}%` }} /></div>
                </article>
              ))}
            </div>
          </section>

          <section className="fl-dash__card">
            <h2>Match alerts</h2>
            <ul className="fl-dash__alerts">
              {matchAlerts.map((alert) => (
                <li key={alert.id}>
                  <div>
                    <strong>{alert.name}</strong>
                    <span>{alert.intent} · {alert.time}</span>
                  </div>
                  <Badge tone="teal">{alert.score}%</Badge>
                </li>
              ))}
            </ul>
            <Button variant="secondary" size="sm" to="/freelancer/discover">Browse feed</Button>
          </section>

          <section className="fl-dash__card">
            <h2>Profile strength</h2>
            <div className="fl-dash__strength-ring">
              <strong>{strengthPct}%</strong>
              <span>complete</span>
            </div>
            <ul className="fl-dash__checklist">
              {profileStrength.map((item) => (
                <li key={item.label} className={item.done ? 'is-done' : ''}>{item.label}</li>
              ))}
            </ul>
            <Button variant="secondary" size="sm" to="/freelancer/onboarding/step-1">Improve profile</Button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
