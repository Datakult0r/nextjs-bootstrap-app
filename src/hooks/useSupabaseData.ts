import { useState, useEffect, useCallback } from 'react';
import * as api from '../libs/api';

// Hook for working with categories
export function useCategories() {
  const [categories, setCategories] = useState<api.Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (category: api.Category) => {
    try {
      const newCategory = await api.createCategory(category);
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  };

  const updateCategory = async (id: string, category: Partial<api.Category>) => {
    try {
      const updatedCategory = await api.updateCategory(id, category);
      setCategories(prev => 
        prev.map(cat => cat.id === id ? updatedCategory : cat)
      );
      return updatedCategory;
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await api.deleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      return true;
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  };

  return {
    categories,
    loading,
    error,
    refresh: fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  };
}

// Hook for working with videos
export function useVideos(filters?: {
  category_id?: string;
  visible?: boolean;
  isdeleted?: boolean;
}) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getVideos(filters);
      setVideos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const addVideo = async (video: api.Video) => {
    try {
      const newVideo = await api.createVideo(video);
      setVideos(prev => [newVideo, ...prev]);
      return newVideo;
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  };

  const updateVideo = async (id: string, video: Partial<api.Video>) => {
    try {
      const updatedVideo = await api.updateVideo(id, video);
      setVideos(prev => 
        prev.map(vid => vid.id === id ? updatedVideo : vid)
      );
      return updatedVideo;
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  };

  const deleteVideo = async (id: string, hardDelete: boolean = false) => {
    try {
      await api.deleteVideo(id, hardDelete);
      if (hardDelete) {
        setVideos(prev => prev.filter(vid => vid.id !== id));
      } else {
        setVideos(prev => 
          prev.map(vid => vid.id === id ? { ...vid, isdeleted: true } : vid)
        );
      }
      return true;
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  };

  return {
    videos,
    loading,
    error,
    refresh: fetchVideos,
    addVideo,
    updateVideo,
    deleteVideo
  };
}

// Hook for working with a single video
export function useVideo(id?: string) {
  const [video, setVideo] = useState<any | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideo = useCallback(async (videoId: string) => {
    try {
      setLoading(true);
      const data = await api.getVideoById(videoId);
      setVideo(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setVideo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchVideo(id);
    } else {
      setVideo(null);
      setLoading(false);
      setError(null);
    }
  }, [id, fetchVideo]);

  const updateVideo = async (videoData: Partial<api.Video>) => {
    if (!id || !video) return null;
    
    try {
      const updatedVideo = await api.updateVideo(id, videoData);
      setVideo(updatedVideo);
      return updatedVideo;
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  };

  return {
    video,
    loading,
    error,
    refresh: id ? () => fetchVideo(id) : () => {},
    updateVideo
  };
}

// Hook for working with thumbnails
export function useThumbnailUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadThumbnail = async (file: File) => {
    try {
      setUploading(true);
      setError(null);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB');
      }
      
      const filename = `thumbnail-${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const url = await api.uploadThumbnail(file, filename);
      return url;
    } catch (err) {
      console.error("Error uploading thumbnail:", err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : typeof err === 'object' && err !== null && 'message' in err
          ? String((err as any).message)
          : 'Unknown upload error';
          
      setError(new Error(errorMessage));
      throw new Error(`Failed to upload thumbnail: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadThumbnail,
    uploading,
    error
  };
}

// Hook for working with all videos (including deleted ones)
export function useAllVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllVideos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getAllVideos();
      setVideos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllVideos();
  }, [fetchAllVideos]);

  return {
    videos,
    loading,
    error,
    refresh: fetchAllVideos
  };
}

// Hook for working with videos filtered by category
export function useCategoryVideos(categoryId?: string) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = useCallback(async () => {
    if (!categoryId) {
      setVideos([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Use the existing getVideos function with category_id filter
      // Include both visible and hidden videos, but exclude deleted ones
      const data = await api.getVideos({ 
        category_id: categoryId,
        visible: true,
        isdeleted: false // Don't show deleted videos
      });
      setVideos(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching category videos:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    refresh: fetchVideos
  };
}

// Hook for managing video visibility
export function useVideoVisibility() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const toggleVisibility = async (videoId: string, isPublic: boolean) => {
    setUpdating(true);
    setError(null);
    
    try {
      await api.updateVideoVisibility(videoId, isPublic);
    } catch (err) {
      console.error('Error updating video visibility:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    toggleVisibility,
    updating,
    error
  };
} 