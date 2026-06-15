import { useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Button, Chip } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { skillTags } from '../../../data/mockData';

export function ProjectPostPage() {
  usePageMeta('Post a project | Tinder for Nerds', 'Create a startup hiring project.');

  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    duration: '',
    skills: [],
  });

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  return (
    <AppShell variant="pro" title="Post project" hideTopbar>
      <form className="project-post" onSubmit={(e) => e.preventDefault()}>
        <header>
          <h1>New project posting</h1>
          <p>Freelancers are ranked by FitScore when they apply.</p>
        </header>

        <label>
          Project title
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. FinTech MVP rebuild" />
        </label>

        <label>
          Description
          <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Scope, deliverables, timeline…" />
        </label>

        <div className="project-post__row">
          <label>
            Budget (USD)
            <input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="8000" />
          </label>
          <label>
            Duration
            <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="6 weeks" />
          </label>
        </div>

        <fieldset>
          <legend>Required skills</legend>
          <div className="project-post__chips">
            {skillTags.map((skill) => (
              <Chip key={skill} active={form.skills.includes(skill)} onClick={() => toggleSkill(skill)}>{skill}</Chip>
            ))}
          </div>
        </fieldset>

        <div className="project-post__actions">
          <Button variant="secondary" to="/startup/hiring">Cancel</Button>
          <Button variant="primary" type="submit">Publish project</Button>
        </div>
      </form>
    </AppShell>
  );
}
