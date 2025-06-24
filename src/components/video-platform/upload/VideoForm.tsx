"use client"

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useCategories } from "@/hooks/useSupabaseData";
import { useNotification } from "@/components/video-platform/notification"

interface VideoFormProps {
  videoTitle: string;
  setVideoTitle: (title: string) => void;
  videoDescription: string;
  setVideoDescription: (description: string) => void;
  videoCategory: string;
  setVideoCategory: (category: string) => void;
  videoVisibility: "public" | "private";
  setVideoVisibility: (visibility: "public" | "private") => void;
  handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePublish: () => void;
  handleGoBack: () => void;
  isUploading: boolean;
  uploadProgress: number;
  uploadSuccess: boolean;
}

export function VideoForm({
  videoTitle,
  setVideoTitle,
  videoDescription,
  setVideoDescription,
  videoCategory,
  setVideoCategory,
  videoVisibility,
  setVideoVisibility,
  handleThumbnailChange,
  handlePublish,
  handleGoBack,
  isUploading,
  uploadProgress,
  uploadSuccess,
}: VideoFormProps) {
  const notification = useNotification()
  // Fetch categories from Supabase
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  
  // State for file input
  const [thumbnailFileName, setThumbnailFileName] = useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Set the first category as default if none selected and categories are loaded
  useEffect(() => {
    if (categories?.length > 0 && !videoCategory) {
      setVideoCategory(categories[0].id || "");
    }
  }, [categories, videoCategory, setVideoCategory]);

  useEffect(()=>{
    if (categoriesError) {
      notification.error("Category Error", "Failed to Load Categories!")
    }
  },[categoriesError, notification])
  // Custom file input handler
  const handleCustomThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnailFileName(e.target.files[0].name);
    } else {
      setThumbnailFileName("");
    }
    handleThumbnailChange(e);
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          placeholder="Add a title that describes your video"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Tell viewers about your video"
          rows={6}
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="category"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            value={videoCategory}
            onChange={(e) => setVideoCategory(e.target.value)}
            disabled={categoriesLoading}
          >
            {categoriesLoading ? (
              <option value="">Loading categories...</option>
            ) : categoriesError ? (
              <option value="">Error loading categories</option>
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="">No categories available</option>
            )}
          </select>
          
          {categoriesLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
        
        {categoriesError && (
          <p className="text-sm text-red-500 mt-1">
            Failed to load categories: {categoriesError.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="visibility" className="block text-sm font-medium mb-1">
          Visibility
        </label>
        <select 
          id="visibility" 
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          value={videoVisibility}
          onChange={(e) => setVideoVisibility(e.target.value as "public" | "private")}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <p className="text-xs text-muted-foreground mt-1">
          {videoVisibility === "public" 
            ? "Public videos are visible to everyone" 
            : "Private videos are only visible to you"}
        </p>
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
          Thumbnail
        </label>
        <input
          ref={fileInputRef}
          id="thumbnail"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCustomThumbnailChange}
        />
        <div className="flex items-center gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={triggerFileInput}
            className="flex items-center gap-2"
          >
            <ImageIcon className="h-4 w-4" />
            Choose Image
          </Button>
          <div className="flex-1 text-sm text-muted-foreground truncate">
            {thumbnailFileName ? thumbnailFileName : "No file chosen"}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Recommended: 1280×720px, 16:9 ratio, less than 4.5MB
        </p>
      </div>

      {isUploading && (
        <div className="space-y-2 p-3 border rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {uploadSuccess && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg">
          <div className="flex items-start">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-300">Upload successful!</p>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                Your video has been uploaded.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleGoBack}>
          Back
        </Button>

        <Button 
          onClick={handlePublish} 
          disabled={isUploading || uploadSuccess || !videoTitle || !videoCategory || categoriesLoading}
        >
          {isUploading ? "Uploading..." : uploadSuccess ? "Published!" : "Publish"}
        </Button>
      </div>
    </div>
  );
} 