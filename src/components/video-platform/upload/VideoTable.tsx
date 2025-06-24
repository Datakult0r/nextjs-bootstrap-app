import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useNotification } from "@/components/video-platform/notification";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Clock,
  ThumbsUp,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import { Video } from "./types";
import { VideoThumbnail } from "./VideoThumbnail";

interface VideoTableProps {
  paginatedVideos: Video[];
  currentPage: number;
  videosPerPage: number;
  windowWidth: number;
  searchQuery: string;
  formatDate: (dateString: string, compact?: boolean) => string;
  formatViews: (views: number) => string;
  handleEditVideo: (video: Video) => void;
  handleDeleteVideo: (videoId: string) => void;
  toggleVideoVisibility: (videoId: string) => void;
  handleVideoClick: (video: Video) => void;
}

export function VideoTable({
  paginatedVideos,
  currentPage,
  videosPerPage,
  windowWidth,
  searchQuery,
  formatDate,
  formatViews,
  handleEditVideo,
  handleDeleteVideo,
  toggleVideoVisibility,
  handleVideoClick,
}: VideoTableProps) {
  const notification = useNotification()
  // Responsive columns visibility
  const showNumberColumn = windowWidth >= 480;
  const showCategoryColumn = windowWidth >= 1200;
  const showVisibilityColumn = windowWidth >= 1200;
  const showDateColumn = windowWidth >= 1200;
  const showViewsColumn = windowWidth >= 1200;
  const showDeleteButton = windowWidth >= 1200;
  const showDescription = windowWidth >= 480;
  const showActionsColumn = windowWidth >= 800;

  // Ensure we're using the latest data for each video
  const videosToRender = paginatedVideos.map(video => ({
    ...video,
    // Ensure category is properly displayed
    category: video.category || "Uncategorized",
    // Ensure thumbnail is properly displayed
    thumbnail: video.thumbnail || "/placeholder.svg"
  }));

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            {showNumberColumn && <th className="px-4 py-3 text-left text-sm font-medium w-12">No</th>}
            <th className="px-4 py-3 text-left text-sm font-medium">Video</th>
            {showCategoryColumn && <th className="px-4 py-3 text-left text-sm font-medium">Category</th>}
            {showVisibilityColumn && <th className="px-4 py-3 text-left text-sm font-medium">Visibility</th>}
            {showDateColumn && (
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Date</span>
                </div>
              </th>
            )}
            {showViewsColumn && (
              <th className="px-4 py-3 text-left text-sm font-medium">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>Views</span>
                </div>
              </th>
            )}
            {showActionsColumn && <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {videosToRender.length > 0 ? (
            videosToRender.map((video, index) => (
              <tr key={video.id} className="hover:bg-muted/50 transition-colors">
                {showNumberColumn && (
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {(currentPage - 1) * videosPerPage + index + 1}
                  </td>
                )}
                <td
                  className={`px-4 py-3 ${windowWidth < 800 ? "cursor-pointer" : ""}`}
                  onClick={() => (windowWidth < 800 ? handleVideoClick(video) : null)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 sm:w-24 h-10 sm:h-14 flex-shrink-0 rounded overflow-hidden group">
                      <VideoThumbnail
                        thumbnailUrl={video.thumbnail}
                        videoTitle={video.title}
                        id={video.id}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate flex items-center gap-1">
                        {windowWidth < 400
                          ? video.title.length > 20
                            ? video.title.substring(0, 17) + "..."
                            : video.title
                          : video.title}
                        {video.youtubeVideoId && (
                          <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 ml-1" />
                        )}
                      </p>
                      {showDescription && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {windowWidth < 400
                            ? video.description.length > 30
                              ? video.description.substring(0, 27) + "..."
                              : video.description
                            : windowWidth < 640
                              ? video.description.length > 60
                                ? video.description.substring(0, 57) + "..."
                                : video.description
                              : video.description}
                        </p>
                      )}

                      {/* Mobile-only info - show when columns are hidden */}
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {!showVisibilityColumn && (
                          <Badge variant="outline" className="text-[10px] h-4">
                            {video.visibility === "public" ? "Public" : "Private"}
                          </Badge>
                        )}
                        {!showViewsColumn && (
                          <span className="text-[10px] text-muted-foreground">
                            {formatViews(video.views)} views
                          </span>
                        )}
                        {!showDateColumn && (
                          <span className="text-[10px] text-muted-foreground">
                            {formatDate(video.uploadDate, true)}
                          </span>
                        )}
                        {!showCategoryColumn && windowWidth >= 480 && (
                          <span className="text-[10px] text-muted-foreground">{video.category}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                {showCategoryColumn && <td className="px-4 py-3 text-sm">{video.category}</td>}
                {showVisibilityColumn && (
                  <td className="px-4 py-3">
                    <Switch
                      checked={video.visibility === "public"}
                      onCheckedChange={() => {toggleVideoVisibility(video.id) }}
                    />
                  </td>
                )}
                {showDateColumn && (
                  <td className="px-4 py-3 text-sm whitespace-nowrap">{formatDate(video.uploadDate)}</td>
                )}
                {showViewsColumn && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatViews(video.views)}</span>
                    </div>
                  </td>
                )}
                <td className={`px-4 py-3 text-right ${showActionsColumn ? "" : "hidden"}`}>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditVideo(video)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>

                    {/* Delete button - only shown on larger screens */}
                    {showDeleteButton && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}

                    {/* Dropdown menu for smaller screens */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className={showDeleteButton ? "hidden" : ""}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {!showVisibilityColumn && (
                          <DropdownMenuItem onClick={() => toggleVideoVisibility(video.id)}>
                            {video.visibility === "public" ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                <span>Make Private</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                <span>Make Public</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        )}
                        {!showDeleteButton && (
                          <DropdownMenuItem
                            onClick={() => handleDeleteVideo(video.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                {searchQuery ? (
                  <>
                    <p className="font-medium">No videos found</p>
                    <p className="text-sm mt-1">Try a different search term</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">No videos yet</p>
                    <p className="text-sm mt-1">Upload your first video to get started</p>
                  </>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 