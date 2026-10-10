import React from 'react';
import { Lightning } from '@phosphor-icons/react/dist/ssr';

export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-canvas px-4">
      <div className="flex flex-col items-center">
        <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Lightning className="h-8 w-8 text-primary animate-pulse" weight="fill" />
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-ink-secondary animate-pulse">
          Loading PowerBank...
        </p>
      </div>
    </div>
  );
}
