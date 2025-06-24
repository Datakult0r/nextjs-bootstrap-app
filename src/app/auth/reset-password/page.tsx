'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Unlock } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { useNotification } from '@/components/video-platform/notification';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Password strength validator
function validatePassword(password: string): { isValid: boolean; message: string } {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!(hasLowercase && hasUppercase && hasNumber)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number' 
    };
  }
  
  return { isValid: true, message: '' };
}

function ResetPasswordContent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const { updatePassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const notification = useNotification();

  useEffect(() => {
    // Check for error parameters in URL or hash fragment
    const error = searchParams.get('error') || window.location.hash.includes('error=access_denied');
    const errorCode = searchParams.get('error_code') || window.location.hash.includes('error_code=otp_expired');
    
    // Extract error description from hash if present
    let errorDescription = searchParams.get('error_description');
    if (!errorDescription && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      errorDescription = hashParams.get('error_description');
    }
    
    if ((error || error === 'access_denied') && (errorCode || errorCode === 'otp_expired')) {
      setIsLinkExpired(true);
      notification.error(
        'Link Expired', 
        errorDescription?.replace(/\+/g, ' ') || 'Email link is invalid or has expired'
      );
    }
  }, [searchParams, notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      notification.error('Passwords do not match', 'Please make sure both passwords match.');
      return;
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      notification.error('Password too weak', passwordValidation.message);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { success, error } = await updatePassword(password);
      
      if (!success) {
        notification.error('Password Reset Failed', error || 'Unable to reset password');
      } else {
        setIsSuccess(true);
        notification.success('Password Updated', 'Your password has been successfully reset.');
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      notification.error('Password Reset Failed', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-[hsl(222.2,84%,4.9%)]">
      {/* Background elements (similar to login page) */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-[0.03] dark:opacity-[0.03]" />
      <div
        className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-700/30 via-violet-600/20 to-transparent blur-3xl"
        style={{
          top: `calc(50% - 250px)`,
          left: `calc(50% - 250px)`,
        }}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center relative">
            <div className="absolute inset-0 bg-cyan-500/30 blur-xl"></div>
            <div className="flex items-center relative">
              <div className="bg-[#00d2e6] text-white rounded-tl-[20px] text-[2rem] font-bold px-4 pt-[0.3rem] pb-[0.2rem] mr-1">Clinic</div>
              <div className="ml-1 text-[2rem] font-bold text-gray-800 dark:text-white flex items-start">
                <span>of</span>
                <span className="ml-2 relative">
                  AI
                  <span className="absolute right-[-0.7rem] top-[0.1rem] flex">
                    <span className="bg-gray-800 dark:bg-black rounded-full w-[0.4rem] h-[0.4rem] border border-gray-800 dark:border-white ml-0.5" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 shadow-[0_0_40px_rgba(8,_112,_184,_0.2)] overflow-hidden p-8">
          {isLinkExpired ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Link Expired</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The password reset link has expired or is invalid. Please request a new password reset link.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex items-center justify-center px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Request New Link
              </Link>
            </div>
          ) : !isSuccess ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Your Password</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter your new password below
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative group">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity"></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3.5 px-4 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(8,_112,_184,_0.5)] hover:shadow-[0_0_25px_rgba(8,_112,_184,_0.7)] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Reset Password
                      <Unlock className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Password Reset Complete</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your password has been successfully reset. You will be redirected to the login page shortly.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading fallback
function ResetPasswordFallback() {
  return <LoadingSpinner show={true} />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
} 