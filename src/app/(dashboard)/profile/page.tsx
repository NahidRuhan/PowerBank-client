'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/stores/auth-store';
import { useProfile, useUpdateProfile, useChangePassword } from '@/lib/api/hooks/use-users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { data: profileData, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  const [name, setName] = useState(user?.name || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Update local state when profile loads without useEffect to avoid cascading renders
  const [prevProfileData, setPrevProfileData] = useState(profileData);
  if (profileData !== prevProfileData) {
    setPrevProfileData(profileData);
    if (profileData?.data) {
      setName(profileData.data.name);
      setPhoneNumber(profileData.data.phoneNumber || '');
      if (profileData.data.avatar) {
        setAvatarPreview(profileData.data.avatar);
      }
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (phoneNumber) formData.append('phoneNumber', phoneNumber);
    if (avatarFile) formData.append('avatar', avatarFile);
    
    updateProfileMutation.mutate(formData);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    changePasswordMutation.mutate(
      { oldPassword: currentPassword, newPassword },
      {
        onSuccess: () => {
          setCurrentPassword('');
          setNewPassword('');
        }
      }
    );
  };

  if (isLoading) {
    return <div className="p-8"><div className="h-8 w-64 bg-surface-raised animate-pulse rounded"></div></div>;
  }

  const roleColors = {
    CUSTOMER: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
    OPERATOR: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    ADMIN: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  };
  const userRole = user?.role || 'CUSTOMER';

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Account Settings</h1>
        <p className="text-sm text-ink-secondary mt-1">
          Manage your profile and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-base font-medium">Profile Information</h2>
          <p className="text-sm text-ink-secondary mt-1">Update your account details.</p>
        </div>
        <div className="md:col-span-2">
          <form onSubmit={handleUpdateProfile} className="bg-surface rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
               <div className="relative h-16 w-16 rounded-full bg-surface-raised flex items-center justify-center overflow-hidden border border-border group">
                  {avatarPreview ? (
                    <Image 
                      src={avatarPreview} 
                      alt="Profile" 
                      className="h-full w-full object-cover" 
                      width={64} 
                      height={64} 
                      unoptimized={avatarPreview.startsWith('blob:')} 
                    />
                  ) : (
                    <span className="text-2xl font-semibold">{name.charAt(0) || 'U'}</span>
                  )}
                  <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <span className="text-white text-xs font-medium">Upload</span>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
               </div>
               <div>
                 <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${roleColors[userRole as keyof typeof roleColors]}`}>
                   {userRole}
                 </span>
                 <p className="text-sm text-ink-secondary mt-1">{user?.email}</p>
               </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={updateProfileMutation.isPending}
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="meterNumber">Meter Number</Label>
              <Input
                id="meterNumber"
                value={user?.meterNumber || ''}
                disabled
                className="font-mono bg-surface-raised text-ink-secondary"
              />
              <p className="text-xs text-ink-tertiary">Meter number cannot be changed.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={updateProfileMutation.isPending}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden border-t border-border sm:block" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-base font-medium">Security</h2>
          <p className="text-sm text-ink-secondary mt-1">Update your password to keep your account secure.</p>
        </div>
        <div className="md:col-span-2">
          <form onSubmit={handleChangePassword} className="bg-surface rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={changePasswordMutation.isPending}
                required
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={changePasswordMutation.isPending}
                required
                minLength={6}
              />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={changePasswordMutation.isPending}>
                {changePasswordMutation.isPending ? 'Updating...' : 'Update password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
