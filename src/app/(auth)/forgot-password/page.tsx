"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';
import { useNotification } from '@/components/video-platform/notification';
import { useTheme } from '@/providers/theme-provider';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuth();
  const notification = useNotification();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      notification.error('Email Required', 'Please enter your email address.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notification.error('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);

    try {
      const { success, error } = await forgotPassword(email);

      if (success) {
        setIsSubmitted(true);
      } else {
        notification.error('Password Reset Failed', error || 'Unable to process your request. Please try again.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
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
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                      placeholder="name@example.com"
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
                      Send Reset Link
                      <Send className="h-5 w-5" />
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Check Your Email</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the email? Check your spam folder or try again.
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
