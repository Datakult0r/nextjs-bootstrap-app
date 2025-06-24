"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { formatUploadDate } from "@/components/video-platform/upload/types"

interface VideoInfoProps {
  videoId: string
  video: any
}

export default function VideoInfo({ videoId, video }: VideoInfoProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likeCount, setLikeCount] = useState(15243)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Calculate if description should be truncated
  const shouldTruncate = video?.description && video.description.length > 200
  const displayDescription = shouldTruncate && !showFullDescription
    ? video.description.substring(0, 200) + "..."
    : video.description
  
  // Format date for display
  const uploadDate = formatUploadDate(video?.created_at || "")
  
  // Helper function to generate a color from a string (category name)
  const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    
    return color;
  }

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1)
      setIsLiked(false)
    } else {
      setLikeCount((prev) => prev + (isDisliked ? 2 : 1))
      setIsLiked(true)
      setIsDisliked(false)
    }
  }

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false)
    } else {
      if (isLiked) {
        setLikeCount((prev) => prev - 1)
      }
      setIsLiked(false)
      setIsDisliked(true)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  if (!video) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-3/4"></div>
        <div className="flex justify-between">
          <div className="skeleton h-10 w-32"></div>
          <div className="skeleton h-10 w-20"></div>
        </div>
        <div className="skeleton h-24 w-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{video.title}</h1>
      
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            {video?.categories?.name ? (
              <AvatarFallback style={{ backgroundColor: stringToColor(video.categories.name) }}>
                {video.categories.name.charAt(0)}
              </AvatarFallback>
            ) : (
              <AvatarFallback>V</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{video?.categories?.name || "Uncategorized"}</p>
            <p className="text-sm text-muted-foreground">
              {uploadDate}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {video.youtube_url && (
            <Button variant="outline" size="sm" asChild>
              <a 
                href={video.youtube_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                YouTube <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          )}
          
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <div className="whitespace-pre-wrap">
          {displayDescription || "No description provided."}
        </div>
        
        {shouldTruncate && (
          <Button
            variant="link"
            className="p-0 h-auto text-xs font-medium mt-1"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show less" : "Show more"}
          </Button>
        )}
      </div>
    </div>
  )
}

