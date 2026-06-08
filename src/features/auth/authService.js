const AUTH_STORAGE_KEY = 'promatch.auth.session';

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function isBrowser() {
  return typeof window !== 'undefined';
}

function readSession() {
  if (!isBrowser()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (isBrowser()) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }

  return session;
}

export async function authenticateWithEmail({ mode, role = 'student', fullName = '', email, password }) {
  await delay(350);

  return writeSession({
    mode,
    role,
    provider: 'email',
    fullName: fullName || email.split('@')[0],
    email,
    hasPassword: Boolean(password),
    createdAt: new Date().toISOString(),
  });
}

export async function authenticateWithProvider(provider, mode = 'login', role = 'student') {
  await delay(250);

  return writeSession({
    mode,
    role,
    provider,
    email: `${provider}@promatch.dev`,
    fullName: provider === 'google' ? 'Google Builder' : 'LinkedIn Builder',
    createdAt: new Date().toISOString(),
  });
}

export function getStoredSession() {
  return readSession();
}

export function clearStoredSession() {
  if (isBrowser()) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}