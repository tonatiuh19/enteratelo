# Database API Integration Guide

## Overview

This document outlines how to integrate the MySQL database with your Entérate.lo news website, including API endpoints, data models, and implementation strategies.

## Database Connection Setup

### Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=enteratelo_db
DB_USER=your_username
DB_PASSWORD=your_password
DB_SSL=false

# Redis for caching (optional but recommended)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT for authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Email service (for newsletters)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# File upload (for images)
UPLOAD_MAX_SIZE=10MB
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,webp
```

## Core API Endpoints

### 1. Articles API

```typescript
// GET /api/articles - Get articles with filtering and pagination
interface ArticlesQuery {
  page?: number;
  limit?: number;
  category?: string;
  author?: string;
  featured?: boolean;
  trending?: boolean;
  search?: string;
  sort?: "latest" | "popular" | "views" | "likes";
}

// GET /api/articles/:slug - Get single article
interface ArticleResponse {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: {
    id: number;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  author: {
    id: number;
    name: string;
    slug: string;
    avatar_url: string;
    bio: string;
  };
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  featured_image_url: string;
  published_at: string;
  is_featured: boolean;
  is_trending: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  estimated_read_time: number;
  tags: string[];
}

// POST /api/articles - Create new article (admin only)
// PUT /api/articles/:id - Update article (admin only)
// DELETE /api/articles/:id - Delete article (admin only)
```

### 2. Categories API

```typescript
// GET /api/categories - Get all categories
interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  article_count: number;
  is_active: boolean;
}

// GET /api/categories/:slug/articles - Get articles by category
```

### 3. Authors API

```typescript
// GET /api/authors - Get all authors
// GET /api/authors/:slug - Get author profile
interface AuthorResponse {
  id: number;
  name: string;
  slug: string;
  bio: string;
  avatar_url: string;
  position: string;
  specialization: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  article_count: number;
  total_views: number;
  total_likes: number;
}

// GET /api/authors/:slug/articles - Get articles by author
```

### 4. Comments API

```typescript
// GET /api/articles/:articleId/comments - Get comments for article
interface CommentResponse {
  id: number;
  content: string;
  author_name: string;
  user_id?: number;
  parent_id?: number;
  like_count: number;
  replies?: CommentResponse[];
  created_at: string;
}

// POST /api/articles/:articleId/comments - Add new comment
interface CreateCommentRequest {
  content: string;
  author_name: string;
  author_email: string;
  parent_id?: number;
}

// POST /api/comments/:id/like - Like a comment
// POST /api/comments/:id/report - Report a comment
```

### 5. User Engagement API

```typescript
// POST /api/articles/:id/like - Like an article
// DELETE /api/articles/:id/like - Unlike an article
// POST /api/articles/:id/bookmark - Bookmark an article
// DELETE /api/articles/:id/bookmark - Remove bookmark
// POST /api/articles/:id/share - Track social share
interface ShareRequest {
  platform:
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "whatsapp"
    | "email";
}

// POST /api/articles/:id/view - Track article view
interface ViewRequest {
  time_spent?: number;
  scroll_depth?: number;
  referrer?: string;
}
```

### 6. Newsletter API

```typescript
// POST /api/newsletter/subscribe - Subscribe to newsletter
interface SubscribeRequest {
  email: string;
  categories?: number[];
  frequency?: "daily" | "weekly" | "monthly";
}

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
// GET /api/newsletter/verify/:token - Verify email subscription
```

### 7. Live Content API

```typescript
// GET /api/live/sports - Get live sports scores
interface SportsMatchResponse {
  id: number;
  league: string;
  home_team: {
    name: string;
    logo: string;
    score?: number;
  };
  away_team: {
    name: string;
    logo: string;
    score?: number;
  };
  status: "scheduled" | "live" | "finished";
  match_time: string;
  venue: string;
}

