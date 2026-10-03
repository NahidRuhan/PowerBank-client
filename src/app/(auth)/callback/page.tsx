'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { User } from '@/lib/types/user';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr)) as User;
        
        const completeLogin = () => {
          setAuth(token, user);
          router.push('/dashboard');
        };

        if (refreshToken) {
          fetch('/api/auth/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          }).then(completeLogin).catch(completeLogin);
        } else {
          completeLogin();
        }
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
