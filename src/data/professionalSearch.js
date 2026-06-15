import { profiles } from './mockData';

export const PROFESSIONAL_SEARCH_KEY = 'pm_professional_search';

export const PROFESSIONAL_TYPES = [
  { id: 'mentor', label: 'Mentor', keywords: ['mentor', 'mentoring', 'advisor', 'coach'] },
  { id: 'cofounder', label: 'Co-founder', keywords: ['co-founder', 'cofounder', 'founder', 'startup'] },
  { id: 'advisor', label: 'Advisor', keywords: ['advisor', 'advisory', 'board'] },
  { id: 'freelancer', label: 'Freelancer', keywords: ['freelancer', 'contract', 'consultant'] },
  { id: 'technical', label: 'Technical lead', keywords: ['engineer', 'developer', 'technical', 'backend', 'frontend', 'full-stack'] },
  { id: 'product', label: 'Product manager', keywords: ['product', 'pm', 'roadmap'] },
  { id: 'designer', label: 'Designer', keywords: ['design', 'ux', 'ui', 'figma'] },
  { id: 'data', label: 'Data / ML specialist', keywords: ['ml', 'data', 'machine learning', 'ai'] },
];

export const EMPTY_PROFESSIONAL_SEARCH = {
  professionalType: '',
  domain: '',
  skills: '',
  intent: '',
  location: '',
  commitment: '',
  notes: '',
};

export function getAllPlatformProfiles() {
  return Object.values(profiles).filter((profile) => profile?.username && profile.username !== 'me');
}

function normalize(value) {
  return (value ?? '').toString().trim().toLowerCase();
}

function haystack(profile) {
  return [
    profile.name,
    profile.title,
    profile.role,
    profile.audience,
    profile.domain,
    profile.intent,
    profile.commitment,
    profile.location,
    profile.headline,
    profile.bio,
    ...(profile.skills ?? []),
    ...(profile.goals ?? []),
  ]
    .join(' ')
    .toLowerCase();
}

function scoreField(hay, needle, weight) {
  if (!needle) return 0;
  if (hay.includes(needle)) return weight;
  const parts = needle.split(/[\s,]+/).filter(Boolean);
  if (!parts.length) return 0;
  const hits = parts.filter((part) => hay.includes(part)).length;
  return Math.round((hits / parts.length) * weight);
}

function scoreProfessionalType(profile, typeId) {
  if (!typeId) return 0;
  const type = PROFESSIONAL_TYPES.find((item) => item.id === typeId);
  if (!type) return 0;

  const hay = haystack(profile);
  const keywordHit = type.keywords.some((keyword) => hay.includes(keyword));
  const audienceBoost = profile.audience === 'Professional' ? 12 : 0;

  return (keywordHit ? 28 : 8) + audienceBoost;
}

export function calculateRelevance(profile, criteria) {
  const hay = haystack(profile);
  const skillsNeedle = normalize(criteria.skills);

  const breakdown = {
    type: scoreProfessionalType(profile, criteria.professionalType),
    domain: scoreField(hay, normalize(criteria.domain), 22),
    skills: skillsNeedle
      ? scoreField(
          (profile.skills ?? []).join(' ').toLowerCase(),
          skillsNeedle,
          24,
        ) + scoreField(hay, skillsNeedle, 12)
      : 0,
    intent: scoreField(hay, normalize(criteria.intent), 18),
    location: scoreField(hay, normalize(criteria.location), 14),
    commitment: scoreField(hay, normalize(criteria.commitment), 10),
  };

  const total = Math.min(
    99,
    Object.values(breakdown).reduce((sum, value) => sum + value, 0),
  );

  return { total, breakdown };
}

export function searchProfilesByRequirements(criteria) {
  const hasCriteria = Boolean(
    criteria.professionalType
    || criteria.domain?.trim()
    || criteria.skills?.trim()
    || criteria.intent?.trim()
    || criteria.location?.trim()
    || criteria.commitment?.trim(),
  );

  if (!hasCriteria) {
    return getAllPlatformProfiles().map((profile) => ({
      ...profile,
      relevanceScore: profile.match ?? 70,
      searchMatch: true,
    }));
  }

  return getAllPlatformProfiles()
    .map((profile) => {
      const relevance = calculateRelevance(profile, criteria);
      return {
        ...profile,
        match: relevance.total,
        relevanceScore: relevance.total,
        relevanceBreakdown: relevance.breakdown,
        searchMatch: true,
      };
    })
    .filter((profile) => profile.relevanceScore >= 15)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export function loadStoredProfessionalSearch() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(PROFESSIONAL_SEARCH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfessionalSearch(criteria) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(PROFESSIONAL_SEARCH_KEY, JSON.stringify(criteria));
}

export function clearStoredProfessionalSearch() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(PROFESSIONAL_SEARCH_KEY);
}

export function getProfessionalTypeLabel(typeId) {
  return PROFESSIONAL_TYPES.find((type) => type.id === typeId)?.label ?? 'Professional';
}
