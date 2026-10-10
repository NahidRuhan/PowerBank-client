'use client';

import { useState } from 'react';
import { useUsers, useDeleteUser } from '@/lib/api/hooks/use-admin';
import { User } from '@/lib/types/user';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DotsThree, Trash, UserGear } from '@phosphor-icons/react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { RoleChangeDialog } from './role-change-dialog';
// Assuming useAuthStore gives us current user to prevent self-deletion
import { useAuthStore } from '@/stores/auth-store';
import { DataTablePagination } from '@/components/shared/data-table-pagination';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';

export function UsersTable() {
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useUsers({ page, limit: 10 });
  const { mutate: deleteUser } = useDeleteUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const currentUser = useAuthStore(state => state.user);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  const users = Array.isArray(response?.data) 
    ? response.data 
    : ((response as any)?.data?.users || (response as any)?.data?.data || []);

  const handleRoleChange = (user: User) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
  };

  return (
    <>
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'ADMIN' ? 'default' : user.role === 'OPERATOR' ? 'secondary' : 'outline'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt || '').toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
                        <span className="sr-only">Open menu</span>
                        <DotsThree className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRoleChange(user)}>
                          <UserGear className="mr-2 h-4 w-4" />
                          <span>Change Role</span>
                        </DropdownMenuItem>
                        {currentUser?.id !== user.id && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination 
        page={page} 
        totalPages={(response as any)?.pagination?.pages || (response as any)?.data?.pagination?.pages || (response as any)?.meta?.pages || (response as any)?.data?.meta?.pages || (response as any)?.meta?.totalPages || (response as any)?.data?.meta?.totalPages || 1} 
        onPageChange={setPage} 
      />

      <RoleChangeDialog 
        user={selectedUser} 
        open={isRoleDialogOpen} 
        onOpenChange={setIsRoleDialogOpen} 
      />

      <ConfirmDialog
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={() => {
          if (itemToDelete) {
            deleteUser(itemToDelete);
          }
        }}
        confirmText="Delete"
      />
    </>
  );
}
