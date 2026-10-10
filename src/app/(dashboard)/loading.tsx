import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full">
      <div className="space-y-2">
        <div className="h-8 w-1/3 bg-surface-raised rounded"></div>
        <div className="h-4 w-1/4 bg-surface-raised rounded"></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-6">
             <div className="h-4 w-24 bg-surface-raised rounded mb-4"></div>
             <div className="h-8 w-16 bg-surface-raised rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="h-64 w-full bg-surface-raised rounded-xl border border-border"></div>
    </div>
  );
}
