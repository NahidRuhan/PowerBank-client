'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MOCK_DATA = [
  { id: '1', name: 'Dhanmondi-A', incidents: 12, avgERT: '45m' },
  { id: '2', name: 'Gulshan-1', incidents: 8, avgERT: '1h 10m' },
  { id: '3', name: 'Banani-South', incidents: 7, avgERT: '30m' },
  { id: '4', name: 'Mirpur-10', incidents: 5, avgERT: '2h 15m' },
  { id: '5', name: 'Uttara-Sector-4', incidents: 4, avgERT: '50m' },
];

export function TopAffectedAreas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Affected Areas</CardTitle>
        <CardDescription>Areas with the highest number of incidents this month</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Area Name</TableHead>
              <TableHead className="text-right">Incidents</TableHead>
              <TableHead className="text-right">Avg. Restoration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_DATA.map((area) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell className="text-right">{area.incidents}</TableCell>
                <TableCell className="text-right">{area.avgERT}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
