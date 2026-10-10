'use client';
import { useScheduleFairness } from '@/lib/api/hooks/use-schedules';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function FairnessChart() {
  const { data, isLoading } = useScheduleFairness();

  if (isLoading) return <div className="h-[400px] flex items-center justify-center">Loading chart...</div>;
  const chartData = Array.isArray((data as any)?.data) ? (data as any).data : ((data as any)?.data?.fairness || (data as any)?.data?.data || []);
  if (!chartData || chartData.length === 0) return <div>No data available</div>;

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="feederId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalHours" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
