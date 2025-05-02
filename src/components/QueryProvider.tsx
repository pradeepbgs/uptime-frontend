'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import AuthWrapper from './AuthWrapper';

const queryClient = new QueryClient();

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {/* <AuthWrapper> */}
        {children}
        {/* </AuthWrapper> */}
      </SessionProvider>
    </QueryClientProvider>
  );
}