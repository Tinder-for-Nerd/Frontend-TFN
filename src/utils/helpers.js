// Class name utility (already exists, but extracted for clarity)
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Extract initials from a name
export function initialsFromName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

// Get tone color based on skill or domain
export function getToneForSkill(skill) {
  if (skill === 'React') return 'violet';
  if (skill === 'Python' || skill === 'ML') return 'teal';
  if (skill === 'Design' || skill === 'Figma') return 'rose';
  return 'muted';
}

export function getToneForDomain(domain) {
  if (domain === 'Design') return 'rose';
  if (domain === 'Engineering' || domain === 'ML') return 'teal';
  if (domain === 'Mentoring') return 'violet';
  if (domain === 'Product') return 'violet';
  return 'amber';
}

export function getToneForBadge(item) {
  if (item === 'Design') return 'rose';
  if (item === 'Engineering' || item === 'ML') return 'teal';
  if (item === 'Mentoring') return 'violet';
  return 'amber';
}

// Format date/time strings
export function formatTime(time) {
  return time;
}

// Get dashboard route based on role
export function getDashboardRoute(role) {
  return role === 'professional' ? '/pro/overview' : '/student/home';
}
