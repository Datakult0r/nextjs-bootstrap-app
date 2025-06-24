import React, { useRef } from "react";
import { AlertCircle, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VideoImportProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  error: string | null;
  isLoading: boolean;
}

export function VideoImport({
  videoUrl,
  setVideoUrl,
  error,
  isLoading,
}: VideoImportProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 md:p-12 text-center">
      <h3 className="text-lg font-medium mb-4">Import video from URL</h3>

      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <button
            type="button"
            onClick={focusInput}
            className="flex-shrink-0 focus:outline-none"
            aria-label="Focus input for YouTube"
          >
            <Youtube className="h-8 w-8 text-red-600 hover:text-red-700 transition-colors" />
          </button>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className={`w-full pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="flex items-start mt-2 text-red-500 text-sm text-left">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
} 