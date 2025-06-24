"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ThemeToggleButton } from "./theme-toggle-button";
import { CoAILogo } from "@/components/ui/logo/CoAILogo";

import { NavBar } from "@/components/common/navigation";
import { MobileNavigation } from "@/components/common/navigation/mobile-menu";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";

import { navLinks, type NavLink } from "@/constants/nav-links";
import { useNotification } from "@/components/video-platform/notification";

export function Header() {
  const notification = useNotification();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const themeObserver = new MutationObserver(() => {
      checkDarkMode();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      themeObserver.disconnect();
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      notification.success("Success","Logout Successfully");
      window.location.href = '/login';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <CoAILogo variant="onBlack" size="sm" className="mr-10" />
        </Link>
        <div className="absolute right-16 top-2 flex lg:hidden">
          <MobileNavigation navLinks={navLinks} />
        </div>

        <NavBar />

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed left-0 top-0 z-40 h-full w-full bg-white bg-opacity-75 transition-all duration-300 dark:bg-black dark:bg-opacity-75 lg:hidden ${isMobileMenuOpen ? "block" : "hidden"
            }`}
          onClick={closeMobileMenu}
        ></div>

        {/* Mobile Menu Container (Card Style) */}
        <div
          className={`fixed left-0 top-0 z-50 h-full w-full transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } ${isMobileMenuOpen ? "bg-white dark:bg-black" : ""}`}
        >
          {/* Close Button */}
          <button
            className="absolute right-5 top-4 text-2xl font-bold text-black dark:text-white"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            &times; {/* Cross Symbol */}
          </button>

          <div className="mt-20 flex flex-col space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-black">
            <Link href="/" passHref>
              <p
                className="text-[16px] font-semibold text-black dark:text-white"
                onClick={closeMobileMenu}
              >
                Products →
              </p>
            </Link>
            <Link href="/" passHref>
              <p
                className="text-[16px] font-semibold text-black dark:text-white"
                onClick={closeMobileMenu}
              >
                Solutions →
              </p>
            </Link>
            <Link href="/pricing" passHref>
              <p
                className="text-[16px] font-semibold text-black dark:text-white"
                onClick={closeMobileMenu}
              >
                Pricing
              </p>
            </Link>
            <Link href="/" passHref>
              <p
                className="text-[16px] font-semibold text-black dark:text-white"
                onClick={closeMobileMenu}
              >
                Resources →
              </p>
            </Link>
            <Link href="/" passHref>
              <p
                className="text-[16px] font-semibold text-black dark:text-white"
                onClick={closeMobileMenu}
              >
                Company →
              </p>
            </Link>
            {/* Add new link here */}
            <Link href="/daily-news" passHref>
              <p
                className="text-[16px] font-semibold text-black dark:text-white"
                onClick={closeMobileMenu}
              >
                Daily News
              </p>
            </Link>
            {isAuthenticated ? (
              <button
                className="text-[16px] font-semibold text-black dark:text-white"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                Logout
              </button>
            ) : (
              <Link href="/login" passHref>
                <p
                  className="text-[16px] font-semibold text-black dark:text-white"
                  onClick={closeMobileMenu}
                >
                  Login
                </p>
              </Link>
            )}
          </div>
        </div>

        {/* Right Side Theme Toggle Button */}
        <div className="flex flex-1 items-center justify-end gap-x-2">
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={"/video-platform"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Video Platform
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* Add new menu item here */}
              <NavigationMenuItem>
                <Link href={"/daily-news"} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Daily News
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* End new menu item */}
            </NavigationMenuList>
          </NavigationMenu>
          
          {isAuthenticated ? (
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="hidden lg:flex"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" className="hidden lg:block">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
