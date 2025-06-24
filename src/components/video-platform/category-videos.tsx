"use client"

import { useState, useEffect, useMemo } from "react"
import { useCategoryVideos } from "@/hooks/useSupabaseData"
import VideoGrid from "./video-grid"
import { getCategories } from "@/libs/api"
import { Spinner } from "@/components/common/spinner"

interface CategoryVideosProps {
  categorySlug: string
  searchQuery?: string
  onVideoCountChange?: (count: number) => void
}

export default function CategoryVideos({
  categorySlug,
  searchQuery = "",
  onVideoCountChange
}: CategoryVideosProps) {
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [categoryName, setCategoryName] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Map of slugs to normalized category names
  const slugMap = useMemo<Record<string, string>>(() => ({
    "ai-ml-news": "AI/ML News",
    "cybernetics": "Cybernetics",
    "polymatheism": "Polymatheism",
    "new-realty": "The New Realty",
    "clinic-of-ai": "Clinic Of AI"
  }), []);

  // Get videos for this category
  const {
    videos,
    loading: videosLoading,
    error: videosError,
    refresh: refreshVideos
  } = useCategoryVideos(categoryId || undefined)

  // Update the parent with the video count whenever videos change or search changes
  useEffect(() => {
    if (videos && onVideoCountChange && !videosLoading) {
      // We'll let VideoGrid handle the filtered count since it does the search filtering
      if (!searchQuery) {
        onVideoCountChange(videos.length);
      }
    }
  }, [videos, onVideoCountChange, videosLoading, searchQuery]);

  // Get the category ID from the slug
  useEffect(() => {
    async function fetchCategoryId() {
      try {
        setLoading(true);
        setError(null);

        const categories = await getCategories();

        if (!categories || categories.length === 0) {
          throw new Error("No categories found in the database");
        }

        const categoryName = Object.prototype.hasOwnProperty.call(slugMap, categorySlug)
          ? slugMap[categorySlug]
          : categorySlug
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        const category = categories.find(cat =>
          cat.name.toLowerCase() === categoryName.toLowerCase() ||
          cat.name.replace(/[^\w\s]/g, "").toLowerCase() === categoryName.toLowerCase()
        );

        if (category) {
          setCategoryId(category.id || null);
          setCategoryName(category.name);
        } else {
          throw new Error(`Category "${categoryName}" not found`);
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setCategoryId(null);
        setCategoryName("");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryId();
  }, [categorySlug, slugMap]);

  // When category ID changes, try to refresh videos
  useEffect(() => {
    if (categoryId && refreshVideos) {
      refreshVideos();
    }
  }, [categoryId, refreshVideos]);

  // Return early if we're still loading the category ID
  if (loading) {
    return (
     <Spinner />
    );
  }

  // Show error if we couldn't find the category
  if (error || !categoryId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
          ❌
        </div>
        <h2 className="text-xl font-semibold mb-2">Category Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          {error?.message || "We couldn't find the category you're looking for."}
        </p>
      </div>
    );
  }

  // Handler for video count changes (from search filtering in VideoGrid)
  const handleVideoCountChange = (count: number) => {
    if (onVideoCountChange) {
      onVideoCountChange(count);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>
      <VideoGrid
        searchQuery={searchQuery}
        videos={videos}
        loading={videosLoading}
        error={videosError}
        onVideoCountChange={handleVideoCountChange}
      />
    </div>
  );
} 