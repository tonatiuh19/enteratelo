// Auth State
export const DOMAIN = "https://garbrix.com/enteratelo/api";

export interface User {
  id: string;
  user_id?: number;
  name: string;
  slug?: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  social_twitter?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_facebook?: string;
  position?: string;
  specialization?: string;
  article_count?: number;
  total_views?: number;
  total_likes?: number;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  role: "author" | "admin" | "reader";
  status: "active" | "pending_review" | "suspended";
  loginTime?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  codeSent: boolean;
  pendingEmail: string | null;
}

// Articles State
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  category: string;
  tags: string[];
  imageUrl: string;
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  viewCount: number;
  featured: boolean;
}

export interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  categories: string[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// UI State
export interface UIState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  notifications: Notification[];
  isLoading: boolean;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Root State
export interface AppState {
  auth: AuthState;
  articles: ArticlesState;
  ui: UIState;
}
