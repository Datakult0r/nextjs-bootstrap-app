"use client"

import { useState } from "react"
import CategoryVideos from "@/components/video-platform/category-videos"
import PageLayout from "@/components/video-platform/page-layout"

export default function ChannelPage({ params }: { params: { slug: string } }) {
  const [videoCount, setVideoCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  // Convert slug to a readable title (e.g., "ai-ml-news" to "AI/ML News")
  const title = params.slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ai" || word.toLowerCase() === "ml") return word.toUpperCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
    .replace("Ai", "AI")
    .replace("Ml", "ML")
    .replace("Of Ai", "Of AI")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleVideoCountChange = (count: number) => {
    setVideoCount(count)
  }

  return (
    <PageLayout title={title} count={videoCount} onSearch={handleSearch} hidesearch={false}>
      <CategoryVideos
        categorySlug={params.slug}
        searchQuery={searchQuery}
        onVideoCountChange={handleVideoCountChange}
      />
    </PageLayout>
  )
}

