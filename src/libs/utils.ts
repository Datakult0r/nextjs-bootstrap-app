import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Cache for storing computed results to improve performance
const CACHE_SIZE_LIMIT = 100;
const youtubeIdCache: Map<string, string | null> = new Map();
const youtubeThumbnailCache: Map<string, string> = new Map();

/**
 * Utility for combining class names with Tailwind support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts bytes to human-readable file size
 */
export function getReadableFileSize(bytes: number) {
  if (isNaN(bytes) || bytes < 0) return '0 B';
  
  const i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Number((bytes / Math.pow(1024, i)).toFixed(2))} ${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 * Uses caching to avoid repeated regex operations
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Check cache first
  if (youtubeIdCache.has(url)) {
    return youtubeIdCache.get(url) || null;
  }
  
  try {
    // Match standard YouTube URLs like:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://youtube.com/shorts/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    const result = match && match[1] ? match[1] : null;
    
    // Manage cache size
    if (youtubeIdCache.size >= CACHE_SIZE_LIMIT) {
      const firstKey = youtubeIdCache.keys().next().value;
      if (firstKey) {
        youtubeIdCache.delete(firstKey);
      }
    }
    
    // Store in cache
    youtubeIdCache.set(url, result);
    
    return result;
  } catch (error) {
    console.error('Error extracting YouTube ID:', error);
    return null;
  }
}

/**
 * Get YouTube thumbnail URL from video URL
 * Uses caching to avoid repeated operations
 * @param url YouTube video URL
 * @param quality Thumbnail quality: default, hqdefault, mqdefault, sddefault, maxresdefault
 */
export function getYouTubeThumbnailUrl(url: string, quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string {
  if (!url) return '/placeholder.svg';
  
  // Create a cache key combining URL and quality
  const cacheKey = `${url}|${quality}`;
  
  // Check cache first
  if (youtubeThumbnailCache.has(cacheKey)) {
    return youtubeThumbnailCache.get(cacheKey) || '/placeholder.svg';
  }
  
  try {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return '/placeholder.svg';
    
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    
    // Manage cache size
    if (youtubeThumbnailCache.size >= CACHE_SIZE_LIMIT) {
      const firstKey = youtubeThumbnailCache.keys().next().value;
      if (firstKey) {
        youtubeThumbnailCache.delete(firstKey);
      }
    }
    
    // Store in cache
    youtubeThumbnailCache.set(cacheKey, thumbnailUrl);
    
    return thumbnailUrl;
  } catch (error) {
    console.error('Error generating YouTube thumbnail URL:', error);
    return '/placeholder.svg';
  }
}

/**
 * Clear all utility caches
 * Useful for testing or memory management
 */
export function clearUtilCaches(): void {
  youtubeIdCache.clear();
  youtubeThumbnailCache.clear();
}

/**
 * Creates a debounced version of a function
 * @param func The function to debounce
 * @param wait Wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}
