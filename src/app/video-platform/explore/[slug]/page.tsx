import EmptyCategory from "@/components/video-platform/empty-category"

export default function ExplorePage({ params }: { params: { slug: string } }) {
  // Convert slug to a readable title (e.g., "ai-system-design" to "AI System Design")
  const title = params.slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ai" || word.toLowerCase() === "100x") return word.toUpperCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
    .replace("Ai", "AI")
    .replace("And", "&")

  return <EmptyCategory title={title} />
}

