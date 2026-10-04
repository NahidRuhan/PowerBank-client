'use client';

import { useState, useEffect } from 'react';
import { useSearchAreas } from '@/lib/api/hooks/use-areas';
import { Input } from '@/components/ui/input';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useDebounce } from '@/lib/utils'; // I will create this hook next if it doesn't exist

export function AreaSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const { data, isLoading } = useSearchAreas(debouncedQuery);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlass className="h-5 w-5 text-ink-tertiary" />
      </div>
      <Input
        type="text"
        className="pl-10"
        placeholder="Search areas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* We could render a dropdown with results here, but for now we just show it's loading */}
      {isLoading && debouncedQuery && (
        <div className="absolute right-3 top-2.5 text-xs text-ink-secondary">Loading...</div>
      )}
    </div>
  );
}
