import { NextResponse } from 'next/server';
import { getCategories, getCategoryById } from '@/libs/api';

// This export prevents the route from being statically optimized
// and allows it to use dynamic features like request.url
export const dynamic = 'force-dynamic';

// GET /api/categories
export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const url = new URL(request.url);
    
    // Check if a specific category ID is requested
    const categoryId = url.searchParams.get('id');
    
    if (categoryId) {
      // Get a specific category by ID
      const category = await getCategoryById(categoryId);
      return NextResponse.json({ category });
    } else {
      // Get all categories
      const categories = await getCategories();
      return NextResponse.json({ categories });
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 