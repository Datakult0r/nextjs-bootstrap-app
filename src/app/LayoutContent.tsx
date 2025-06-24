'use client';

import { usePathname } from 'next/navigation';
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/footer";
import { GHLChatBot } from "@/components/common/widgets/ghl-chatbot";
import config from "./config";

// Define auth routes that should have a special layout
const AUTH_ROUTES = [
  '/login',
  '/signup',
  '/forgot-password',
  '/auth/reset-password',
  '/auth/callback',
  '/verify-email'
];

type LayoutContentProps = {
  children: React.ReactNode;
};

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  
  // Check if current path is an auth route with robust path matching
  const isAuthRoute = AUTH_ROUTES.some(route => 
    pathname === route || 
    pathname?.startsWith(`${route}/`)
  );

  return (
    <>
      {!isAuthRoute && <Header />}
      <main>{children}</main>
      {!isAuthRoute && <Footer />}
      {!isAuthRoute && <GHLChatBot {...config.chatbot.ghl} />}
    </>
  );
} 