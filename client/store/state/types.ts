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
  excerpt: string;
  content: string;
  category_id: string;
  author_id: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  featured_image_url: string;
  featured_image_alt: string;
  featured_image_caption: string;
  gallery: string;
  status: string;
  published_at: Date;
  scheduled_at: null;
  is_featured: string;
  is_trending: string;
  is_breaking_news: string;
  is_editors_pick: string;
  view_count: string;
  like_count: string;
  comment_count: string;
  share_count: string;
  estimated_read_time: string;
  word_count: string;
  tags: string;
  external_source: string;
  language: string;
  created_at: Date;
  updated_at: Date;
  content_blocks: string;
  is_active: string;
  author_name: string;

  // Additional computed properties for backwards compatibility
  authorId?: string;
  authorName?: string;
  category?: string;
  imageUrl?: string;
  publishedAt?: string;
  updatedAt?: string;
  viewCount?: number;
  featured?: boolean;
  trending?: boolean;
  likes?: number;
  readTime?: number;
  views?: number;
  author?: string;
}

export interface HomeModel {
  carousel: Article[];
  latest: Article[];
  trending: Article[];
  editors_picks: Article[];
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
  homepage: HomeModel;
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
