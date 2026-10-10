import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-4">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-ink-primary">{title}</h2>
        {description && <p className="text-sm text-ink-secondary mt-1">{description}</p>}
      </div>
      {action && <div className="w-full sm:w-auto overflow-x-auto hide-scrollbar">{action}</div>}
    </div>
  );
}
