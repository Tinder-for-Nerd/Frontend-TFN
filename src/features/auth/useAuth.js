import { useCallback, useState } from 'react';
import { authenticateWithEmail, authenticateWithProvider, getStoredSession } from './authService';

export function useAuth(mode = 'login') {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [session, setSession] = useState(() => getStoredSession());

  const updateField = useCallback((field, value) => {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }));
    setError('');
  }, []);

  const submitEmail = useCallback(async ({ role = 'student' } = {}) => {
    setIsSubmitting(true);
    setError('');

    try {
      const nextSession = await authenticateWithEmail({ mode, role, ...formState });
      setSession(nextSession);
      return nextSession;
    } catch (submissionError) {
      setError('Unable to continue. Please try again.');
      throw submissionError;
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, mode]);

  const submitProvider = useCallback(async (provider, { role = 'student' } = {}) => {
    setIsSubmitting(true);
    setError('');

    try {
      const nextSession = await authenticateWithProvider(provider, mode, role);
      setSession(nextSession);
      return nextSession;
    } catch (submissionError) {
      setError('Unable to continue. Please try again.');
      throw submissionError;
    } finally {
      setIsSubmitting(false);
    }
  }, [mode]);

  return {
    error,
    formState,
    isSubmitting,
    session,
    submitEmail,
    submitProvider,
    updateField,
  };
}