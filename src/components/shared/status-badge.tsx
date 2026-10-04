import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FeederStatus } from '@/lib/types/infrastructure';

interface StatusBadgeProps {
  status: FeederStatus | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let badgeClasses = '';

  switch (status) {
    case 'ENERGIZED':
    case 'PAID':
    case 'SUCCEEDED':
    case 'RESOLVED':
    case 'COMPLETED':
      badgeClasses = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-transparent';
      break;
    case 'LOAD_SHED':
    case 'PENDING':
    case 'ACKNOWLEDGED':
    case 'ACTIVE':
      badgeClasses = 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-transparent';
      break;
    case 'FAULT':
    case 'OVERDUE':
    case 'FAILED':
    case 'REPORTED':
      badgeClasses = 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-transparent';
      break;
    case 'MAINTENANCE':
    case 'SCHEDULED':
    case 'IN_PROGRESS':
    case 'REFUNDED':
      badgeClasses = 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-transparent';
      break;
    default:
      badgeClasses = 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 border-transparent';
  }

  return (
    <Badge className={cn('px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide', badgeClasses, className)} variant="outline">
      {status.replace('_', ' ')}
    </Badge>
  );
}
