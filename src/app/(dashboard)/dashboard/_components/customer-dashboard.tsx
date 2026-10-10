import React from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useArea } from '@/lib/api/hooks/use-areas';
import { useSchedules } from '@/lib/api/hooks/use-schedules';
import { useMyBills } from '@/lib/api/hooks/use-bills';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lightbulb, CalendarX, FileText, Bell, Warning } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export function CustomerDashboard() {
  const { user } = useAuthStore();
  const areaId = user?.areaId;

  const { data: areaRes, isLoading: isAreaLoading } = useArea(areaId as string);
  const area = areaRes as any;
  const feeder = area?.feeder;

  const { data: schedulesRes } = useSchedules({ status: 'SCHEDULED' });
  const myFeederSchedules = schedulesRes?.data?.filter((s: any) => s.feederId === feeder?.id) || [];

  const { data: billsRes } = useMyBills();
  const latestBill = billsRes?.data?.[0];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Power Status */}
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Power Status</CardTitle>
          <Lightbulb className={`h-4 w-4 ${feeder?.status === 'ENERGIZED' ? 'text-green-500' : 'text-red-500'}`} />
        </CardHeader>
        <CardContent>
          {isAreaLoading ? (
            <div className="h-8 w-24 bg-surface-raised rounded animate-pulse"></div>
          ) : (
            <>
              <div className="text-2xl font-bold">{feeder?.status || 'UNKNOWN'}</div>
              <p className="text-xs text-ink-secondary mt-1">
                Area: {area?.name || 'Unassigned'}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Load Shedding */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Shedding</CardTitle>
          <CalendarX className="h-4 w-4 text-ink-secondary" />
        </CardHeader>
        <CardContent>
          {myFeederSchedules.length > 0 ? (
            <div className="space-y-4">
              {myFeederSchedules.slice(0, 2).map((schedule: any) => (
                <div key={schedule.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{format(new Date(schedule.startTime), 'MMM d, h:mm a')}</div>
                    <div className="text-xs text-ink-secondary">Duration: {Math.round((new Date(schedule.endTime).getTime() - new Date(schedule.startTime).getTime()) / 3600000)}h</div>
                  </div>
                  <Badge variant="outline" className="text-amber-600 bg-amber-50">
                    {schedule.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-ink-secondary">No upcoming shedding scheduled for your area.</div>
          )}
        </CardContent>
      </Card>

      {/* Latest Bill */}
      <Card className="col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Bill</CardTitle>
          <FileText className="h-4 w-4 text-ink-secondary" />
        </CardHeader>
        <CardContent>
          {latestBill ? (
            <>
              <div className="text-2xl font-bold font-mono">৳{latestBill.totalAmount}</div>
              <p className="text-xs text-ink-secondary mt-1 mb-4">
                Due: {format(new Date(latestBill.dueDate), 'MMM d, yyyy')}
              </p>
              <div className="flex justify-between items-center">
                <Badge variant={latestBill.status === 'PAID' ? 'default' : 'destructive'}>
                  {latestBill.status}
                </Badge>
                {latestBill.status !== 'PAID' && (
                  <Button size="sm">
                    <Link href={`/billing/${latestBill.id}`}>Pay Now</Link>
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-sm text-ink-secondary">No bills found.</div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions & Notifications */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quick Actions & Alerts</CardTitle>
          <Bell className="h-4 w-4 text-ink-secondary" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start gap-4 p-3 bg-red-50 text-red-900 rounded-lg">
            <Warning className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-sm">Facing an issue?</h4>
              <p className="text-xs opacity-90 mt-1">Report power outages or technical issues directly to our operations team.</p>
            </div>
            <Button variant="destructive" size="sm">
              <Link href="/incidents/report">Report Outage</Link>
            </Button>
          </div>
          <div className="text-sm text-ink-secondary flex items-center justify-center py-4 border border-dashed border-border rounded-lg">
            No new notifications.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
