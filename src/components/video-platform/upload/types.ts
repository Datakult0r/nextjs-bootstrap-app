import { Video as SupabaseVideo } from "@/libs/api";
import { extractYouTubeVideoId } from "@/libs/utils";

// UI representation of a video for the VideoTable component
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailPreview?: string;
  thumbnailFile?: File;
  views: number;
  uploadDate: string;
  duration: string;
  visibility: string;
  category: string;
  youtubeVideoId?: string | null;
  videoType?: "youtube" | "direct";
}

// Extended interface for the Supabase Video with additional properties
interface SupabaseVideoWithJoins extends SupabaseVideo {
  categories?: {
    id?: string;
    name?: string;
  };
  views?: number;
}

// Helper to get the thumbnail URL from a video
export function getThumbnailUrl(video: SupabaseVideoWithJoins): string {
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
export function formatUploadDate(dateString: string) {
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
}

// Convert a Supabase Video to the UI Video format
export function mapSupabaseVideoToUIVideo(video: SupabaseVideoWithJoins): Video {
  // Extract YouTube video ID if present
  const youtubeVideoId = extractYouTubeVideoId(video.youtube_url || '');
  
  // Get thumbnail URL
  const thumbnail = getThumbnailUrl(video);
  
  // Determine duration (dummy value for now since we don't store it)
  const duration = "0:00";
  
  // Ensure category is properly set
  const category = video.categories?.name || "Uncategorized";
  
  return {
    id: video.id || "",
    title: video.title || "",
    description: video.description || "",
    thumbnail: thumbnail,
    views: video.views || 0,
    uploadDate: video.created_at || new Date().toISOString(),
    duration: duration,
    visibility: video.visible ? "public" : "private",
    category: category,
    youtubeVideoId: youtubeVideoId,
    videoType: youtubeVideoId ? "youtube" : "direct"
  };
}
