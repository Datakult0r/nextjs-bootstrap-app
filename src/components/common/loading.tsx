import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  variant?: "default" | "minimal" | "page" | "inline";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function Loading({ 
  variant = "default", 
  size = "md", 
  text,
  className 
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  const iconSize = sizeClasses[size];

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Loader2 className={cn("animate-spin text-muted-foreground", iconSize)} />
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2 className={cn("animate-spin", iconSize)} />
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div className={cn("flex min-h-screen items-center justify-center", className)}>
        <div className="text-center">
          <Loader2 className={cn("mx-auto animate-spin text-primary", iconSize)} />
          {text && (
            <p className="mt-4 text-sm text-muted-foreground">{text}</p>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center">
        <Loader2 className={cn("mx-auto animate-spin text-primary", iconSize)} />
        {text && (
          <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        )}
      </div>
    </div>
  );
} 