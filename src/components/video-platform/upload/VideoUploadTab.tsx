import React, { useState, useRef, useEffect, useCallback } from "react";
import { VideoImport } from "./VideoImport";
import { VideoForm } from "./VideoForm";
import { VideoPreview } from "./VideoPreview";
import { useCategories, useThumbnailUpload, useVideos } from "@/hooks/useSupabaseData";
import { createVideo } from "@/libs/api";
import { Video, mapSupabaseVideoToUIVideo } from "./types";
import { extractYouTubeVideoId } from "@/libs/utils";
import { useNotification } from "@/components/video-platform/notification"

interface VideoUploadTabProps {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  setCurrentTab: (tab: string) => void;
}

export function VideoUploadTab({ videos, setVideos, setCurrentTab }: VideoUploadTabProps) {
  const notification = useNotification()

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // YouTube specific state
  const [videoType, setVideoType] = useState<"youtube" | "direct">("direct");
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  
  // Supabase hooks
  const { categories } = useCategories();
  const { uploadThumbnail, uploading: thumbnailUploading } = useThumbnailUpload();
  const { addVideo } = useVideos();

  // Add visibility state
  const [videoVisibility, setVideoVisibility] = useState<"public" | "private">("private");

  // Import video function wrapped in useCallback
  const importVideo = useCallback(() => {
    if (error || isLoading || !videoUrl) return;

    setIsLoading(true);
    // Extract the YouTube video ID using the imported function
    const videoId = extractYouTubeVideoId(videoUrl);
    
    if (videoId) {
      // We have a valid YouTube video ID
      setYoutubeVideoId(videoId);
      setVideoType("youtube");
      
      // Auto-populate title if empty
      if (!videoTitle) {
        // In a real app, you would fetch video metadata from YouTube API
        setVideoTitle(`YouTube Video (${videoId})`);
      }
      
      // Set thumbnail preview from YouTube
      setThumbnailPreview(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      
      setIsLoading(false);
    } else {
      // For demo purposes, fallback to sample video if YouTube ID extraction fails
      setTimeout(() => {
        setVideoType("direct");
        setVideoPreview("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
        setIsLoading(false);
      }, 1500);
    }
  }, [error, isLoading, videoUrl, videoTitle]);

  // Validate and process URL when it changes
  useEffect(() => {
    if (!videoUrl) {
      setError(null);
      return;
    }

    // Simple validation for video URLs
    const isYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(videoUrl);

    if (isYoutubeUrl) {
      setError(null);

      // Auto-import after a short delay to allow user to finish typing
      const timer = setTimeout(() => {
        importVideo();
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setError("Please enter a valid YouTube URL");
    }
  }, [videoUrl, importVideo, notification]);

  // Set video to start at the beginning for thumbnail
  useEffect(() => {
    if (videoRef.current && videoPreview && videoType === "direct") {
      videoRef.current.currentTime = 0;
    }
  }, [videoPreview, videoType]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    if (!videoTitle) {
      alert("Please enter a title for your video");
      return;
    }

    if (!videoCategory) {
      alert("Please select a category for your video");
      return;
    }

    setIsUploading(true);
    let thumbnailUrl = "";

    try {
      // Step 1: Upload thumbnail if present
      if (thumbnailFile) {
        try {
          thumbnailUrl = await uploadThumbnail(thumbnailFile);
        } catch (uploadErr: any) {
          console.error("Thumbnail upload error:", uploadErr);
          notification.error("Upload Error", "Failed Uploading Thumbnail!")
          setIsUploading(false);
          return;
        }
      } else if (youtubeVideoId) {
        // Use YouTube thumbnail
        thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
      }

      // Step 2: Progress updates for UI
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(Math.min(progress, 90)); // Max at 90% until actual save
        if (progress >= 90) clearInterval(interval);
      }, 150);

      // Step 3: Create video in Supabase
      const newVideo = {
        title: videoTitle,
        description: videoDescription,
        youtube_url: youtubeVideoId ? `https://www.youtube.com/watch?v=${youtubeVideoId}` : videoUrl,
        thumbnail_url: thumbnailUrl,
        category_id: videoCategory,
        visible: videoVisibility === "public",
        isdeleted: false
      };

      try {
        console.log("Submitting video to Supabase:", newVideo);
        const savedVideo = await createVideo(newVideo);
        console.log("Video saved successfully:", savedVideo);
        notification.success("Video Published", "Video Successfully Published!")
        // Step 4: Complete progress and finish
        setUploadProgress(100);
        clearInterval(interval);
        
        // Step 5: Map the Supabase video to our UI format and add to videos array
        const uiVideo = mapSupabaseVideoToUIVideo(savedVideo);
        
        // Ensure the category is properly set
        const selectedCategoryObj = categories.find(cat => cat.id === videoCategory);
        if (selectedCategoryObj) {
          uiVideo.category = selectedCategoryObj.name;
        }
        
        // Add the new video to the beginning of the videos array
        setVideos(prevVideos => [uiVideo, ...prevVideos]);
        setUploadSuccess(true);

        // Step 6: Reset form after successful upload
        setTimeout(() => {
          setVideoUrl("");
          setVideoPreview(null);
          setYoutubeVideoId(null);
          setVideoTitle("");
          setVideoDescription("");
          setThumbnailPreview(null);
          setThumbnailFile(null);
          setUploadSuccess(false);
          setCurrentTab("manage");
        }, 2000);
      } catch (error: any) {
        clearInterval(interval);
        console.error("Error creating video in Supabase:", error);
        notification.error("Publish Failed", "Database Error");
        // Provide more specific error messages
        if (error.statusCode === "403" || error.message?.includes("policy")) {
          alert(`Supabase Row Level Security Error: ${error.message}\n\nPlease check your Supabase RLS policies and make sure they allow anonymous inserts to the videos table.`);
          notification.error("Publish Failed", "Database Security Error");
        } else if (error.code === "23505") {
          alert("This video has already been uploaded.");
        } else {
          alert(`Failed to publish video: ${error.message || "Unknown error"}`);
          notification.error("Publish Failed", "Failed to publish video.")
        }
        setIsUploading(false);
      }
    } catch (error: any) {
      console.error("Error publishing video:", error);
      alert(`Failed to upload: ${error.message || "Unknown error"}`);
      notification.error("Publish Failed", "Failed to publish video.");
      setIsUploading(false);
    }
  };

  const handleGoBack = () => {
    setVideoUrl("");
    setVideoPreview(null);
    setYoutubeVideoId(null);
  };

  return (
    <div className="space-y-6">
      {(videoPreview || youtubeVideoId) ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Form fields */}
          <VideoForm
            videoTitle={videoTitle}
            setVideoTitle={setVideoTitle}
            videoDescription={videoDescription}
            setVideoDescription={setVideoDescription}
            videoCategory={videoCategory}
            setVideoCategory={setVideoCategory}
            videoVisibility={videoVisibility}
            setVideoVisibility={setVideoVisibility}
            handleThumbnailChange={handleThumbnailChange}
            handlePublish={handlePublish}
            handleGoBack={handleGoBack}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            uploadSuccess={uploadSuccess}
          />

          {/* Right side - Video Preview */}
          <VideoPreview 
            videoRef={videoRef} 
            videoPreview={videoPreview} 
            videoType={videoType}
            youtubeVideoId={youtubeVideoId || undefined}
          />
        </div>
      ) : (
        <VideoImport
          videoUrl={videoUrl}
          setVideoUrl={setVideoUrl}
          error={error}
          isLoading={isLoading}
        />
      )}
    </div>
  );
} 