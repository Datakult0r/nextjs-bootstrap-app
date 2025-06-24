import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { VideoTable } from "./VideoTable";
import { Pagination } from "./Pagination";
import { EditVideoDialog } from "./EditVideoDialog";
import { DeleteVideoDialog } from "./DeleteVideoDialog";
import { Video, mapSupabaseVideoToUIVideo } from "./types";
import { deleteVideo, updateVideoVisibility } from "@/libs/api";
import { useVideoVisibility } from "@/hooks/useSupabaseData";
import { useNotification } from "@/components/video-platform/notification";

interface VideoManageTabProps {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  windowWidth: number;
}

export function VideoManageTab({ videos, setVideos, windowWidth }: VideoManageTabProps) {
  const notification = useNotification()
  // Video management state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Use the visibility hook for better API integration
  const { toggleVisibility, updating } = useVideoVisibility();

  const videosPerPage = 10;

  // Filter videos based on search query
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage);

  // Update the handleVideoClick function to use the same modal for both description and edit icon clicks
  const handleVideoClick = (video: Video) => {
    setEditingVideo({ ...video });
    setIsEditDialogOpen(true);
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideoToDelete(videoId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteVideo = async () => {
    if (!videoToDelete) return;
    setIsProcessing(true);
    
    try {
      // Soft delete the video (setting isdeleted to true)
      await deleteVideo(videoToDelete);
      
      // Remove it from the UI
      setVideos(videos.filter((v) => v.id !== videoToDelete));
      
      // Adjust current page if needed
      if (paginatedVideos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      notification.success("Success", "Video deleted successfully.")
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
      setVideoToDelete(null);
      setIsProcessing(false);
    }
  };

  const toggleVideoVisibility = async (videoId: string) => {
    
    const video = videos.find(v => v.id === videoId);
    if (!video) return;
    
    // Current visibility state
    const isCurrentlyPublic = video.visibility === "public";
    notification.success("Visibility Changed", `Video is now ${isCurrentlyPublic ? "public" : "private"}`);
    try {
      // Optimistic update for UI
      setVideos(
        videos.map((v) => {
          if (v.id === videoId) {
            return {
              ...v,
              visibility: isCurrentlyPublic ? "private" : "public",
            };
          }
          return v;
        })
      );
      
      // Call the API to update visibility
      await updateVideoVisibility(videoId, !isCurrentlyPublic);
      
    } catch (error) {
      console.error("Error toggling visibility:", error);
      
      // Revert optimistic update if API call fails
      setVideos(
        videos.map((v) => {
          if (v.id === videoId) {
            return {
              ...v,
              visibility: isCurrentlyPublic ? "public" : "private",
            };
          }
          return v;
        })
      );
      
      alert("Failed to update visibility. Please try again.");
    }
  };

  const formatDate = (dateString: string, compact = false) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    if (compact) {
      return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
      });
    }
    return (
      date.toLocaleString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }) + " UTC"
    );
  };

  const formatViews = (views: number) => {
    if (!views) return "0";
    
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return `${views}`;
  };

  return (
    <div className="space-y-6">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        totalVideos={videos.length}
        filteredCount={filteredVideos.length}
      />

      <VideoTable
        paginatedVideos={paginatedVideos}
        currentPage={currentPage}
        videosPerPage={videosPerPage}
        windowWidth={windowWidth}
        searchQuery={searchQuery}
        formatDate={formatDate}
        formatViews={formatViews}
        handleEditVideo={handleVideoClick}
        handleDeleteVideo={handleDeleteVideo}
        toggleVideoVisibility={toggleVideoVisibility}
        handleVideoClick={handleVideoClick}
      />

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          setCurrentPage={setCurrentPage} 
        />
      )}

      <EditVideoDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        editingVideo={editingVideo}
        setEditingVideo={setEditingVideo}
        onVideoUpdated={(updatedVideo) => {
          // Refresh the videos list with the updated video data
          setVideos(videos.map((v) => {
            if (v.id === updatedVideo.id) {
              // Use the updated video object directly
              return updatedVideo;
            }
            return v;
          }));
          setEditingVideo(null);
        }}
      />

      <DeleteVideoDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        confirmDelete={confirmDeleteVideo}
        isProcessing={isProcessing}
      />
    </div>
  );
} 