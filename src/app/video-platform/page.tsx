"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import PageLayout from "@/components/video-platform/page-layout"
import VideoGrid from "@/components/video-platform/video-grid"
import { useAllVideos } from "@/hooks/useSupabaseData"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [videoCount, setVideoCount] = useState(0)

  // Fetch videos in the main component to allow for better state management
  const { videos, loading, error } = useAllVideos()

  // Debounce search query to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Memoize handlers to prevent unnecessary re-renders
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleVideoCountChange = useCallback((count: number) => {
    setVideoCount(count)
  }, [])

  // Memoize filtered videos based on search query
  const filteredVideos = useMemo(() => {
    if (!videos) return []

    if (!debouncedQuery) return videos

    const query = debouncedQuery.trim().toLowerCase()
    return videos.filter(video =>
      (video?.title?.toLowerCase().includes(query)) ||
      (video?.description?.toLowerCase().includes(query)) ||
      (video?.categories?.name?.toLowerCase().includes(query))
    )
  }, [videos, debouncedQuery])

  return (
    <PageLayout
      title="Recommended"
      count={videoCount}
      onSearch={handleSearch}
      hidesearch={false}
    >
      <VideoGrid
        searchQuery={debouncedQuery}
        onVideoCountChange={handleVideoCountChange}
        videos={filteredVideos}
        loading={loading}
        error={error}
      />
    </PageLayout>
  )
}
