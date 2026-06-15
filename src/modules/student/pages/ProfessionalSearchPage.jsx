import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';
import { AppShell } from '../../../components/layout';
import { Button, Badge } from '../../../components/ui';
import { MiniProfileCard, EmptyState } from '../../../components/common';
import { usePageMeta } from '../../../hooks/usePageMeta';
import {
  getProfessionalTypeLabel,
  loadStoredProfessionalSearch,
  searchProfilesByRequirements,
} from '../../../data/professionalSearch';

const SEARCH_STEPS = [
  'Indexing all student accounts…',
  'Scanning professional profiles…',
  'Matching skills and domain…',
  'Ranking by your requirements…',
];

const LOADING_MS = 2400;

function SearchLoadingView({ criteria, progress, stepIndex }) {
  const typeLabel = getProfessionalTypeLabel(criteria.professionalType);

  return (
    <div className="pro-search-loading" aria-live="polite" aria-busy="true">
      <div className="pro-search-loading__card">
        <div className="pro-search-loading__icon" aria-hidden="true">
          <Search size={28} />
        </div>
        <h1>Searching the platform</h1>
        <p className="pro-search-loading__lead">
          Finding <strong>{typeLabel}</strong> matches across every student and professional
          account — outside your FitScore queue.
        </p>

        <div className="pro-search-loading__criteria">
          {criteria.domain ? <span>{criteria.domain}</span> : null}
          {criteria.skills ? <span>{criteria.skills}</span> : null}
          {criteria.location ? <span>{criteria.location}</span> : null}
          {criteria.intent ? <span>{criteria.intent}</span> : null}
        </div>

        <div className="pro-search-loading__bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="pro-search-loading__bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="pro-search-loading__step">{SEARCH_STEPS[stepIndex]}</p>
        <p className="pro-search-loading__percent">{progress}%</p>
      </div>
    </div>
  );
}

export function ProfessionalSearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const criteria = location.state?.professionalSearch ?? loadStoredProfessionalSearch();

  const [phase, setPhase] = useState('loading');
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [results, setResults] = useState([]);

  const typeLabel = criteria ? getProfessionalTypeLabel(criteria.professionalType) : '';

  usePageMeta(
    phase === 'loading' ? 'Searching… | Tinder for Nerds' : `Matches for ${typeLabel} | Tinder for Nerds`,
    'Search all accounts for professionals matching your requirements.',
  );

  useEffect(() => {
    if (!criteria?.professionalType) {
      navigate('/student/connections', { replace: true });
      return undefined;
    }

    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min(100, Math.round((elapsed / LOADING_MS) * 100));
      setProgress(nextProgress);
      setStepIndex(Math.min(SEARCH_STEPS.length - 1, Math.floor((elapsed / LOADING_MS) * SEARCH_STEPS.length)));
    }, 80);

    const finish = window.setTimeout(() => {
      const matches = searchProfilesByRequirements(criteria);
      setResults(matches);
      setProgress(100);
      setPhase('results');
    }, LOADING_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(finish);
    };
  }, [criteria, navigate]);

  const summaryChips = useMemo(() => {
    if (!criteria) return [];
    return [
      typeLabel,
      criteria.domain,
      criteria.skills,
      criteria.location,
      criteria.commitment,
    ].filter(Boolean);
  }, [criteria, typeLabel]);

  if (!criteria?.professionalType) {
    return null;
  }

  return (
    <AppShell variant="student" hideTopbar className="pm-professional-search-shell">
      {phase === 'loading' ? (
        <SearchLoadingView criteria={criteria} progress={progress} stepIndex={stepIndex} />
      ) : (
        <div className="pro-search-results">
          <header className="pro-search-results__header">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/student/connections')}
              className="pro-search-results__back"
            >
              <ArrowLeft size={16} />
              New search
            </Button>
            <div>
              <div className="pro-search-results__title-row">
                <h1>Search results</h1>
                <Badge tone="teal">
                  <Sparkles size={12} />
                  {results.length} match{results.length === 1 ? '' : 'es'}
                </Badge>
              </div>
              <p className="pro-search-results__subtitle">
                Ranked by your {typeLabel.toLowerCase()} requirements across all accounts.
              </p>
              <div className="pro-search-results__chips">
                {summaryChips.map((chip) => (
                  <span key={chip} className="pro-search-results__chip">{chip}</span>
                ))}
              </div>
            </div>
          </header>

          {results.length > 0 ? (
            <div className="pro-search-results__grid">
              {results.map((profile) => (
                <MiniProfileCard
                  key={profile.id}
                  profile={{
                    ...profile,
                    match: profile.relevanceScore ?? profile.match ?? 0,
                    verified: profile.verified ?? profile.audience === 'Professional',
                  }}
                  fitLabel="Match"
                  ctaLabel="View profile"
                  secondaryLabel="Message"
                  extraLink={`/profile/${profile.username}`}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="search"
              title="No matches found"
              description="Try broadening your professional type, skills, or location."
              actionLabel="Back to connections"
              onAction={() => navigate('/student/connections')}
            />
          )}
        </div>
      )}
    </AppShell>
  );
}
