'use client';
import React from 'react';
import { AuthenticationForm } from '@/components/AuthenticationForm';
import { useFormSubmit } from '@/hooks/useFormAuth';
import ProtectedRoute from '@/hocs/UnAuthenticatedRoute';

const formFields = [
  { id: 'email', label: 'Email Address', name: 'email', autoComplete: 'email', autoFocus: true },
  { id: 'password', label: 'Password', name: 'password', autoComplete: 'current-password', type: 'password' },
];

export default function SignIn() {
  const { handleSubmit, loading, error, success } = useFormSubmit(false);

  return (
    <ProtectedRoute>
    <AuthenticationForm
      formTitle="Sign In"
      formFields={formFields}
      buttonText="Sign In"
      altText="Don't have an account? Sign Up"
      altLink="/signup"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
    />
    </ProtectedRoute>
  );
}
