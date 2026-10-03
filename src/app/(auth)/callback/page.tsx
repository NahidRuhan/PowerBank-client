'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { User } from '@/lib/types/auth';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr)) as User;
        
        // This is slightly tricky, we need to ensure the httpOnly cookie is set.
        // Usually, the backend sets the httpOnly cookie when redirecting to callback.
        // If our Next.js API handles OAuth, it sets the cookie and redirects here.
        // Assuming the tokens are set, we just need to populate Zustand and redirect.
        
        setAuth(token, user);
        router.push('/dashboard');
      } catch (err) {
        console.error('Failed to parse user data from callback URL', err);
        router.push('/login?error=OAuthFailed');
      }
    } else {
      router.push('/login?error=InvalidCallback');
    }
  }, [router, searchParams, setAuth]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-raised border-t-accent" />
      <p className="text-sm text-ink-secondary">Authenticating...</p>
    </div>
  );
}
