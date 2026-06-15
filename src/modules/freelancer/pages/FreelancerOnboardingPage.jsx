import { useState } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button, Chip } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { skillTags, domainTags } from '../../../data/mockData';
import { FREELANCER_ONBOARDING_STEPS } from '../../../data/platformData';

export function FreelancerOnboardingPage() {
  const { step = 'step-1' } = useParams();
  const navigate = useNavigate();
  const currentIndex = FREELANCER_ONBOARDING_STEPS.findIndex((s) => s.id === step);
  if (currentIndex === -1) return <Navigate to="/freelancer/onboarding/step-1" replace />;

  const [form, setForm] = useState({
    name: 'Alex Kumar',
    title: 'Full-stack Developer',
    location: 'Singapore',
    bio: '',
    skills: ['React', 'Python'],
    github: 'https://github.com/alexkumar',
    portfolio: 'https://alexkumar.dev',
    hours: '20',
    timezone: 'SGT',
  });

  usePageMeta('Freelancer onboarding | Tinder for Nerds', 'Complete your freelancer profile in 4 steps.');

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));
  const next = FREELANCER_ONBOARDING_STEPS[currentIndex + 1]?.id;
  const prev = FREELANCER_ONBOARDING_STEPS[currentIndex - 1]?.id;

  return (
    <AppShell variant="student" hideTopbar className="pm-wizard-shell">
      <div className="pm-wizard">
        <header className="pm-wizard__head">
          <Link to="/" className="pm-wizard__brand">Tinder for Nerds</Link>
          <div className="pm-wizard__progress">
            <span>Step {currentIndex + 1} of 4 — {FREELANCER_ONBOARDING_STEPS[currentIndex].label}</span>
            <div className="pm-wizard__bar"><span style={{ width: `${((currentIndex + 1) / 4) * 100}%` }} /></div>
          </div>
        </header>

        <main className="pm-wizard__body">
          {step === 'step-1' && (
            <section className="pm-wizard__panel">
              <h1>Basic info</h1>
              <p>Tell startups who you are and what you build.</p>
              <label>Name<input value={form.name} onChange={(e) => update({ name: e.target.value })} /></label>
              <label>Title<input value={form.title} onChange={(e) => update({ title: e.target.value })} /></label>
              <label>Location<input value={form.location} onChange={(e) => update({ location: e.target.value })} /></label>
              <label>Bio<textarea rows={4} value={form.bio} onChange={(e) => update({ bio: e.target.value })} placeholder="What do you specialize in?" /></label>
            </section>
          )}
          {step === 'step-2' && (
            <section className="pm-wizard__panel">
              <h1>Skills</h1>
              <p>Select skills that power your FitScore ranking.</p>
              <div className="pm-wizard__chips">
                {skillTags.map((skill) => (
                  <Chip key={skill} active={form.skills.includes(skill)} onClick={() => update({
                    skills: form.skills.includes(skill) ? form.skills.filter((s) => s !== skill) : [...form.skills, skill],
                  })}>{skill}</Chip>
                ))}
              </div>
              <div className="pm-wizard__chips">
                {domainTags.map((d) => (
                  <Chip key={d}>{d}</Chip>
                ))}
              </div>
            </section>
          )}
          {step === 'step-3' && (
            <section className="pm-wizard__panel">
              <h1>Portfolio</h1>
              <p>Link GitHub and portfolio for the analyzer.</p>
              <label>GitHub URL<input value={form.github} onChange={(e) => update({ github: e.target.value })} /></label>
              <label>Portfolio URL<input value={form.portfolio} onChange={(e) => update({ portfolio: e.target.value })} /></label>
            </section>
          )}
          {step === 'step-4' && (
            <section className="pm-wizard__panel">
              <h1>Availability</h1>
              <p>Set hours so startups know when you can commit.</p>
              <label>Hours per week<input type="number" value={form.hours} onChange={(e) => update({ hours: e.target.value })} /></label>
              <label>Timezone<input value={form.timezone} onChange={(e) => update({ timezone: e.target.value })} /></label>
            </section>
          )}
        </main>

        <footer className="pm-wizard__foot">
          {prev ? <Button variant="secondary" onClick={() => navigate(`/freelancer/onboarding/${prev}`)}>Back</Button> : <span />}
          {next ? (
            <Button variant="primary" onClick={() => navigate(`/freelancer/onboarding/${next}`)}>Continue</Button>
          ) : (
            <Button variant="primary" to="/freelancer/dashboard">Finish & go to dashboard</Button>
          )}
        </footer>
      </div>
    </AppShell>
  );
}
