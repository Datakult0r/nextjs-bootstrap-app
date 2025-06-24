"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAllVideos } from "@/hooks/useSupabaseData"
import { extractYouTubeVideoId } from "@/libs/utils"

interface RelatedVideosProps {
  videoId: string
}

export default function RelatedVideos({ videoId }: RelatedVideosProps) {
  const [relatedVideos, setRelatedVideos] = useState<any[]>([])

  const { videos, loading, error } = useAllVideos()

  // Filter and sort related videos
  useEffect(() => {
    if (videos && videoId) {
      // Get current video data
      const currentVideo = videos.find(v => v.id === videoId)

      // Filter out the current video and sort by potential relevance
      let filtered = videos.filter(v => v.id !== videoId)

      // If current video has a category, prioritize videos from same category
      if (currentVideo?.category_id) {
        filtered.sort((a, b) => {
          // Sort by category match first
          if (a.category_id === currentVideo.category_id && b.category_id !== currentVideo.category_id) return -1
          if (a.category_id !== currentVideo.category_id && b.category_id === currentVideo.category_id) return 1

          // Then by date (newer first)
          return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
        })
      } else {
        // Just sort by newest
        filtered.sort((a, b) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime())
      }

      // Take 6 videos max
      setRelatedVideos(filtered.slice(0, 6))
    }
  }, [videos, videoId])

  // Handle thumbnail URL
  const getThumbnailUrl = (video: any) => {
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
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const now = new Date()

    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays < 1) return "Today"
    if (diffInDays < 2) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="flex gap-2 animate-pulse">
            <div className="h-20 w-36 bg-muted rounded"></div>
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-sm text-muted-foreground p-2 border rounded-md">
        Error loading related videos
      </div>
    )
  }

  // No videos found
  if (relatedVideos.length === 0) {
    return (
      <div className="text-sm text-muted-foreground p-4 border rounded-md text-center">
        No related videos found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {relatedVideos.map((video) => (
        <Link href={`/video-platform/watch/${video.id}`} key={video.id} className="flex gap-2 group">
          <div className="relative aspect-video w-36 rounded-md overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={getThumbnailUrl(video)}
              alt={video?.title || "Video thumbnail"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              unoptimized={getThumbnailUrl(video).includes('youtube.com')}
            />
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 leading-tight">
              {video?.title || "Untitled video"}
            </h3>
            <p className="text-xs text-muted-foreground">{video?.categories?.name || "Uncategorized"}</p>
            <p className="text-xs text-muted-foreground">{formatDate(video?.created_at || "")}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

