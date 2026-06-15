const DISCOVER_HERO_IMAGES = {
  'sarah-chen':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAoQsTnJIwgXT82h5a69umEvR7HIrpy482IPVd1i6Lg0DKgQ9tU8Vr7aaGRADnE3sFDKpCjIUvsLtLi7PLKoWaqv4JKAh9Ln8qQpzkmZ0l4x_PbEes2Lfmayr5kOjmP4Q2QZp8yZnl5FbDGTabGgspuKSYEb8VZiA7Lk_Riev7lgJXactor1bcxFnes0PHo-Zgt4M_qqScmL3_CRk-7TwoWgM6EaDAJI9fhWXov8SUBtKdfZqm-kmbuEudVu79JmskjC3knCGoQTRU',
  'raj-patel':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7nCvaUZxHMcf_ekpIzkMUCu0pPyW9OQCoPlL6D0vYNWdf6lddcWYtamarXHcwpL5qGVbsOX9GOUAs12j3IfIE5tcmguzcYPGSL7-XWRhQ3qbF4WcigebhXdmi4I5tVyMPY9dLvPkLQNe0S5Gz4o2YCpIcVHaKVfJeDkhs8OzU40WfTKfULItmxa7OO7gMEEJeQcNmF4eRMS75I2ow1sgLYzdniwXLRLkjkBRuezWkTDFKbG7dhfUrHBwDUK8jkgjNtGHiDJF8FsM',
  'nora-khan':
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
  'priya-sharma':
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
  'liam-oconnor':
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
};

const FALLBACK_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
];

export function getDiscoverHeroImage(profile, index = 0) {
  return (
    DISCOVER_HERO_IMAGES[profile.username] ||
    profile.src ||
    FALLBACK_HERO_IMAGES[index % FALLBACK_HERO_IMAGES.length]
  );
}

export function preloadDiscoverImages(profiles, startIndex = 0, count = 5) {
  profiles.slice(startIndex, startIndex + count).forEach((profile, offset) => {
    const img = new Image();
    img.src = getDiscoverHeroImage(profile, startIndex + offset);
  });
}

export const EMPTY_DISCOVER_FILTERS = {
  domain: '',
  skills: '',
  intent: '',
  location: '',
  commitment: '',
};

export function filterDiscoverProfiles(profiles, filters) {
  return profiles.filter((profile) => {
    const domain = filters.domain.trim().toLowerCase();
    const skills = filters.skills.trim().toLowerCase();
    const intent = filters.intent.trim().toLowerCase();
    const location = filters.location.trim().toLowerCase();
    const commitment = filters.commitment.trim().toLowerCase();

    if (domain && !profile.domain?.toLowerCase().includes(domain)) return false;
    if (
      skills &&
      !profile.skills?.some((skill) => skill.toLowerCase().includes(skills))
    ) {
      return false;
    }
    if (intent && !profile.intent?.toLowerCase().includes(intent)) return false;
    if (location && !profile.location?.toLowerCase().includes(location)) return false;
    if (commitment && !profile.commitment?.toLowerCase().includes(commitment)) return false;

    return true;
  });
}

export function shouldMatchOnConnect(profile, isSuper = false) {
  if (isSuper) return true;
  if (profile.match >= 88) return true;
  return Math.random() > 0.45;
}
