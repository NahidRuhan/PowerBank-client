'use client';

import { 
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data until API provides it
const data = [
  { name: 'Mon', reported: 400, resolved: 240 },
  { name: 'Tue', reported: 300, resolved: 139 },
  { name: 'Wed', reported: 200, resolved: 980 },
  { name: 'Thu', reported: 278, resolved: 390 },
  { name: 'Fri', reported: 189, resolved: 480 },
  { name: 'Sat', reported: 239, resolved: 380 },
  { name: 'Sun', reported: 349, resolved: 430 },
];

export function OutageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Outages Overview</CardTitle>
        <CardDescription>Reported vs Resolved incidents this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
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
        </div>
      </CardContent>
    </Card>
  );
}
