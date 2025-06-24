import { NextResponse } from 'next/server';
import { getAllVideos, getVideos } from '@/libs/api';

// This export prevents the route from being statically optimized
// and allows it to use dynamic features like request.url
export const dynamic = 'force-dynamic';

// GET /api/videos
export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const url = new URL(request.url);
    
    // Get query parameters
    const categoryId = url.searchParams.get('category_id');
    const isDeletedParam = url.searchParams.get('isdeleted');
    const visibleParam = url.searchParams.get('visible');
    
    // Parse boolean parameters
    const isDeleted = isDeletedParam === 'true' ? true : 
                      isDeletedParam === 'false' ? false : undefined;
    
    const visible = visibleParam === 'true' ? true : 
                    visibleParam === 'false' ? false : undefined;
    
    // Build filter object based on available parameters
    const filters: any = {};
    
    if (categoryId) {
      filters.category_id = categoryId;
    }
    
    if (isDeleted !== undefined) {
      filters.isdeleted = isDeleted;
    }
    
    if (visible !== undefined) {
      filters.visible = visible;
    }
    
    // If no filters, get all videos
    const videos = Object.keys(filters).length > 0 
      ? await getVideos(filters)
      : await getAllVideos();
    
    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
} 