'use client';

import { PageHeader } from '@/components/shared/page-header';
import { AuditLogsTable } from '../_components/audit-logs-table';

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Logs"
        description="System-wide activity and changes trail"
      />
      <AuditLogsTable />
    </div>
  );
}
