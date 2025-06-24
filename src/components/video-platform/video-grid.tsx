"use client"

import { useState, useEffect, useMemo, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAllVideos } from "@/hooks/useSupabaseData"
import { extractYouTubeVideoId } from "@/libs/utils"
import { VideoGridSkeleton } from "./video-grid-skeleton"
import { Spinner } from "@/components/common/spinner"

interface VideoGridProps {
  searchQuery?: string
  onVideoCountChange?: (count: number) => void
  categoryId?: string
  // Props for direct data passing
  videos?: any[]
  loading?: boolean
  error?: Error | null
}

// Memoized video card component to prevent unnecessary re-renders
const VideoCard = memo(({ video, formatDate, getThumbnailUrl }: {
  video: any,
  formatDate: (date: string) => string,
  getThumbnailUrl: (video: any) => string
}) => {
  return (
    <div className="group">
      <Link
        href={`/video-platform/watch/${video?.id}`}
        className="space-y-2"
      >
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          <Image
            src={getThumbnailUrl(video)}
            alt={video?.title || "Video thumbnail"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized={getThumbnailUrl(video).includes('youtube.com')}
            loading="lazy"
          />
          {extractYouTubeVideoId(video?.youtube_url || '') && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Avatar className="h-9 w-9 rounded-full">
            {video?.categories?.name ? (
              <AvatarFallback style={{ backgroundColor: stringToColor(video.categories.name) }}>
                {video.categories.name.charAt(0)}
              </AvatarFallback>
            ) : (
              <AvatarFallback>V</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium line-clamp-2 text-sm">{video?.title || "Untitled video"}</h3>
            <div className="flex flex-col text-xs text-muted-foreground">
              <span className="flex items-center">
                {video?.categories?.name || "Uncategorized"}
              </span>
              <div className="flex items-center gap-1">
                <span>{formatDate(video?.created_at || "")}</span>
                {video?.youtube_url && <ExternalLink className="h-3 w-3" />}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

// Memoized pagination component
const Pagination = memo(({
  currentPage,
  totalPages,
  setCurrentPage
}: {
  currentPage: number,
  totalPages: number,
  setCurrentPage: (page: number) => void
}) => {
  // Calculate pagination range
  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    } else {
      return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {paginationRange.map(pageNum => (
          <Button
            key={`page-${pageNum}`}
            variant={currentPage === pageNum ? "default" : "outline"}
            size="icon"
            onClick={() => setCurrentPage(pageNum)}
            className="hidden sm:flex"
          >
            {pageNum}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default function VideoGrid({
  searchQuery = "",
  onVideoCountChange,
  categoryId,
  videos: propVideos,
  loading: propLoading,
  error: propError
}: VideoGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Always call hooks unconditionally (React hooks rule)
  const { videos: fetchedVideos, loading: fetchLoading, error: fetchError } = useAllVideos();

  // Then decide which data to use
  const videos = propVideos || fetchedVideos;
  const loading = propLoading !== undefined ? propLoading : fetchLoading;
  const error = propError || fetchError;

  const videosPerPage = 12;

  // Memoize filtered videos to avoid unnecessary filtering on re-renders
  const filteredVideos = useMemo(() => {
    if (!videos) return [];

    let filtered = [...videos];

    // Filter by category if needed and not pre-filtered
    if (categoryId && !propVideos) {
      filtered = filtered.filter(video => video?.category_id === categoryId);
    }

    // Filter by search query if specified
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (video) =>
          (video?.title?.toLowerCase().includes(query)) ||
          (video?.description?.toLowerCase().includes(query)) ||
          (video?.categories?.name && video.categories.name.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [videos, categoryId, searchQuery, propVideos]);

  // Update video count and reset page when filtered videos change
  useEffect(() => {
    if (onVideoCountChange) {
      onVideoCountChange(filteredVideos.length);
    }
    setCurrentPage(1);
  }, [filteredVideos.length, onVideoCountChange]);

  // Memoize pagination values
  const totalPages = useMemo(() =>
    Math.max(1, Math.ceil(filteredVideos.length / videosPerPage)),
    [filteredVideos.length, videosPerPage]
  );

  // Get current page videos
  const currentVideos = useMemo(() => {
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    return filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  }, [filteredVideos, currentPage, videosPerPage]);

  // Format date for display - memoize to avoid recreation
  const formatDate = useMemo(() => (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();

    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return "Today";
    if (diffInDays < 2) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  }, []);

  // Handle thumbnail URL - memoize function
  const getThumbnailUrl = useMemo(() => (video: any) => {
    // Check if there's a thumbnail URL
    if (!video?.thumbnail_url) {
      // If no thumbnail URL but has YouTube URL, generate YouTube thumbnail
      const videoId = extractYouTubeVideoId(video?.youtube_url || '');
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
      // Fallback to placeholder
      return '/placeholder.svg';
    }
    return video.thumbnail_url;
  }, []);

  // Loading state
  if (loading) {
    // return <VideoGridSkeleton />;
    return <Spinner/>
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
          ❌
        </div>
        <h2 className="text-xl font-semibold mb-2">Error loading videos</h2>
        <p className="text-muted-foreground max-w-md">
          {error.message || "Something went wrong. Please try again later."}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  // No videos to display
  if (filteredVideos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl text-muted-foreground">0</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">No videos found</h2>
        <p className="text-muted-foreground max-w-md">
          {searchQuery ? "No videos match your search criteria" : "No videos available yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4 mr-3">
          {currentVideos.map((video) => (
            <VideoCard
              key={video?.id || `video-${video?.title}`}
              video={video}
              formatDate={formatDate}
              getThumbnailUrl={getThumbnailUrl}
            />
          ))}
        </div>
      </ScrollArea>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

// Helper function to generate a consistent color from a string
function stringToColor(str: string): string {
  if (!str) return '#6E56CF'; // Default color

  let hash = 0;
  // Use only first 8 characters for more consistent colors
  const normalizedStr = str.substring(0, 8).toLowerCase();

  for (let i = 0; i < normalizedStr.length; i++) {
    hash = normalizedStr.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate HSL color with fixed saturation and lightness for better contrast
  let h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 45%)`;
}