// GET /api/live/updates - Get live updates/breaking news
// GET /api/polls/active - Get active polls
// POST /api/polls/:id/vote - Vote in poll
```

### 8. Search API

```typescript
// GET /api/search - Search articles
interface SearchQuery {
  q: string; // search term
  category?: string;
  author?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  limit?: number;
}

// GET /api/search/suggestions - Get search suggestions
// GET /api/search/trending - Get trending search terms
```

## Data Service Implementation

Update your `data.service.ts` to connect to the MySQL database:

```typescript
// client/services/api.service.ts
class ApiService {
  private baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:3001/api";

  async getArticles(params: ArticlesQuery = {}): Promise<ArticlesResponse> {
    const queryString = new URLSearchParams(params as any).toString();
    const response = await fetch(`${this.baseURL}/articles?${queryString}`);
    return response.json();
  }

  async getArticle(slug: string): Promise<ArticleResponse> {
    const response = await fetch(`${this.baseURL}/articles/${slug}`);
    return response.json();
  }

  async getCategories(): Promise<CategoryResponse[]> {
    const response = await fetch(`${this.baseURL}/categories`);
    return response.json();
  }

  async getFeaturedArticles(): Promise<ArticleResponse[]> {
    return this.getArticles({ featured: true, limit: 5 });
  }

  async getTrendingArticles(): Promise<ArticleResponse[]> {
    return this.getArticles({ trending: true, limit: 6 });
  }

  async getLatestArticles(limit = 8): Promise<ArticleResponse[]> {
    return this.getArticles({ sort: "latest", limit });
  }

  async getComments(articleId: number): Promise<CommentResponse[]> {
    const response = await fetch(
      `${this.baseURL}/articles/${articleId}/comments`,
    );
    return response.json();
  }

