import { Suspense } from "react"
import CategoryVideos from "@/components/video-platform/category-videos"
import PageLayout from "@/components/video-platform/page-layout"

export default async function ChannelPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await params as required by Next.js App Router
  const { slug } = await params;

  // Convert slug to a readable title (e.g., "ai-ml-news" to "AI/ML News")
  const title = slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ai" || word.toLowerCase() === "ml") return word.toUpperCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
    .replace("Ai", "AI")
    .replace("Ml", "ML")
    .replace("Of Ai", "Of AI")

  return (
    <PageLayout title={title} count={0} hidesearch={false}>
      <Suspense fallback={<div className="animate-pulse">Loading videos...</div>}>
        <CategoryVideos categorySlug={slug} />
      </Suspense>
    </PageLayout>
  )
}

