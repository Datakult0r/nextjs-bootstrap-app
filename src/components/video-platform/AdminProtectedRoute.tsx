'use client';

import { useRequireAdmin } from "@/hooks/useRequireAuth";
import UnauthorizedAccess from "@/components/unauthorized-access";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Component that protects routes to be accessible only by the admin user
 */
export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAdmin, isUnauthorized, isLoading } = useRequireAdmin();

  // Show loading skeleton while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto p-4 md:p-6">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Show unauthorized message if user is not admin
  if (isUnauthorized) {
    return <UnauthorizedAccess />;
  }

  // If admin, render the protected content
  return <>{children}</>;
} 