  async likeArticle(articleId: number): Promise<void> {
    await fetch(`${this.baseURL}/articles/${articleId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }

  async trackView(articleId: number, data: ViewRequest): Promise<void> {
    await fetch(`${this.baseURL}/articles/${articleId}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async subscribeNewsletter(data: SubscribeRequest): Promise<void> {
    await fetch(`${this.baseURL}/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async getLiveScores(): Promise<SportsMatchResponse[]> {
    const response = await fetch(`${this.baseURL}/live/sports`);
    return response.json();
  }

  async getActivePolls(): Promise<PollResponse[]> {
    const response = await fetch(`${this.baseURL}/polls/active`);
    return response.json();
  }

  async search(query: SearchQuery): Promise<SearchResponse> {
    const queryString = new URLSearchParams(query as any).toString();
    const response = await fetch(`${this.baseURL}/search?${queryString}`);
    return response.json();
  }
}

export const apiService = new ApiService();
```

## Backend Implementation (Node.js + Express)

### Database Connection (using mysql2)

```javascript
// server/config/database.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

module.exports = pool;
```

### Sample API Route (Articles)

```javascript
// server/routes/articles.js
const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET /api/articles
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      author,
      featured,
      trending,
      search,
      sort = "latest",
    } = req.query;

    let query = `
      SELECT 
        a.*,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon,
        au.name as author_name,
        au.slug as author_slug,
        au.avatar_url as author_avatar
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      JOIN authors au ON a.author_id = au.id
      WHERE a.status = 'published'
    `;

    const params = [];

    if (category) {
      query += " AND c.slug = ?";
      params.push(category);
    }

    if (author) {
      query += " AND au.slug = ?";
      params.push(author);
    }

    if (featured === "true") {
      query += " AND a.is_featured = 1";
    }

    if (trending === "true") {
      query += " AND a.is_trending = 1";
    }

    if (search) {
      query +=
        " AND MATCH(a.title, a.excerpt, a.content) AGAINST(? IN NATURAL LANGUAGE MODE)";
      params.push(search);
    }

    // Sorting
    switch (sort) {
      case "popular":
        query += " ORDER BY a.view_count DESC";
        break;
      case "views":
        query += " ORDER BY a.view_count DESC";
        break;
      case "likes":
        query += " ORDER BY a.like_count DESC";
        break;
      default:
        query += " ORDER BY a.published_at DESC";
    }

    // Pagination
    const offset = (page - 1) * limit;
    query += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), offset);

    const [articles] = await db.execute(query, params);

    // Get total count for pagination
    let countQuery =
      'SELECT COUNT(*) as total FROM articles a JOIN categories c ON a.category_id = c.id JOIN authors au ON a.author_id = au.id WHERE a.status = "published"';
    const countParams = params.slice(0, -2); // Remove limit and offset
    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      articles: articles.map(formatArticle),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/articles/:slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const query = `
      SELECT 
        a.*,
        c.name as category_name,
        c.slug as category_slug,
        c.color as category_color,
        c.icon as category_icon,
        au.name as author_name,
        au.slug as author_slug,
        au.avatar_url as author_avatar,
        au.bio as author_bio
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      JOIN authors au ON a.author_id = au.id
      WHERE a.slug = ? AND a.status = 'published'
    `;

    const [articles] = await db.execute(query, [slug]);

    if (articles.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    const article = formatArticle(articles[0]);
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to format article data
function formatArticle(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
      color: row.category_color,
      icon: row.category_icon,
    },
    author: {
      id: row.author_id,
      name: row.author_name,
      slug: row.author_slug,
      avatar_url: row.author_avatar,
      bio: row.author_bio,
    },
    meta_title: row.meta_title,
    meta_description: row.meta_description,
    meta_keywords: row.meta_keywords ? row.meta_keywords.split(",") : [],
    featured_image_url: row.featured_image_url,
    published_at: row.published_at,
    is_featured: Boolean(row.is_featured),
    is_trending: Boolean(row.is_trending),
    view_count: row.view_count,
    like_count: row.like_count,
    comment_count: row.comment_count,
    share_count: row.share_count,
    estimated_read_time: row.estimated_read_time,
    tags: row.tags ? JSON.parse(row.tags) : [],
  };
}

module.exports = router;
```

## Caching Strategy

Implement Redis caching for better performance:

```javascript
// server/middleware/cache.js
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const cache = (duration = 300) => {
  // 5 minutes default
  return async (req, res, next) => {
    const key = req.originalUrl;

    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
    } catch (error) {
      console.error("Cache error:", error);
    }

    // Store original json method
    const originalJson = res.json;

    // Override json method to cache response
    res.json = function (body) {
      client.setex(key, duration, JSON.stringify(body));
      originalJson.call(this, body);
    };

    next();
  };
};

module.exports = cache;
```

## Real-time Features (Socket.io)

For live updates and real-time features:

```javascript
// server/socket/liveUpdates.js
const socketIo = require("socket.io");

function setupSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join article room for live comments
    socket.on("join-article", (articleId) => {
      socket.join(`article-${articleId}`);
    });

    // Handle new comment
    socket.on("new-comment", (data) => {
      io.to(`article-${data.articleId}`).emit("comment-added", data);
    });

    // Handle live score updates
    socket.on("join-live-scores", () => {
      socket.join("live-scores");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = setupSocket;
```

## Deployment Considerations

### 1. Database Optimization

- Set up proper indexes (included in schema)
- Configure MySQL for production
- Set up automated backups
- Monitor query performance

### 2. Environment Setup

```bash
# Production environment variables
NODE_ENV=production
PORT=3001
DB_HOST=your-production-db-host
DB_NAME=enteratelo_production
# ... other vars
```

### 3. Security

- Input validation and sanitization
- Rate limiting
- CORS configuration
- SQL injection prevention (using parameterized queries)
- XSS protection

### 4. Monitoring

- Database performance monitoring
- Error tracking (Sentry)
- Analytics integration
- Uptime monitoring

This comprehensive database and API structure will provide a robust foundation for your news magazine platform with full content management, user engagement, analytics, and real-time features.
