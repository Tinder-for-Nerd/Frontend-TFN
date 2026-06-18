import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createPromatchQueryClient } from '../../packages/shared/src/query/index.js';

export function QueryProvider({ children }) {
  const [queryClient] = useState(() => createPromatchQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
