"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, LayoutGrid, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VideoUploadTab } from "@/components/video-platform/upload/VideoUploadTab"
import { VideoManageTab } from "@/components/video-platform/upload/VideoManageTab"
import { Video, mapSupabaseVideoToUIVideo } from "@/components/video-platform/upload/types"
import { getAllDBVideos } from "@/libs/api"
import { useAuth } from "@/providers/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"

export default function UploadPage() {
  const { user } = useAuth();
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_NAME;
  
  const [currentTab, setCurrentTab] = useState("upload")
  const [videos, setVideos] = useState<Video[]>([])
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const [loading, setLoading] = useState(true)

  // Fetch videos from the database
  useEffect(() => {
    // Only fetch videos if admin is authenticated
    if (!isAdmin) return
    
    const fetchVideos = async () => {
      try {
        const dbVideos = await getAllDBVideos()
        // Map the Supabase videos to our UI format with proper thumbnail handling
        const mappedVideos = dbVideos.map(video => mapSupabaseVideoToUIVideo(video))
        setVideos(mappedVideos)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [isAdmin])

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Video Manager</h1>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-3">
              <Button
                variant={currentTab === "upload" ? "default" : "outline"}
                onClick={() => setCurrentTab("upload")}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </Button>

              <Button
                variant={currentTab === "manage" ? "default" : "outline"}
                onClick={() => setCurrentTab("manage")}
                className="gap-2"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Manage</span>
              </Button>
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : currentTab === "upload" ? (
            <VideoUploadTab videos={videos} setVideos={setVideos} setCurrentTab={setCurrentTab} />
          ) : (
            <VideoManageTab 
              videos={videos} 
              setVideos={setVideos} 
              windowWidth={windowWidth} 
            />
          )}
        </div>
      </div>
    </div>
  )
}
