import React, { RefObject } from "react";

interface VideoPreviewProps {
  videoRef: RefObject<HTMLVideoElement>;
  videoPreview: string | null;
  videoType: "youtube" | "direct";
  youtubeVideoId?: string;
}

export function VideoPreview({ videoRef, videoPreview, videoType, youtubeVideoId }: VideoPreviewProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Video Preview</h2>
      <div className="bg-black rounded-lg overflow-hidden">
        {videoType === "youtube" && youtubeVideoId ? (
          <iframe
            width="100%"
            height="315"
            className="aspect-video"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            ref={videoRef}
            src={videoPreview || undefined}
            className="w-full aspect-video"
            controls
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
              }
            }}
          />
        )}
      </div>
    </div>
  );
} 