const BOOKED_SESSIONS_KEY = 'promatch.booked.sessions';

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function readStoredSessions() {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(BOOKED_SESSIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredSessions(sessions) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(BOOKED_SESSIONS_KEY, JSON.stringify(sessions));
}

export function getBookedSessions() {
  return readStoredSessions();
}

export function getBookedSessionsForUser(username) {
  if (!username) return [];
  return getBookedSessions().filter((session) => session.withUser === username);
}

export function getBookedSession(sessionId) {
  if (!sessionId) return null;
  return getBookedSessions().find((session) => session.id === sessionId) ?? null;
}

export function saveBookedSession({ withUser, day, slot, amount, currency, paymentMethod }) {
  const normalizedUser = withUser || 'me';
  const sessionId = `${normalizedUser}-${String(day || 'today').toLowerCase().replace(/\s+/g, '-')}-${String(slot || 'session')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;
  const session = {
    id: sessionId,
    withUser: normalizedUser,
    day: day || 'Today',
    slot: slot || 'Now',
    amount,
    currency,
    paymentMethod,
    status: 'confirmed',
    bookedAt: new Date().toISOString(),
  };
  const sessions = getBookedSessions().filter((item) => item.id !== session.id);
  writeStoredSessions([session, ...sessions]);
  return session;
}
