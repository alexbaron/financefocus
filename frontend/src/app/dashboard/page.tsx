'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FinanceFocus</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>You are authenticated!</p>
          <p className="mt-2">User ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Roles: {user.roles.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
