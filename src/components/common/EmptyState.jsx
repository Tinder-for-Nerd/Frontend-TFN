import { Icon, Button } from '../ui';

export function EmptyState({ 
  icon = 'search', 
  title = 'No results found', 
  description = 'Try adjusting your filters or search terms.', 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="pm-empty-state">
      <div className="pm-empty-state__icon">
        <Icon name={icon} size={48} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
