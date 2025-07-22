"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ThemeToggleButton } from "./theme-toggle-button";
import { CoAILogo } from "@/components/ui/logo/CoAILogo";
import Navigation from "@/components/common/navigation";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Types
interface HeaderProps {
  className?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  label?: string;
}

const navigationItems: NavigationItem[] = [
  {
    name: "video-platform",
    href: "/video-platform",
    label: "Video Platform"
  },
  {
    name: "daily-news",
    href: "/daily-news", 
    label: "Daily News"
  }
];

export function Header({ className }: HeaderProps) {
  const { toast } = useToast();
  const { user: _user, isAuthenticated, logout } = useAuth();

  const handleLogout = React.useCallback(async () => {
    try {
      const { success, error } = await logout();
      if (success) {
        toast({
          title: "Success",
          description: "Logged out successfully",
          variant: "success",
        });
        window.location.href = '/login';
      } else {
        toast({
          title: "Error",
          description: error || "Failed to logout",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error", 
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  }, [logout, toast]);

  return (
    <>
      {/* New Navigation Component handles everything */}
      <Navigation />
      
      {/* Legacy header for additional items if needed - currently hidden */}
      <div className="hidden">
        <header className={`sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className || ''}`}>
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <CoAILogo variant="onBlack" size="sm" className="mr-10" />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="flex flex-1 items-center justify-end gap-x-2">
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                  {navigationItems.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="hidden lg:flex"
                  type="button"
                >
                  Logout
                </Button>
              ) : (
                <Button asChild variant="ghost" className="hidden lg:flex">
                  <Link href="/login">Login</Link>
                </Button>
              )}
              
              <ThemeToggleButton />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
