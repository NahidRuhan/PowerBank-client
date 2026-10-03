'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations/auth';
import { useResetPassword } from '@/lib/api/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const router = useRouter();
  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      otp: '',
      newPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create new password</h1>
        <p className="text-sm text-ink-secondary">
          Enter your email, the 6-digit code, and your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m.hossain@example.com"
            disabled={isSubmitting || resetPasswordMutation.isPending}
            className={errors.email ? 'border-danger' : ''}
            {...register('email')}
          />
          {errors.email && (
            <span className="text-danger text-xs mt-1">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            placeholder="123456"
            className={`font-mono tracking-widest ${errors.otp ? 'border-danger' : ''}`}
            disabled={isSubmitting || resetPasswordMutation.isPending}
            maxLength={6}
            {...register('otp')}
          />
          {errors.otp && (
            <span className="text-danger text-xs mt-1">{errors.otp.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            disabled={isSubmitting || resetPasswordMutation.isPending}
            className={errors.newPassword ? 'border-danger' : ''}
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <span className="text-danger text-xs mt-1">{errors.newPassword.message}</span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isSubmitting || resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset password'}
        </Button>
      </form>

      <p className="text-center text-sm text-ink-secondary mt-2">
        <Link href="/login" className="font-medium text-accent hover:text-accent-hover transition-colors">
          Back to login
        </Link>
      </p>
    </div>
  );
}
