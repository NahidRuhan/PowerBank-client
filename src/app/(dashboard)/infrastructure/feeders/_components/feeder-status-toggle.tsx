'use client';

import { useState } from 'react';
import { FeederStatus } from '@/lib/types/infrastructure';
import { useUpdateFeeder } from '@/lib/api/hooks/use-feeders';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/shared/status-badge';
import { CaretDown } from '@phosphor-icons/react';

interface FeederStatusToggleProps {
  feederId: string;
  currentStatus: FeederStatus;
}

export function FeederStatusToggle({ feederId, currentStatus }: FeederStatusToggleProps) {
  const updateMutation = useUpdateFeeder();
  const [isOpen, setIsOpen] = useState(false);

  // According to design, only manual toggle between ENERGIZED and MAINTENANCE is allowed
  const canToggle = currentStatus === 'ENERGIZED' || currentStatus === 'MAINTENANCE';

  if (!canToggle) {
    // Just render badge for FAULT or LOAD_SHED, no dropdown
    return <StatusBadge status={currentStatus} />;
  }

  const handleStatusChange = (status: FeederStatus) => {
    updateMutation.mutate({ id: feederId, payload: { status } });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-1 hover:opacity-80 transition-opacity focus:outline-none">
        <StatusBadge status={currentStatus} className="cursor-pointer" />
        <CaretDown size={14} className="text-ink-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {currentStatus !== 'ENERGIZED' && (
          <DropdownMenuItem onClick={() => handleStatusChange('ENERGIZED')}>
            Set to ENERGIZED
          </DropdownMenuItem>
        )}
        {currentStatus !== 'MAINTENANCE' && (
          <DropdownMenuItem onClick={() => handleStatusChange('MAINTENANCE')}>
            Set to MAINTENANCE
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
