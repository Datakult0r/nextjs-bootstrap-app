'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextTopLoader from "nextjs-toploader";
import { NotificationContainer } from "@/components/video-platform/notification";
import { ThemeProvider } from "@/providers/theme-provider";
import { useAuth } from "@/providers/auth-provider";
import "@/styles/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-[hsl(222.2,84%,4.9%)] transition-colors duration-300">
        <NextTopLoader
          color="#00FFFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          zIndex={1600}
          showAtBottom={false}
        />
        {children}
        <NotificationContainer />
      </div>
    </ThemeProvider>
  );
} 