'use client';

import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedAccess() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="bg-secondary/30 p-4 rounded-full inline-flex mb-6">
          <ShieldAlert className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          You do not have permission to access this page. Only administrators can access this area.
        </p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
} 