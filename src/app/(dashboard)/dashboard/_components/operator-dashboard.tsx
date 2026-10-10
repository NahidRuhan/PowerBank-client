import React from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useIncidents } from '@/lib/api/hooks/use-incidents';
import { useFeeders } from '@/lib/api/hooks/use-feeders';
import { useSchedules } from '@/lib/api/hooks/use-schedules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChartBar, Plus, ShieldWarning, LightningSlash, CalendarPlus } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export function OperatorDashboard() {
  const { user } = useAuthStore();

  const { data: incidentsRes } = useIncidents({ limit: 10 });
  const allIncidents = incidentsRes?.data || [];
  const activeIncidents = allIncidents.filter((i: any) => ['REPORTED', 'ACKNOWLEDGED', 'IN_PROGRESS'].includes(i.status));
  const assignedIncidents = activeIncidents.filter((i: any) => i.assigneeId === user?.id);

  const { data: feedersRes } = useFeeders();
  const feeders = feedersRes?.data || [];
  const faultyFeeders = feeders.filter((f: any) => f.status === 'FAULT');
  const loadShedFeeders = feeders.filter((f: any) => f.status === 'LOAD_SHED');

  const { data: schedulesRes } = useSchedules({ status: 'SCHEDULED' });
  // Just show today's schedules approximately
  const todaySchedules = schedulesRes?.data?.filter((s: any) => {
    const d = new Date(s.startTime);
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }) || [];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Infrastructure Status */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Grid Overview</CardTitle>
          <ChartBar className="h-4 w-4 text-ink-secondary" />
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 p-4 rounded-xl border border-red-200 bg-red-50 text-red-900">
            <div className="flex items-center gap-2 font-medium text-sm">
              <LightningSlash className="h-4 w-4" />
              Feeders in FAULT
            </div>
            <div className="text-3xl font-bold">{faultyFeeders.length}</div>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900">
            <div className="flex items-center gap-2 font-medium text-sm">
              <ShieldWarning className="h-4 w-4" />
              Feeders in LOAD SHED
            </div>
            <div className="text-3xl font-bold">{loadShedFeeders.length}</div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action */}
      <Card className="col-span-1 flex flex-col justify-center bg-surface-raised border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <CalendarPlus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-1">Schedule Maintenance</h3>
          <p className="text-xs text-ink-secondary mb-4">Plan load shedding or maintenance windows.</p>
          <Button>
            <Link href="/schedules" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Schedule
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Active Incidents */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          <Button variant="ghost" size="sm">
            <Link href="/incidents" className="text-xs">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {activeIncidents.length > 0 ? (
            <div className="space-y-4">
              {activeIncidents.slice(0, 4).map((incident: any) => (
                <div key={incident.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium flex items-center gap-2">
                      <span className="text-xs text-ink-secondary font-mono">{incident.id.slice(0, 8)}</span>
                    </div>
                    <div className="text-xs text-ink-secondary flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] py-0">{incident.priority}</Badge>
                      <span>{format(new Date(incident.createdAt), 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {incident.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-ink-secondary py-4 text-center">No active incidents at the moment.</div>
          )}
        </CardContent>
      </Card>

      {/* Assigned to Me & Today's Schedules */}
      <div className="col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assigned to Me</CardTitle>
          </CardHeader>
          <CardContent>
            {assignedIncidents.length > 0 ? (
              <div className="space-y-3">
                {assignedIncidents.slice(0, 3).map((incident: any) => (
                  <div key={incident.id} className="flex justify-between items-center text-sm">
                    <span className="font-mono">{incident.id.slice(0, 8)}</span>
                    <Badge variant="outline">{incident.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-ink-secondary">No incidents assigned to you.</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todaySchedules.length}</div>
            <p className="text-xs text-ink-secondary mt-1">Scheduled for today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
