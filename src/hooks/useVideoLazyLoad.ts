import { useEffect, useRef } from "react";

interface UseVideoLazyLoadOptions {
  threshold?: number;
  onIntersect?: () => void;
}

export const useVideoLazyLoad = (
  videosrc: string,
  options: UseVideoLazyLoadOptions = {},
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { threshold = 0.1, onIntersect } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.src = videosrc;
              videoRef.current.play();
              onIntersect?.();
            }
          }
        });
      },
      { threshold },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [videosrc, threshold, onIntersect]);

  return videoRef;
};
