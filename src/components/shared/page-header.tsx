import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-border">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-ink-primary">{title}</h2>
        {description && <p className="text-sm text-ink-secondary mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
