'use client';
import { CheckCircle, Clock } from '@phosphor-icons/react';

const steps = ['REPORTED', 'ACKNOWLEDGED', 'IN_PROGRESS', 'RESOLVED'];

export function IncidentTimeline({ status }: { status: string }) {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-emerald-100 border-emerald-500 text-emerald-600' : 'bg-zinc-100 border-zinc-300 text-zinc-400'}`}>
                {isCompleted ? <CheckCircle weight="fill" className="w-6 h-6" /> : <Clock weight="regular" className="w-6 h-6" />}
              </div>
              <span className="text-xs mt-2 font-medium">{step.replace('_', ' ')}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 ${index < currentIndex ? 'bg-emerald-500' : 'bg-zinc-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
