import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../ui';
import { commandPaletteSections } from '../../data/mockData';

export function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recentSearches] = useState([
    { label: 'React Developers', to: '/student/discover' },
    { label: 'Sarah Chen', to: '/profile/sarah_chen' },
    { label: 'AI Events', to: '/student/events' }
  ]);

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="pm-command-palette" role="dialog" aria-modal="true">
      <div className="pm-command-palette__overlay" onClick={onClose} />
      <div className="pm-command-palette__panel">
        <div className="pm-command-palette__search">
          <Icon name="search" />
          <input
            type="text"
            placeholder="Search for people, skills, or settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <div className="pm-command-palette__shortcut">ESC to close</div>
        </div>
        
        <div className="pm-command-palette__results">
          {query.length === 0 && (
            <div className="pm-command-palette__section">
              <h4>Recent Searches</h4>
              <div className="pm-command-palette__list">
                {recentSearches.map((item) => (
                  <button
                    key={item.label}
                    className="pm-command-palette__item"
                    onClick={() => {
                      navigate(item.to);
                      onClose();
                    }}
                  >
                    <Icon name="history" size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {commandPaletteSections.map((section) => {
            const filtered = section.items.filter((item) =>
              item.label.toLowerCase().includes(query.toLowerCase())
            );

            if (filtered.length === 0) return null;

            return (
              <div key={section.title} className="pm-command-palette__section">
                <h4>{section.title}</h4>
                <div className="pm-command-palette__list">
                  {filtered.map((item) => (
                    <button
                      key={item.label}
                      className="pm-command-palette__item"
                      onClick={() => {
                        navigate(item.to);
                        onClose();
                      }}
                    >
                      <Icon name="chevron-right" size={16} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
