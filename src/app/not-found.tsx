'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ghost, ArrowLeft, House } from '@phosphor-icons/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-canvas px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex max-w-md flex-col items-center text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-raised border border-border">
          <Ghost className="h-10 w-10 text-ink-tertiary" weight="duotone" />
        </div>
        
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-ink-primary sm:text-4xl">
          Page not found
        </h1>
        
        <p className="mb-8 text-base text-ink-secondary">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
        </p>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button 
            variant="secondary" 
            onClick={() => router.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back
          </Button>
          
          <Link 
            href="/dashboard"
            className={buttonVariants({ className: "w-full sm:w-auto" })}
          >
            <House className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </div>
      </motion.div>

      {/* Decorative background element, low opacity */}
      <div className="pointer-events-none fixed inset-0 z-[-1] flex items-center justify-center overflow-hidden opacity-[0.02]">
        <span className="text-[40vw] font-bold leading-none tracking-tighter select-none font-mono">
          404
        </span>
      </div>
    </div>
  );
}
