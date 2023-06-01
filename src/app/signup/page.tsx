'use client'
import React from 'react';
import { AuthenticationForm } from '@/components/AuthenticationForm';
import { useFormSubmit } from '@/hooks/useFormAuth';
import ProtectedRoute from '@/hocs/UnAuthenticatedRoute';


const formFields = [
  { id: 'firstName', label: 'First Name', name: 'firstName', autoComplete: 'given-name', autoFocus: true },
  { id: 'lastName', label: 'Last Name', name: 'lastName', autoComplete: 'family-name' },
  { id: 'email', label: 'Email Address', name: 'email', autoComplete: 'email' },
  { id: 'password', label: 'Password', name: 'password', autoComplete: 'new-password', type: 'password' },
];

export default function SignUp() {
  const { handleSubmit, loading, error, success } = useFormSubmit(true);

  return (
    <ProtectedRoute>
    <AuthenticationForm
      formTitle="Sign Up"
      formFields={formFields}
      buttonText="Sign Up"
      altText="Already have an account? Sign in"
      altLink="/login"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      success={success}
    />
    </ProtectedRoute>
  );
}
