"use client";

import type React from "react";

import { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/video-platform/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  Upload,
  User,
  Video,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/providers/auth-provider";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  count: number;
  hidesearch: boolean;
  onSearch?: (query: string) => void;
}

export default function PageLayout({
  children,
  title,
  count,
  hidesearch = false,
  onSearch,
}: PageLayoutProps) {
  const { setTheme, theme } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_NAME;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search to avoid too many updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="p-4 md:p-6">
            {/* Header with title, actions, and search */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                {/* Mobile menu trigger and title */}
                <div className="flex items-center gap-3">
                  <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] p-0">
                      <Sidebar />
                    </SheetContent>
                  </Sheet>
                  <h1 className="text-2xl font-bold">
                    {title}{" "}
                    <span className="text-muted-foreground">({count})</span>
                  </h1>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button> */}

                  {isAdmin ? (
                    <Button variant="ghost" size="icon" asChild>
                      <a href="/video-platform/upload">
                        <Upload className="h-5 w-5" />
                        <span className="sr-only">Upload</span>
                      </a>
                    </Button>
                  ) : (
                    <></>
                  )}

                  {/* <Button variant="ghost" size="icon" asChild>
                    <a href="/live">
                      <Video className="h-5 w-5" />
                      <span className="sr-only">Go Live</span>
                    </a>
                  </Button> */}

                  {/* <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                      </Button> */}

                  {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                              <a href="/profile">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a href="/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}
                </div>
              </div>

              {/* Search bar */}
              {!hidesearch && (
                <form onSubmit={handleSearch} className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="w-full pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              )}
            </div>

            {/* Page content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
