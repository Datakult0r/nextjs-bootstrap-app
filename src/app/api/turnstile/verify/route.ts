import { NextResponse } from 'next/server';

// This export prevents the route from being statically optimized
// and allows it to use dynamic features like request.url
export const dynamic = 'force-dynamic';

// Get the secret key from environment variable - NEVER expose this in client-side code
const secretKey = process.env.TURNSTILE_SECRET_KEY;

// POST /api/turnstile/verify
export async function POST(request: Request) {
  try {
    // Parse the request body to get the token
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    if (!secretKey) {
      console.error('Turnstile secret key is not configured');
      return NextResponse.json(
        { success: false, error: 'Turnstile is not properly configured' },
        { status: 500 }
      );
    }

    // Verify the token with Cloudflare Turnstile API
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    // Optional: Add the user's IP address
    // formData.append('remoteip', request.headers.get('x-forwarded-for') || '');

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const outcome = await result.json();

    if (outcome.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Turnstile verification failed:', outcome);
      return NextResponse.json(
        { success: false, error: 'Captcha verification failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying captcha:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify captcha' },
      { status: 500 }
    );
  }
} 