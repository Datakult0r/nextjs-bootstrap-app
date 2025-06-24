'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';

/**
 * Hook to protect routes that require authentication
 * @param redirectTo The path to redirect to if not authenticated (default: /login)
 * @returns Object with isAuthenticated status and loading state
 */
export function useRequireAuth(redirectTo = '/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Wait until auth state is loaded
    if (!isLoading) {
      setAuthChecked(true);
      
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        // Include the current path as a redirect parameter
        const redirectUrl = `${redirectTo}?redirectTo=${encodeURIComponent(pathname)}`;
        router.push(redirectUrl);
      }
    }
  }, [isAuthenticated, isLoading, pathname, redirectTo, router]);

  return { 
    isAuthenticated, 
    isLoading: isLoading || !authChecked 
  };
} 

type RequireAdminOptions = {
  redirectTo?: string;
  redirectIfNotAdmin?: boolean;
  nonAdminRedirectTo?: string;
};

/**
 * Hook to protect routes that require admin privileges
 * @param options Configuration options
 * @param options.redirectTo The path to redirect to if not authenticated (default: /login)
 * @param options.redirectIfNotAdmin Whether to redirect non-admin users (default: false)
 * @param options.nonAdminRedirectTo The path to redirect to if authenticated but not admin (default: /)
 * @returns Object with isAdmin status, unauthorized flag, and loading state
 */
export function useRequireAdmin(options: RequireAdminOptions = {}) {
  const { 
    redirectTo = '/login', 
    redirectIfNotAdmin = false, 
    nonAdminRedirectTo = '/' 
  } = options;
  
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_NAME;
  const isAdmin = isAuthenticated && user?.email === adminEmail;
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    // Wait until auth state is loaded
    if (!isLoading) {
      setAuthChecked(true);
      
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        const redirectUrl = `${redirectTo}?redirectTo=${encodeURIComponent(pathname)}`;
        router.push(redirectUrl);
        return;
      }
      
      // If authenticated but not admin
      if (!isAdmin) {
        if (redirectIfNotAdmin) {
          // Redirect to specified path if redirectIfNotAdmin is true
          router.push(nonAdminRedirectTo);
        } else {
          // Otherwise mark as unauthorized to show message
          setIsUnauthorized(true);
        }
      } else {
        setIsUnauthorized(false);
      }
    }
  }, [isAuthenticated, isLoading, isAdmin, pathname, redirectTo, nonAdminRedirectTo, redirectIfNotAdmin, router]);

  return { 
    isAdmin,
    isAuthenticated, 
    isUnauthorized,
    isLoading: isLoading || !authChecked 
  };
} 