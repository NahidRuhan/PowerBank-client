'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { useRegister } from '@/lib/api/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      meterNumber: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-ink-secondary">
          Enter your details to get started with PowerBank
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Rafiq Hossain"
            autoComplete="name"
            disabled={isSubmitting || registerMutation.isPending}
            className={errors.name ? 'border-danger' : ''}
            {...registerField('name')}
          />
          {errors.name && (
            <span className="text-danger text-xs mt-1">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m.hossain@example.com"
            autoComplete="email"
            disabled={isSubmitting || registerMutation.isPending}
            className={errors.email ? 'border-danger' : ''}
            {...registerField('email')}
          />
          {errors.email && (
            <span className="text-danger text-xs mt-1">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="meterNumber">Meter Number</Label>
          <Input
            id="meterNumber"
            placeholder="Enter your 10-digit meter number"
            className={`font-mono ${errors.meterNumber ? 'border-danger' : ''}`}
            disabled={isSubmitting || registerMutation.isPending}
            {...registerField('meterNumber')}
          />
          {errors.meterNumber && (
            <span className="text-danger text-xs mt-1">{errors.meterNumber.message}</span>
          )}
        </div>
        
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
          <Input
            id="phoneNumber"
            placeholder="+880..."
            disabled={isSubmitting || registerMutation.isPending}
            className={errors.phoneNumber ? 'border-danger' : ''}
            {...registerField('phoneNumber')}
          />
          {errors.phoneNumber && (
            <span className="text-danger text-xs mt-1">{errors.phoneNumber.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            disabled={isSubmitting || registerMutation.isPending}
            className={errors.password ? 'border-danger' : ''}
            {...registerField('password')}
          />
          {errors.password && (
            <span className="text-danger text-xs mt-1">{errors.password.message}</span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isSubmitting || registerMutation.isPending}
        >
          {registerMutation.isPending ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <p className="text-center text-sm text-ink-secondary mt-2">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-accent hover:text-accent-hover transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
