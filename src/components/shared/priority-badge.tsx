import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Priority } from '@/lib/types/infrastructure';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  let badgeClasses = '';

  switch (priority) {
    case 'CRITICAL':
      badgeClasses = 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-transparent';
      break;
    case 'HIGH':
      badgeClasses = 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-transparent';
      break;
    case 'MEDIUM':
      badgeClasses = 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-transparent';
      break;
    case 'LOW':
      badgeClasses = 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-transparent';
      break;
    default:
      badgeClasses = 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-transparent';
  }

  return (
    <Badge className={cn('px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide', badgeClasses, className)} variant="outline">
      {priority}
    </Badge>
  );
}
