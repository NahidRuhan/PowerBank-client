'use client';

import { PageHeader } from '@/components/shared/page-header';
import { UsersTable } from '../_components/users-table';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage system users, roles, and access"
      />
      <UsersTable />
    </div>
  );
}
