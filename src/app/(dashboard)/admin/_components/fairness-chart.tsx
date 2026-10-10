'use client';

import { 
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function FairnessChart({ data }: { data?: any[] }) {
  const displayData = data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Fairness</CardTitle>
        <CardDescription>Load shedding hours per feeder this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {displayData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-ink-secondary">No data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayData}
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
