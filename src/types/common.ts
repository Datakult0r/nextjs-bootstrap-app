// Common types and interfaces used across the application

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Navigation types
export interface NavLink {
  name: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  isExternal?: boolean;
}

export interface MegaMenuSection {
  title: string;
  items: NavLink[];
}

export interface NavigationProps extends BaseComponentProps {
  navLinks: NavLink[];
  isMobile?: boolean;
}

// Authentication types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: 'user' | 'admin' | 'moderator';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: SignInCredentials) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  register: (credentials: SignUpCredentials) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

export interface SignInCredentials {
  email: string;
  password: string;
  captchaToken?: string | null;
}

export interface SignUpCredentials extends SignInCredentials {
  name?: string;
  confirmPassword?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data?: T;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  success: (title: string, message: string) => void;
  error: (title: string, message: string) => void;
  warning: (title: string, message: string) => void;
  info: (title: string, message: string) => void;
}

// Video platform types
export interface VideoCategory {
  id: string;
  name: string;
  description?: string;
  slug: string;
  thumbnail?: string;
  videoCount?: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl?: string;
  duration?: string;
  views: number;
  likes?: number;
  dislikes?: number;
  uploadDate: string;
  category: VideoCategory;
  tags?: string[];
  visibility: 'public' | 'private' | 'unlisted';
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VideoComment {
  id: string;
  videoId: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  replies?: VideoComment[];
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  sortBy?: 'newest' | 'oldest' | 'popular' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Component variant types
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export type CardVariant = 'default' | 'elevated' | 'outlined';

// Utility types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Event handler types
export type EventHandler<T = void> = () => T;
export type EventHandlerWithParam<P, T = void> = (param: P) => T;

// Generic component props
export interface ComponentWithVariants<T extends string> {
  variant?: T;
  size?: 'sm' | 'md' | 'lg';
}

// Error types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// Configuration types
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    videoUpload: boolean;
    comments: boolean;
    notifications: boolean;
    analytics: boolean;
  };
} 