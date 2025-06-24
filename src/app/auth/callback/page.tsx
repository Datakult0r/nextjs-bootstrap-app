'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/libs/supabase';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Validate URL to prevent open redirect
function isValidRedirectURL(url: string): boolean {
  // Check if it's a relative URL (starts with /)
  if (url.startsWith('/')) {
    // Don't allow redirects to URLs that might be used for phishing
    return !url.includes('//') && !url.startsWith('//');
  }
  
  // If it's not a relative URL, it should not be allowed
  return false;
}

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get code and next from URL
      const code = searchParams.get('code');
      const next = searchParams.get('next') || '/';
      const safeNext = isValidRedirectURL(next) ? next : '/';
      
      if (!code) {
        // No code in URL, redirect to login
        console.error('No code provided in callback URL');
        router.push('/login?error=Authorization%20code%20missing');
        return;
      }
      
      try {
        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
          console.error('Error exchanging code for session:', error);
          router.push(`/login?error=${encodeURIComponent(error.message || 'Authentication failed')}`);
          return;
        }
        
        // Redirect to the intended destination or default route
        router.push(decodeURIComponent(safeNext));
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/login?error=Authentication%20failed');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[hsl(222.2,84%,4.9%)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Completing authentication...</h2>
        <p className="text-gray-500 dark:text-gray-400">Please wait while we finish the authentication process.</p>
      </div>
    </div>
  );
}

// Loading fallback
function CallbackFallback() {
  return <LoadingSpinner show={true} />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackContent />
    </Suspense>
  );
} 