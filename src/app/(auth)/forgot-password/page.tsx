'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth';
import { useForgotPassword } from '@/lib/api/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword();
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="text-sm text-ink-secondary">
          Enter your email address and we will send you a verification code.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-4 rounded-xl">
          <p className="text-sm text-emerald-800 dark:text-emerald-400 font-medium">
            If an account exists with that email, a verification code has been sent.
          </p>
          <div className="mt-4">
            <Link href="/reset-password">
              <Button variant="secondary" className="w-full">
                Enter Code to Reset Password
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m.hossain@example.com"
              autoComplete="email"
              disabled={isSubmitting || forgotPasswordMutation.isPending}
              className={errors.email ? 'border-danger' : ''}
              {...register('email')}
            />
            {errors.email && (
              <span className="text-danger text-xs mt-1">{errors.email.message}</span>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={isSubmitting || forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? 'Sending...' : 'Send reset code'}
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-ink-secondary mt-2">
        Remember your password?{' '}
        <Link href="/login" className="font-medium text-accent hover:text-accent-hover transition-colors">
          Back to login
        </Link>
      </p>
    </div>
  );
}
