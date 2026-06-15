import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../../components/ui';
import {
  EMPTY_PROFESSIONAL_SEARCH,
  PROFESSIONAL_TYPES,
} from '../../../../data/professionalSearch';

const COMMITMENT_OPTIONS = ['Flexible', 'Part-time', 'Full-time', 'Remote only'];

export function ProfessionalSearchModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_PROFESSIONAL_SEARCH);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.professionalType) {
      setError('Select the type of professional you need.');
      return;
    }
    setError('');
    onSubmit(form);
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <div className="pro-search-modal" role="presentation" onClick={handleClose}>
      <div
        className="pro-search-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-search-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="pro-search-modal__head">
          <div className="pro-search-modal__head-copy">
            <p className="pro-search-modal__eyebrow">Professional search</p>
            <h2 id="pro-search-title">What type of professional do you need?</h2>
            <p className="pro-search-modal__lead">
              We&apos;ll search every student and professional account on the platform — not just
              your existing FitScore queue.
            </p>
          </div>
          <button type="button" className="pro-search-modal__close" onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <form className="pro-search-modal__form" onSubmit={handleSubmit}>
          <div className="pro-search-modal__body">
            <label className="pro-search-modal__field">
            <span>Professional type <em>*</em></span>
            <select
              value={form.professionalType}
              onChange={(event) => update({ professionalType: event.target.value })}
              required
            >
              <option value="">Select a type…</option>
              {PROFESSIONAL_TYPES.map((type) => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </label>

          <div className="pro-search-modal__grid">
            <label className="pro-search-modal__field">
              <span>Domain</span>
              <input
                type="text"
                value={form.domain}
                placeholder="e.g. FinTech, HealthTech"
                onChange={(event) => update({ domain: event.target.value })}
              />
            </label>
            <label className="pro-search-modal__field">
              <span>Skills needed</span>
              <input
                type="text"
                value={form.skills}
                placeholder="e.g. React, Python, UX"
                onChange={(event) => update({ skills: event.target.value })}
              />
            </label>
            <label className="pro-search-modal__field">
              <span>Intent / goal</span>
              <input
                type="text"
                value={form.intent}
                placeholder="e.g. Hackathon teammate, mentor"
                onChange={(event) => update({ intent: event.target.value })}
              />
            </label>
            <label className="pro-search-modal__field">
              <span>Location</span>
              <input
                type="text"
                value={form.location}
                placeholder="e.g. Singapore, Remote"
                onChange={(event) => update({ location: event.target.value })}
              />
            </label>
          </div>

          <label className="pro-search-modal__field">
            <span>Commitment</span>
            <select
              value={form.commitment}
              onChange={(event) => update({ commitment: event.target.value })}
            >
              <option value="">Any commitment</option>
              {COMMITMENT_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="pro-search-modal__field">
            <span>Additional notes</span>
            <textarea
              rows={3}
              value={form.notes}
              placeholder="Anything else we should match on?"
              onChange={(event) => update({ notes: event.target.value })}
            />
          </label>

            {error ? <p className="pro-search-modal__error" role="alert">{error}</p> : null}
          </div>

          <footer className="pro-search-modal__actions">
            <Button type="button" variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="primary">Search all accounts</Button>
          </footer>
        </form>
      </div>
    </div>
  );
}
