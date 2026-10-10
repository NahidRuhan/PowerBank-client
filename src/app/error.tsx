'use client';

import React, { useEffect } from 'react';
import { WarningCircle, ArrowCounterClockwise } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-canvas px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 border border-red-100">
          <WarningCircle className="h-10 w-10 text-red-500" weight="duotone" />
        </div>
        
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
          Something went wrong!
        </h1>
        
        <p className="mb-8 text-base text-ink-secondary">
          We encountered an unexpected error. Our team has been notified.
        </p>

        <Button 
          onClick={() => reset()}
          className="w-full sm:w-auto"
        >
          <ArrowCounterClockwise className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
