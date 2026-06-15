import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

const FILTER_FIELDS = [
  { key: 'domain', label: 'Domain', placeholder: 'e.g. FinTech, Product' },
  { key: 'skills', label: 'Skills', placeholder: 'e.g. React, ML' },
  { key: 'intent', label: 'Intent', placeholder: 'e.g. Co-founder, Advisor' },
  { key: 'location', label: 'Location', placeholder: 'e.g. Singapore' },
  { key: 'commitment', label: 'Commitment', placeholder: 'e.g. Flexible, Full-time' },
];

function getDefaultExpanded() {
  if (typeof window === 'undefined') return true;
  return !window.matchMedia('(max-width: 768px)').matches;
}

export function DiscoverFilters({ filters, onChange, className = '' }) {
  const [expanded, setExpanded] = useState(getDefaultExpanded);
  const activeCount = FILTER_FIELDS.filter(({ key }) => filters[key]?.trim()).length;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = (event) => {
      if (event.matches) {
        setExpanded(false);
      }
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return (
    <aside
      className={`discover-filters ${expanded ? 'discover-filters--expanded' : 'discover-filters--collapsed'} ${className}`.trim()}
    >      <button
        type="button"
        className="discover-filters__toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
      >
        <span className="discover-filters__toggle-label">
          <SlidersHorizontal size={16} />
          Filters
          {activeCount ? <span className="discover-filters__count">{activeCount}</span> : null}
        </span>
        <span className="discover-filters__toggle-hint">{expanded ? 'Hide' : 'Show'}</span>
      </button>

      {expanded ? (
        <div className="discover-filters__fields">
          {FILTER_FIELDS.map(({ key, label, placeholder }) => (
            <label key={key} className="discover-filters__field">
              <span>{label}</span>
              <input
                type="text"
                value={filters[key]}
                placeholder={placeholder}
                onChange={(event) => onChange({ [key]: event.target.value })}
              />
            </label>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
