"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { extractYouTubeVideoId } from "@/libs/utils"
import { ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoId: string
  youtubeUrl?: string
}

export default function VideoPlayer({ videoId, youtubeUrl }: VideoPlayerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Extract video ID using memoization to avoid recalculating
  const videoEmbedId = useMemo(() => {
    if (!youtubeUrl) return null
    return extractYouTubeVideoId(youtubeUrl)
  }, [youtubeUrl])

  // Handle iframe loading events
  const handleIframeLoad = useCallback(() => {
    setLoading(false)
  }, [])

  // Handle iframe errors
  const handleIframeError = useCallback(() => {
    setError(new Error("Failed to load video"))
    setLoading(false)
  }, [])

  // Reset loading state when video changes
  useEffect(() => {
    setLoading(true)
    setError(null)

    // Add a small timeout to ensure loading indicator shows momentarily
    // even for fast-loading videos
    const timer = setTimeout(() => {
      if (loading) setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [videoEmbedId, loading])

  // Handle retry
  const handleRetry = useCallback(() => {
    setLoading(true)
    setError(null)
    // Force rerender by adding random query parameter
    const iframe = document.querySelector('iframe')
    if (iframe) {
      const currentSrc = iframe.src
      iframe.src = currentSrc.includes('?')
        ? `${currentSrc}&_retry=${Date.now()}`
        : `${currentSrc}?_retry=${Date.now()}`
    }
  }, [])

  // Handle YouTube embed
  if (videoEmbedId) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        {/* Loading indicator */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
            <div className="text-center p-4 max-w-md">
              <div className="text-red-500 mb-2">⚠️</div>
              <h3 className="text-white font-medium mb-2">Failed to load video</h3>
              <Button variant="outline" onClick={handleRetry} className="bg-white/10 hover:bg-white/20">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        )}

        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoEmbedId}?autoplay=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          // loading="lazy"
          // onLoad={handleIframeLoad}
          onError={handleIframeError}
        ></iframe>
      </div>
    )
  }

  // Direct video files would be handled here if implemented

  // Fallback when no video source is available
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-medium">Video unavailable</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {youtubeUrl ?
            "This YouTube video couldn't be embedded. You can watch it directly on YouTube." :
            "This video doesn't have an associated media source."}
        </p>

        {youtubeUrl && (
          <Button variant="outline" asChild>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              Watch on YouTube
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

