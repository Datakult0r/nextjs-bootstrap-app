import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getVideos,
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  uploadThumbnail,
  deleteThumbnail,
  Category,
  Video
} from './api';

// Example usage functions

// Categories examples
export async function categoriesExample() {
  try {
    // Get all categories
    const allCategories = await getCategories();
    console.log('All categories:', allCategories);

    // Create a new category
    const newCategory: Category = {
      name: 'New Category',
      description: 'This is a new category'
    };
    const createdCategory = await createCategory(newCategory);
    console.log('Created category:', createdCategory);

    // Get a specific category
    const category = await getCategoryById(createdCategory.id);
    console.log('Category by ID:', category);

    // Update the category
    const updatedCategory = await updateCategory(createdCategory.id, {
      description: 'Updated description'
    });
    console.log('Updated category:', updatedCategory);

    // Delete the category
    await deleteCategory(createdCategory.id);
    console.log('Category deleted successfully');
  } catch (error) {
    console.error('Error in categories example:', error);
  }
}

// Videos examples
export async function videosExample() {
  try {
    // Get all categories first (to use for category_id)
    const categories = await getCategories();
    const categoryId = categories[0].id;

    // Get ALL videos (including deleted ones)
    const allVideosIncludingDeleted = await getAllVideos();
    console.log('All videos (including deleted):', allVideosIncludingDeleted);

    // Get all videos (default filters: isdeleted = false)
    const allVideos = await getVideos();
    console.log('All videos:', allVideos);

    // Get videos by category
    const categoryVideos = await getVideos({ category_id: categoryId });
    console.log('Videos in category:', categoryVideos);

    // Create a new video
    const newVideo: Video = {
      title: 'New Video',
      description: 'This is a new video',
      youtube_url: 'https://www.youtube.com/watch?v=example',
      category_id: categoryId,
      visible: true
    };
    const createdVideo = await createVideo(newVideo);
    console.log('Created video:', createdVideo);

    // Get a specific video
    const video = await getVideoById(createdVideo.id);
    console.log('Video by ID:', video);

    // Update the video
    const updatedVideo = await updateVideo(createdVideo.id, {
      title: 'Updated Video Title',
      description: 'Updated description'
    });
    console.log('Updated video:', updatedVideo);

    // Soft delete the video (default)
    await deleteVideo(createdVideo.id);
    console.log('Video soft deleted successfully');

    // Hard delete a video
    await deleteVideo(createdVideo.id, true);
    console.log('Video hard deleted successfully');
  } catch (error) {
    console.error('Error in videos example:', error);
  }
}

// Thumbnail upload example
export async function thumbnailExample(imageFile: File) {
  try {
    // Upload thumbnail
    const filename = `thumbnail-${Date.now()}.jpg`;
    const thumbnailUrl = await uploadThumbnail(imageFile, filename);
    console.log('Uploaded thumbnail URL:', thumbnailUrl);

    // Delete thumbnail
    await deleteThumbnail(filename);
    console.log('Thumbnail deleted successfully');
    
    return thumbnailUrl;
  } catch (error) {
    console.error('Error in thumbnail example:', error);
    throw error;
  }
} 