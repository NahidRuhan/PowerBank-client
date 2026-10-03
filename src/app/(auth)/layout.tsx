import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full bg-canvas">
      {/* Left side: Form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {children}
        </div>
      </div>
      
      {/* Right side: Branded visual */}
      <div className="relative hidden w-0 flex-1 lg:block bg-surface-raised">
        <div className="absolute inset-0 h-full w-full p-12 flex flex-col justify-between overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)]"></div>
          
          <div className="flex items-center gap-2 relative z-10">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256">
                <path d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path>
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight">PowerBank</span>
          </div>
          <div className="max-w-md relative z-10">
            <h2 className="text-3xl font-semibold tracking-tight text-ink-primary mb-4">
              Mission-critical infrastructure management
            </h2>
            <p className="text-ink-secondary text-sm leading-relaxed max-w-[65ch]">
              Advanced power grid control system for monitoring substations, scheduling load shedding, and resolving incidents in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
