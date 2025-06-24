import { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

interface VideoThumbnailProps {
  thumbnailUrl: string;
  videoTitle: string;
  id: string;
  className?: string;
}

export function VideoThumbnail({ thumbnailUrl, videoTitle, id, className = "" }: VideoThumbnailProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Determine if the image should be handled as an external URL
  const isExternal = thumbnailUrl?.startsWith('http');
  
  if (error || !thumbnailUrl) {
    return (
      <div className={`flex items-center justify-center bg-muted/50 ${className}`}>
        <Upload className="h-8 w-8 text-muted-foreground/70" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      <Image
        key={`thumb-${id}-${thumbnailUrl}`}
        src={thumbnailUrl}
        alt={videoTitle || "Video thumbnail"}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform group-hover:scale-105"
        unoptimized={isExternal}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
} 