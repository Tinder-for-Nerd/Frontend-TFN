import { AuthLandingVisual } from './AuthShell';

export function StudentVisualPanel() {
  return (
    <AuthLandingVisual
      title="Skill-first discovery"
      body="Profiles, chats, events, and meetings in one workspace."
      stats={[
        { value: '200+', label: 'colleges represented' },
        { value: '5k+', label: 'connections made' },
        { value: '72hr', label: 'avg. to first match' },
      ]}
    />
  );
}
