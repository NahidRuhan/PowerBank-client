'use client';

import { 
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'FDR-01', hours: 12 },
  { name: 'FDR-02', hours: 15 },
  { name: 'FDR-03', hours: 10 },
  { name: 'FDR-04', hours: 25 },
  { name: 'FDR-05', hours: 14 },
  { name: 'FDR-06', hours: 11 },
  { name: 'FDR-07', hours: 13 },
];

export function FairnessChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Fairness</CardTitle>
        <CardDescription>Load shedding hours per feeder this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                type="category" 
                dataKey="name" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                width={60}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: any) => [`${value} hrs`, 'Shedding Duration']}
              />
              <Bar 
                dataKey="hours" 
                fill="#f59e0b" 
                radius={[0, 4, 4, 0]} 
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
