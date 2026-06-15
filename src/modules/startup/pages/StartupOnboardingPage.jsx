import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button, Chip } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { skillTags } from '../../../data/mockData';
import { STARTUP_ONBOARDING_STEPS } from '../../../data/platformData';

export function StartupOnboardingPage() {
  const { step = 'step-1' } = useParams();
  const navigate = useNavigate();
  const currentIndex = STARTUP_ONBOARDING_STEPS.findIndex((s) => s.id === step);
  if (currentIndex === -1) return <Navigate to="/startup/onboarding/step-1" replace />;

  const [company, setCompany] = useState({
    name: 'NovaPay Labs',
    stage: 'Seed',
    size: '5-15',
    website: 'https://novapay.io',
    location: 'Singapore',
  });
  const [project, setProject] = useState({
    title: 'FinTech MVP rebuild',
    skills: ['React', 'Python'],
    budget: '8000',
    duration: '6 weeks',
    description: 'Rebuild checkout flow with ML fraud detection.',
  });

  usePageMeta('Startup onboarding | Tinder for Nerds', 'Set up your company and post your first project.');

  const next = STARTUP_ONBOARDING_STEPS[currentIndex + 1]?.id;
  const prev = STARTUP_ONBOARDING_STEPS[currentIndex - 1]?.id;

  return (
    <AppShell variant="pro" hideTopbar className="pm-wizard-shell">
      <div className="pm-wizard">
        <header className="pm-wizard__head">
          <span className="pm-wizard__brand">Startup setup</span>
          <div className="pm-wizard__progress">
            <span>Step {currentIndex + 1} of 2 — {STARTUP_ONBOARDING_STEPS[currentIndex].label}</span>
            <div className="pm-wizard__bar"><span style={{ width: `${((currentIndex + 1) / 2) * 100}%` }} /></div>
          </div>
        </header>

        <main className="pm-wizard__body">
          {step === 'step-1' && (
            <section className="pm-wizard__panel">
              <h1>Company info</h1>
              <p>Tell freelancers about your startup.</p>
              <label>Company name<input value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} /></label>
              <label>Stage<input value={company.stage} onChange={(e) => setCompany({ ...company, stage: e.target.value })} /></label>
              <label>Team size<input value={company.size} onChange={(e) => setCompany({ ...company, size: e.target.value })} /></label>
              <label>Website<input value={company.website} onChange={(e) => setCompany({ ...company, website: e.target.value })} /></label>
              <label>Location<input value={company.location} onChange={(e) => setCompany({ ...company, location: e.target.value })} /></label>
            </section>
          )}
          {step === 'step-2' && (
            <section className="pm-wizard__panel">
              <h1>First project posting</h1>
              <p>Publish a role to start receiving AI-ranked applicants.</p>
              <label>Project title<input value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} /></label>
              <label>Description<textarea rows={3} value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} /></label>
              <label>Budget (USD)<input value={project.budget} onChange={(e) => setProject({ ...project, budget: e.target.value })} /></label>
              <label>Duration<input value={project.duration} onChange={(e) => setProject({ ...project, duration: e.target.value })} /></label>
              <div className="pm-wizard__chips">
                {skillTags.slice(0, 12).map((skill) => (
                  <Chip key={skill} active={project.skills.includes(skill)} onClick={() => setProject({
                    skills: project.skills.includes(skill) ? project.skills.filter((s) => s !== skill) : [...project.skills, skill],
                  })}>{skill}</Chip>
                ))}
              </div>
            </section>
          )}
        </main>

        <footer className="pm-wizard__foot">
          {prev ? <Button variant="secondary" onClick={() => navigate(`/startup/onboarding/${prev}`)}>Back</Button> : <span />}
          {next ? (
            <Button variant="primary" onClick={() => navigate(`/startup/onboarding/${next}`)}>Continue</Button>
          ) : (
            <Button variant="primary" to="/startup/hiring">Go to hiring dashboard</Button>
          )}
        </footer>
      </div>
    </AppShell>
  );
}
