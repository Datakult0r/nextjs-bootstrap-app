import { supabase } from './supabase';
import { User, AuthChangeEvent } from '@supabase/supabase-js';

// Types
export type AuthUser = User;

export type SignInCredentials = {
  email: string;
  password: string;
  captchaToken?: string | null;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  name?: string;
  captchaToken?: string | null;
};

export type AuthError = {
  message: string;
  status?: number;
};

// Current session/user helpers
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getCurrentSession();
  return !!session;
}

// Authentication methods
export async function signInWithEmail({ email, password, captchaToken }: SignInCredentials): Promise<{ user: AuthUser | null; error: AuthError | null; redirectUrl?: string }> {
  try {
    if (!email || !password) {
      return { 
        user: null, 
        error: { message: 'Email and password are required' } 
      };
    }

    // Validate captcha
    if (!captchaToken) {
      return {
        user: null,
        error: { message: 'Captcha verification is required' }
      };
    }

    // Proceed with sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } };
    }

    return { user: data.user, error: null };
  } catch (err) {
    return { 
      user: null, 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred during sign in' } 
    };
  }
}

export async function signUpWithEmail({ email, password, name, captchaToken }: SignUpCredentials): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  try {
    if (!email || !password) {
      return { 
        user: null, 
        error: { message: 'Email and password are required' } 
      };
    }
    
    // Validate captcha
    if (!captchaToken) {
      return {
        user: null,
        error: { message: 'Captcha verification is required' }
      };
    }
    
    // Enhanced password validation
    if (password.length < 8) {
      return { 
        user: null, 
        error: { message: 'Password must be at least 8 characters long' } 
      };
    }
    
    // Password complexity check
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
      return { 
        user: null, 
        error: { message: 'Password must contain uppercase, lowercase letters and numbers' } 
      };
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } };
    }

    // If email confirmation is required
    if (data.user && !data.user.confirmed_at) {
      return { 
        user: data.user, 
        error: { message: 'Please check your email to confirm your account' } 
      };
    }

    return { user: data.user, error: null };
  } catch (err) {
    return { 
      user: null, 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred during sign up' } 
    };
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    // Clear any local storage or session storage items
    if (typeof window !== 'undefined') {
      // Clear auth-related local storage
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('supabase.') || key.startsWith('auth.'))) {
          keysToRemove.push(key);
        }
      }
      
      // Remove keys in a separate loop to avoid skipping items
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred during sign out' } 
    };
  }
}

// Helper to get the base URL safely in both client and server contexts
export function getBaseUrl(): string {
  // Browser context
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Server-side rendering context
  // Check for environment variables in order of preference
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                process.env.VERCEL_URL || 
                process.env.NEXT_PUBLIC_VERCEL_URL;
  
  if (envUrl) {
    // Handle Vercel preview deployments which provide URL without protocol
    if (envUrl.startsWith('http')) {
      return envUrl;
    } else {
      return `https://${envUrl}`;
    }
  }
  
  // Fallback for local development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Final production fallback
  return 'https://www.clinicofai.com';
}

export async function resetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    
    const baseUrl = getBaseUrl();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/auth/reset-password`,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, error: null };
  } catch (err) {
    return { 
      success: false,
      error: err instanceof Error ? err.message : 'An unknown error occurred during password reset' 
    };
  }
}

export async function updatePassword(new_password: string): Promise<{ error: AuthError | null }> {
  try {
    if (!new_password) {
      return { error: { message: 'New password is required' } };
    }
    
    // Enhanced password validation
    if (new_password.length < 8) {
      return { error: { message: 'Password must be at least 8 characters long' } };
    }
    
    // Password complexity check
    const hasUpperCase = /[A-Z]/.test(new_password);
    const hasLowerCase = /[a-z]/.test(new_password);
    const hasNumbers = /[0-9]/.test(new_password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
      return { 
        error: { message: 'Password must contain uppercase, lowercase letters and numbers' } 
      };
    }
    
    const { error } = await supabase.auth.updateUser({
      password: new_password,
    });
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'An unknown error occurred while updating password' } 
    };
  }
}

// Social logins
export async function signInWithGoogle(): Promise<{ error: AuthError | null }> {
  try {
    const baseUrl = getBaseUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'Failed to initiate Google login' } 
    };
  }
}

export async function signInWithDiscord(): Promise<{ error: AuthError | null }> {
  try {
    const baseUrl = getBaseUrl();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });
    
    if (error) {
      return { error: { message: error.message, status: error.status } };
    }
    
    return { error: null };
  } catch (err) {
    return { 
      error: { message: err instanceof Error ? err.message : 'Failed to initiate Discord login' } 
    };
  }
}

// Auth state change listener
export function onAuthStateChange(callback: (event: AuthChangeEvent, session: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

// Session management
export async function refreshSession(): Promise<{ success: boolean; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    
    if (error) {
      return { 
        success: false, 
        error: { message: error.message, status: error.status } 
      };
    }
    
    return { success: true, error: null };
  } catch (err) {
    return { 
      success: false, 
      error: { message: err instanceof Error ? err.message : 'Failed to refresh session' } 
    };
  }
}

// Check if Supabase authentication service is available
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    // Try to get the current session as a lightweight check
    const { data, error } = await supabase.auth.getSession();
    
    // Try for offline detection
    if (!navigator.onLine) {
      return false;
    }
    
    return !error;
  } catch (err) {
    console.error('Supabase auth connection check failed:', err);
    return false;
  }
}