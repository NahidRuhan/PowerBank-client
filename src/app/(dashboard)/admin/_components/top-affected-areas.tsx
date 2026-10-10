'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function TopAffectedAreas({ data }: { data?: any[] }) {
  const displayData = data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Affected Areas</CardTitle>
        <CardDescription>Areas with the highest number of incidents this month</CardDescription>
      </CardHeader>
      <CardContent>
        {displayData.length === 0 ? (
          <div className="text-center py-8 text-sm text-ink-secondary">No data available</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Area Name</TableHead>
                <TableHead className="text-right">Incidents</TableHead>
                <TableHead className="text-right">Avg. Restoration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((area) => (
                <TableRow key={area.id || area.name}>
                  <TableCell className="font-medium truncate max-w-[200px]" title={area.name}>{area.name}</TableCell>
                  <TableCell className="text-right">{area.incidents}</TableCell>
                  <TableCell className="text-right">{area.avgERT}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
