'use client';

import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { 
  AuthUser, 
  SignInCredentials, 
  SignUpCredentials, 
  AuthError,
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  resetPassword,
  signInWithGoogle,
  signInWithDiscord,
  onAuthStateChange,
  updatePassword as updateUserPassword,
  checkSupabaseConnection,
  refreshSession as refreshSupabaseSession
} from '@/libs/auth';
import { resetSupabaseClient } from '@/libs/supabase';

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: SignInCredentials) => Promise<{ success: boolean; error?: string; redirectUrl?: string }>;
  signup: (credentials: SignUpCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  googleLogin: () => Promise<{ success: boolean; error?: string }>;
  discordLogin: () => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<boolean>;
  clearSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // This will track our auth operations to prevent conflicts
  const pendingAuthOperationRef = useRef<Promise<any> | null>(null);
  
  // Track online status
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Clean up function to reset mounted flag
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Function to refresh user session
  const refreshSession = useCallback(async (): Promise<boolean> => {
    // Don't attempt to refresh if offline
    if (!isOnline) {
      return false;
    }
    
    try {
      if (!isMountedRef.current) return false;
      
      setIsLoading(true);
      
      // Use the refreshSession function from auth.ts
      const { success, error } = await refreshSupabaseSession();
      
      if (!success) {
        console.error('Session refresh failed:', error?.message);
        if (isMountedRef.current) {
          setIsLoading(false);
        }
        return false;
      }
      
      // Get the updated current user
      const currentUser = await getCurrentUser();
      
      if (isMountedRef.current) {
        setUser(currentUser);
        setIsLoading(false);
      }
      
      return !!currentUser;
    } catch (error) {
      console.error('Error refreshing session:', error);
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      return false;
    }
  }, [isOnline]);

  // Function to clear the session
  const clearSession = useCallback(async (): Promise<void> => {
    try {
      await signOut();
      resetSupabaseClient(); // Reset the client to clear any cached state
      
      // Clear any auth-related storage
      if (typeof window !== 'undefined') {
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
      
      if (isMountedRef.current) {
        setUser(null);
      }
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }, []);

  // Set up the auth state listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check connection first
        const isConnected = await checkSupabaseConnection();
        if (!isConnected) {
          if (isMountedRef.current) {
            setAuthError('Unable to connect to authentication service');
            setIsLoading(false);
          }
          return;
        }
        
        const currentUser = await getCurrentUser();
        if (isMountedRef.current) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (isMountedRef.current) {
          setAuthError('Authentication initialization failed');
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    // Set up session timeout
    let sessionTimeoutId: NodeJS.Timeout | null = null;
    
    const resetSessionTimeout = () => {
      if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
      }
      
      // Only set timeout if user is authenticated
      if (user) {
        sessionTimeoutId = setTimeout(() => {
          // Ask user to reconfirm identity after timeout
          refreshSession();
        }, SESSION_TIMEOUT);
      }
    };

    // Activity listeners to reset the session timeout
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    const handleActivity = () => {
      // Only reset timeout if online and authenticated
      if (isOnline && user) {
        resetSessionTimeout();
      }
    };
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Listen for auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (!isMountedRef.current) return;
      
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setUser(session?.user ?? null);
        resetSessionTimeout(); // Reset timeout on sign in
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        if (sessionTimeoutId) {
          clearTimeout(sessionTimeoutId); // Clear timeout on sign out
        }
      } else if (event === 'PASSWORD_RECOVERY') {
        // Handle password recovery event
        console.log('Password recovery event received');
      } else if (event === 'TOKEN_REFRESHED') {
        // When token is refreshed, update the user
        setUser(session?.user ?? null);
        resetSessionTimeout();
      }
    });

    initializeAuth();
    
    // Initial session timeout
    if (user) {
      resetSessionTimeout();
    }

    // Clean up resources
    return () => {
      if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
      }
      
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      
      subscription.unsubscribe();
    };
  }, [refreshSession, user, isOnline]);

  // Helper to safely execute auth operations without race conditions
  const executeAuthOperation = async <T,>(operation: () => Promise<T>): Promise<T> => {
    // Don't attempt operations if offline
    if (!isOnline) {
      throw new Error('You are currently offline. Please check your connection and try again.');
    }
    
    // Wait for any pending operation to complete
    if (pendingAuthOperationRef.current) {
      try {
        await pendingAuthOperationRef.current;
      } catch (error) {
        // Ignore error from previous operation
      }
    }
    
    // Create a new operation and store its promise
    const operationPromise = operation();
    pendingAuthOperationRef.current = operationPromise;
    
    try {
      return await operationPromise;
    } finally {
      // Clear the pending operation if it's the current one
      if (pendingAuthOperationRef.current === operationPromise) {
        pendingAuthOperationRef.current = null;
      }
    }
  };

  const login = async (credentials: SignInCredentials) => {
    return executeAuthOperation(async () => {
      try {
        if (!credentials.email || !credentials.password) {
          return { success: false, error: 'Email and password are required' };
        }
        
        const { user, error, redirectUrl: suggestedRedirect } = await signInWithEmail(credentials);
        
        if (error) {
          // Specific error handling for known error patterns
          if (error.message.includes('Invalid login credentials')) {
            return { success: false, error: 'The email or password you entered is incorrect' };
          }
          
          if (error.message.includes('Email not confirmed')) {
            return { 
              success: false, 
              error: 'Please check your email and confirm your account before logging in',
              needsVerification: true
            };
          }
          
          // Rate limiting detection
          if (error.status === 429 || error.message.includes('rate limit')) {
            return { 
              success: false, 
              error: 'Too many login attempts. Please try again later'
            };
          }
          
          return { success: false, error: error.message };
        }
        
        if (!user) {
          return { success: false, error: 'Failed to authenticate user' };
        }
        
        // Check for redirect URL in localStorage
        let redirectUrl = suggestedRedirect || '/';
        if (typeof window !== 'undefined') {
          const storedRedirect = localStorage.getItem('auth_redirect_url');
          if (storedRedirect) {
            redirectUrl = storedRedirect;
            localStorage.removeItem('auth_redirect_url');
          }
        }
        
        return { success: true, redirectUrl };
      } catch (error) {
        console.error('Login error:', error);
        
        // Network error detection
        if (!isOnline || (error instanceof Error && error.message.includes('network'))) {
          return { 
            success: false, 
            error: 'Cannot connect to authentication service. Please check your internet connection' 
          };
        }
        
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred during sign in' 
        };
      }
    });
  };

  const signup = async (credentials: SignUpCredentials) => {
    return executeAuthOperation(async () => {
      try {
        if (!credentials.email || !credentials.password) {
          return { success: false, error: 'Email and password are required' };
        }
        
        const { user, error } = await signUpWithEmail(credentials);
        
        if (error) {
          // Special case for email confirmation required
          if (error.message.includes('email') && error.message.includes('confirm')) {
            return { 
              success: true, 
              email: credentials.email,
              requiresEmailConfirmation: true 
            };
          }
          
          // Email already in use
          if (error.message.includes('already registered')) {
            return { 
              success: false, 
              error: 'This email is already registered. Please log in instead',
              alreadyRegistered: true 
            };
          }
          
          // Password strength errors
          if (error.message.includes('Password') && error.message.includes('character')) {
            return { success: false, error: error.message };
          }
          
          return { success: false, error: error.message };
        }
        
        if (!user) {
          return { success: false, error: 'Failed to create user account' };
        }
        
        // If email confirmation is required
        if (user && !user.confirmed_at) {
          return { 
            success: true, 
            email: credentials.email, 
            message: 'Please check your email to confirm your account',
            requiresEmailConfirmation: true
          };
        }
        
        return { success: true };
      } catch (error) {
        console.error('Signup error:', error);
        
        // Network error detection
        if (!isOnline || (error instanceof Error && error.message.includes('network'))) {
          return { 
            success: false, 
            error: 'Cannot connect to authentication service. Please check your internet connection' 
          };
        }
        
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'An unknown error occurred during sign up' 
        };
      }
    });
  };

  const logout = async () => {
    return executeAuthOperation(async () => {
      try {
        const { error } = await signOut();
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        await clearSession();
        
        return { success: true };
      } catch (error) {
        console.error('Logout error:', error);
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to sign out' 
        };
      }
    });
  };

  const googleLogin = async () => {
    return executeAuthOperation(async () => {
      try {
        // Store the current URL for return after login
        if (typeof window !== 'undefined') {
          // Store the intended redirect if it's a protected route
          const currentPath = window.location.pathname;
          if (currentPath !== '/login' && currentPath !== '/signup') {
            localStorage.setItem('auth_redirect_url', currentPath);
          }
        }
        
        const { error } = await signInWithGoogle();
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        return { success: true };
      } catch (error) {
        console.error('Google login error:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to sign in with Google'
        };
      }
    });
  };

  const discordLogin = async () => {
    return executeAuthOperation(async () => {
      try {
        // Store the current URL for return after login
        if (typeof window !== 'undefined') {
          // Store the intended redirect if it's a protected route
          const currentPath = window.location.pathname;
          if (currentPath !== '/login' && currentPath !== '/signup') {
            localStorage.setItem('auth_redirect_url', currentPath);
          }
        }
        
        const { error } = await signInWithDiscord();
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        return { success: true };
      } catch (error) {
        console.error('Discord login error:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to sign in with Discord'
        };
      }
    });
  };

  const forgotPassword = async (email: string) => {
    return executeAuthOperation(async () => {
      try {
        if (!email) {
          return { success: false, error: 'Email is required' };
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return { success: false, error: 'Please enter a valid email address' };
        }
        
        
        const result = await resetPassword(email);
        
        return { 
          success: result.success, 
          error: result.error || undefined 
        };
      } catch (error) {
        console.error('Password reset error:', error);
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to reset password' 
        };
      }
    });
  };

  const updatePassword = async (newPassword: string) => {
    return executeAuthOperation(async () => {
      try {
        if (!newPassword) {
          return { success: false, error: 'New password is required' };
        }
        
        // Password strength validation
        if (newPassword.length < 8) {
          return { success: false, error: 'Password must be at least 8 characters long' };
        }
        
        // Basic password complexity check
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumbers = /[0-9]/.test(newPassword);
        
        if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
          return { 
            success: false, 
            error: 'Password must contain uppercase, lowercase letters and numbers' 
          };
        }
        
        const { error } = await updateUserPassword(newPassword);
        
        if (error) {
          return { success: false, error: error.message };
        }
        
        return { success: true };
      } catch (error) {
        console.error('Update password error:', error);
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to update password' 
        };
      }
    });
  };

  // Show auth error if there is one
  useEffect(() => {
    if (authError) {
      console.error('Authentication error:', authError);
      // This could be replaced with a UI component to show the error
    }
  }, [authError]);

  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        googleLogin,
        discordLogin,
        forgotPassword,
        updatePassword,
        refreshSession,
        clearSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 