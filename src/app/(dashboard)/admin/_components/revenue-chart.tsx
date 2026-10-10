'use client';

import { 
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function RevenueChart({ data }: { data?: any[] }) {
  const displayData = data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>Monthly billing revenue</CardDescription>
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
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `৳${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: any) => [`৳${value}`, 'Revenue']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
