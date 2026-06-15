import { buildFitScore } from '../../data/platformData';
import '../../styles/fit-score.css';

const BAR_KEYS = [
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects' },
  { key: 'availability', label: 'Availability' },
];

export function FitScore({
  profile,
  scores,
  compact = false,
  showBars = true,
  label = 'AI-ranked match',
  showLabel,
}) {
  const data = scores || buildFitScore(profile);
  const displayLabel = showLabel ?? !compact;

  return (
    <div className={`fit-score${compact ? ' fit-score--compact' : ''}`}>
      <div className="fit-score__overall">
        <span className="fit-score__ring" style={{ '--score': data.overall }}>
          <strong>{data.overall}</strong>
          <em>Fit</em>
        </span>
        {displayLabel ? <span className="fit-score__label">{label}</span> : null}
      </div>

      {showBars ? (
        <div className="fit-score__bars">
          {BAR_KEYS.map(({ key, label }) => (
            <div className="fit-score__bar-row" key={key}>
              <span>{label}</span>
              <div className="fit-score__bar-track">
                <div
                  className="fit-score__bar-fill"
                  style={{ width: `${data[key]}%` }}
                />
              </div>
              <strong>{data[key]}%</strong>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
