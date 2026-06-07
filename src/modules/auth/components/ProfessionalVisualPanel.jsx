import { AuthLandingVisual } from './AuthShell';

export function ProfessionalVisualPanel() {
  return (
    <AuthLandingVisual
      title="AI-ranked professional matches"
      body="Verified profiles, complementary stacks, and bookable 1:1 sessions."
      stats={[
        { value: '94%', label: 'match relevance score' },
        { value: '1:1', label: 'video session booking' },
        { value: 'Pro', label: 'verified builder layer' },
      ]}
    />
  );
}
