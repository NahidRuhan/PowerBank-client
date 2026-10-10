'use client';

import { 
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function OutageChart({ data }: { data?: any[] }) {
  const displayData = data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Outages Overview</CardTitle>
        <CardDescription>Reported vs Resolved incidents this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {displayData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-ink-secondary">No data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={displayData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="reported" 
                  stroke="#ef4444" 
                  fillOpacity={1} 
                  fill="url(#colorReported)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorResolved)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
