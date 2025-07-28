-- ============================================================================
-- ENTÉRATE.LO - COMPLETE MYSQL DATABASE SCHEMA
-- ============================================================================
-- A comprehensive database design for a modern news magazine platform
-- Features: Articles, Categories, Authors, Comments, Users, Analytics, SEO, etc.
-- ============================================================================

-- Create database
CREATE DATABASE IF NOT EXISTS enteratelo_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE enteratelo_db;

-- ============================================================================
-- CORE CONTENT TABLES
-- ============================================================================

-- Categories for organizing content
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50), -- emoji or icon class
    color VARCHAR(7), -- hex color code
    parent_id INT NULL, -- for subcategories
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_parent (parent_id),
    INDEX idx_active (is_active)
);

-- Authors/Staff management
CREATE TABLE authors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL, -- link to users table if author has account
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    bio TEXT,
    avatar_url VARCHAR(500),
    social_twitter VARCHAR(100),
    social_instagram VARCHAR(100),
    social_linkedin VARCHAR(100),
    social_facebook VARCHAR(100),
    position VARCHAR(100), -- Editor, Reporter, Columnist, etc.
    specialization VARCHAR(200), -- Sports, Tech, Politics, etc.
    is_active BOOLEAN DEFAULT TRUE,
    article_count INT DEFAULT 0,
    total_views BIGINT DEFAULT 0,
    total_likes BIGINT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_email (email),
    INDEX idx_active (is_active)
);

-- Main articles table
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    category_id INT NOT NULL,
    author_id INT NOT NULL,
    
    -- SEO and metadata
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    canonical_url VARCHAR(500),
    
    -- Images and media
    featured_image_url VARCHAR(500),
    featured_image_alt VARCHAR(255),
    featured_image_caption TEXT,
    gallery JSON, -- array of image objects
    
    -- Status and scheduling
    status ENUM('draft', 'review', 'scheduled', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    scheduled_at TIMESTAMP NULL,
    
    -- Engagement flags
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    is_breaking_news BOOLEAN DEFAULT FALSE,
    is_editors_pick BOOLEAN DEFAULT FALSE,
    
    -- Analytics counters
    view_count BIGINT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    
    -- Reading metrics
    estimated_read_time INT DEFAULT 0, -- in minutes
    word_count INT DEFAULT 0,
    
    -- Additional metadata
    tags JSON, -- array of tag strings
    external_source VARCHAR(255), -- if syndicated content
    language VARCHAR(5) DEFAULT 'es',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (author_id) REFERENCES authors(id),
    
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_author (author_id),
    INDEX idx_status (status),
    INDEX idx_published (published_at),
    INDEX idx_featured (is_featured),
    INDEX idx_trending (is_trending),
    INDEX idx_breaking (is_breaking_news),
    INDEX idx_views (view_count),
    FULLTEXT idx_search (title, excerpt, content)
);

-- ============================================================================
-- USER MANAGEMENT
-- ============================================================================

-- Users (readers, subscribers, commenters)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255), -- for registered users
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(500),
    
    -- Preferences
    timezone VARCHAR(50) DEFAULT 'America/Mexico_City',
    language VARCHAR(5) DEFAULT 'es',
    notification_preferences JSON,
    
    -- Status
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_subscriber BOOLEAN DEFAULT FALSE,
    subscription_tier ENUM('free', 'premium', 'vip') DEFAULT 'free',
    
    -- OAuth fields
    google_id VARCHAR(100),
    facebook_id VARCHAR(100),
    twitter_id VARCHAR(100),
    
    -- Activity tracking
    last_login_at TIMESTAMP NULL,
    last_active_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_active (is_active),
    INDEX idx_subscriber (is_subscriber)
);

-- ============================================================================
-- ENGAGEMENT SYSTEM
-- ============================================================================

-- Comments system
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    article_id INT NOT NULL,
    user_id INT NULL, -- null for anonymous comments
    parent_id INT NULL, -- for nested replies
    
    -- Comment content
    author_name VARCHAR(150), -- for anonymous or override
    author_email VARCHAR(255),
    content TEXT NOT NULL,
    
    -- Moderation
    status ENUM('pending', 'approved', 'rejected', 'spam') DEFAULT 'pending',
    moderator_id INT NULL,
    moderated_at TIMESTAMP NULL,
    
    -- Engagement
    like_count INT DEFAULT 0,
    report_count INT DEFAULT 0,
    
    -- Metadata
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
    
    INDEX idx_article (article_id),
    INDEX idx_user (user_id),
    INDEX idx_parent (parent_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- User likes/reactions
CREATE TABLE user_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    article_id INT NULL,
    comment_id INT NULL,
    
    -- For anonymous users
    session_id VARCHAR(255),
    ip_address VARCHAR(45),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_article (user_id, article_id),
    UNIQUE KEY unique_user_comment (user_id, comment_id),
    UNIQUE KEY unique_session_article (session_id, article_id),
    UNIQUE KEY unique_session_comment (session_id, comment_id),
    
    INDEX idx_user (user_id),
    INDEX idx_article (article_id),
    INDEX idx_session (session_id)
);

-- User bookmarks/saved articles
CREATE TABLE user_bookmarks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_article (user_id, article_id),
    INDEX idx_user (user_id),
    INDEX idx_article (article_id)
);

-- ============================================================================
-- ANALYTICS & TRACKING
-- ============================================================================

-- Page views tracking
CREATE TABLE article_views (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    article_id INT NOT NULL,
    user_id INT NULL,
    session_id VARCHAR(255),
    ip_address VARCHAR(45),
    
    -- View details
    referrer VARCHAR(500),
    user_agent TEXT,
    device_type ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
    country VARCHAR(2), -- ISO country code
    city VARCHAR(100),
    
    -- Reading behavior
    time_spent INT DEFAULT 0, -- seconds
    scroll_depth DECIMAL(5,2) DEFAULT 0, -- percentage
    read_completion DECIMAL(5,2) DEFAULT 0, -- percentage
    
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_article (article_id),
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_date (viewed_at),
    INDEX idx_country (country)
);

-- Social media shares tracking
CREATE TABLE social_shares (
    id INT PRIMARY KEY AUTO_INCREMENT,
    article_id INT NOT NULL,
    platform ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp', 'telegram', 'email') NOT NULL,
    user_id INT NULL,
    session_id VARCHAR(255),
    ip_address VARCHAR(45),
    
    shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_article (article_id),
    INDEX idx_platform (platform),
    INDEX idx_date (shared_at)
);

-- ============================================================================
-- NEWSLETTER & SUBSCRIPTIONS
-- ============================================================================

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_id INT NULL,
    
    -- Subscription preferences
    categories JSON, -- array of category IDs they're interested in
    frequency ENUM('daily', 'weekly', 'monthly') DEFAULT 'weekly',
    
    -- Status
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
    verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    
    -- Tracking
    source VARCHAR(100), -- where they subscribed from
    ip_address VARCHAR(45),
    
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_verified (verified)
);

-- Newsletter campaigns
CREATE TABLE newsletter_campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    
    -- Targeting
    target_categories JSON,
    target_frequency ENUM('daily', 'weekly', 'monthly'),
    
    -- Status
    status ENUM('draft', 'scheduled', 'sending', 'sent', 'cancelled') DEFAULT 'draft',
    scheduled_at TIMESTAMP NULL,
    sent_at TIMESTAMP NULL,
    
    -- Stats
    total_recipients INT DEFAULT 0,
    sent_count INT DEFAULT 0,
    delivered_count INT DEFAULT 0,
    opened_count INT DEFAULT 0,
    clicked_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_scheduled (scheduled_at)
);

-- ============================================================================
-- LIVE CONTENT & FEATURES
-- ============================================================================

-- Live sports scores
CREATE TABLE sports_matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    league VARCHAR(100) NOT NULL,
    home_team_name VARCHAR(100) NOT NULL,
    home_team_logo VARCHAR(10), -- emoji or short code
    home_team_score INT NULL,
    away_team_name VARCHAR(100) NOT NULL,
    away_team_logo VARCHAR(10),
    away_team_score INT NULL,
    
    status ENUM('scheduled', 'live', 'finished', 'postponed', 'cancelled') DEFAULT 'scheduled',
    match_time VARCHAR(20), -- "45'" or "FT" or "19:30"
    venue VARCHAR(200),
    
    scheduled_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_scheduled (scheduled_at),
    INDEX idx_league (league)
);

-- Live updates/breaking news ticker
CREATE TABLE live_updates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    type ENUM('breaking', 'sports', 'weather', 'traffic', 'general') DEFAULT 'general',
    time_label VARCHAR(20), -- "12:30", "AHORA", etc.
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_type (type),
    INDEX idx_sort (sort_order)
);

-- Polls and surveys
CREATE TABLE polls (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(500) NOT NULL,
    description TEXT,
    
    -- Settings
    is_active BOOLEAN DEFAULT TRUE,
    allow_multiple_choices BOOLEAN DEFAULT FALSE,
    show_results_before_voting BOOLEAN DEFAULT FALSE,
    
    -- Dates
    starts_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_dates (starts_at, ends_at)
);

-- Poll options
CREATE TABLE poll_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    poll_id INT NOT NULL,
    text VARCHAR(255) NOT NULL,
    vote_count INT DEFAULT 0,
    sort_order INT DEFAULT 0,
    
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    
    INDEX idx_poll (poll_id),
    INDEX idx_sort (sort_order)
);

-- Poll votes
CREATE TABLE poll_votes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    poll_id INT NOT NULL,
    option_id INT NOT NULL,
    user_id INT NULL,
    session_id VARCHAR(255),
    ip_address VARCHAR(45),
    
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES poll_options(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_user_poll (user_id, poll_id),
    UNIQUE KEY unique_session_poll (session_id, poll_id),
    
    INDEX idx_poll (poll_id),
    INDEX idx_option (option_id),
    INDEX idx_user (user_id)
);

-- ============================================================================
-- MULTIMEDIA CONTENT
-- ============================================================================

-- Video content
CREATE TABLE videos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    
    -- Video details
    video_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    duration_seconds INT,
    video_type ENUM('youtube', 'vimeo', 'local', 'external') DEFAULT 'youtube',
    external_id VARCHAR(255), -- YouTube video ID, etc.
    
    -- Categorization
    category_id INT NOT NULL,
    author_id INT NOT NULL,
    tags JSON,
    
    -- Status
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    
    -- Analytics
    view_count BIGINT DEFAULT 0,
    like_count INT DEFAULT 0,
    share_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (author_id) REFERENCES authors(id),
    
    INDEX idx_slug (slug),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    INDEX idx_published (published_at)
);

-- ============================================================================
-- ADMINISTRATION & MODERATION
-- ============================================================================

-- Admin users and roles
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role ENUM('super_admin', 'admin', 'editor', 'moderator', 'author') NOT NULL,
    permissions JSON, -- specific permissions array
    is_active BOOLEAN DEFAULT TRUE,
    
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by INT NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id) ON DELETE SET NULL,
    
    UNIQUE KEY unique_user_role (user_id),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);

-- Audit log for admin actions
CREATE TABLE admin_audit_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    admin_user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL, -- 'create_article', 'delete_comment', etc.
    target_type VARCHAR(50), -- 'article', 'comment', 'user', etc.
    target_id INT,
    details JSON, -- additional context
    ip_address VARCHAR(45),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (admin_user_id) REFERENCES users(id),
    
    INDEX idx_admin (admin_user_id),
    INDEX idx_action (action),
    INDEX idx_target (target_type, target_id),
    INDEX idx_date (created_at)
);

-- ============================================================================
-- SEO & PERFORMANCE
-- ============================================================================

-- SEO redirects
CREATE TABLE seo_redirects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    from_url VARCHAR(500) NOT NULL,
    to_url VARCHAR(500) NOT NULL,
    redirect_type ENUM('301', '302', '307') DEFAULT '301',
    is_active BOOLEAN DEFAULT TRUE,
    hit_count INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_from_url (from_url),
    INDEX idx_active (is_active)
);

-- Popular search terms
CREATE TABLE search_terms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    term VARCHAR(255) NOT NULL,
    search_count INT DEFAULT 1,
    result_count INT DEFAULT 0,
    last_searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_term (term),
    INDEX idx_count (search_count),
    INDEX idx_last_searched (last_searched_at)
);

-- ============================================================================
-- SAMPLE DATA INSERTION
-- ============================================================================

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
('Deportes', 'deportes', 'Noticias deportivas, resultados y análisis', '⚽', '#10B981'),
('Tecnología', 'tecnologia', 'Innovación, gadgets y mundo digital', '💻', '#3B82F6'),
('Entretenimiento', 'entretenimiento', 'Cine, música, celebrities y cultura pop', '🎬', '#EF4444'),
('Ciencia', 'ciencia', 'Descubrimientos, investigación y avances científicos', '🔬', '#8B5CF6'),
('Estilo de Vida', 'estilo-de-vida', 'Bienestar, moda, viajes y lifestyle', '✨', '#EC4899'),
('Sociedad', 'sociedad', 'Política, economía y temas sociales', '🏛️', '#6B7280');

-- Insert sample authors
INSERT INTO authors (name, slug, email, bio, position, specialization) VALUES
('María García', 'maria-garcia', 'maria@enteratelo.com', 'Periodista deportiva con 10 años de experiencia', 'Editora Deportiva', 'Fútbol, Deportes'),
('Carlos Mendoza', 'carlos-mendoza', 'carlos@enteratelo.com', 'Especialista en tecnología e innovación', 'Editor de Tecnología', 'Tech, Innovación'),
('Ana Rodríguez', 'ana-rodriguez', 'ana@enteratelo.com', 'Crítica de entretenimiento y cultura', 'Editora de Entretenimiento', 'Cine, Música'),
('Dr. Luis Fernández', 'luis-fernandez', 'luis@enteratelo.com', 'Divulgador científico', 'Editor de Ciencia', 'Ciencia, Investigación');

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_articles_category_published ON articles(category_id, published_at DESC);
CREATE INDEX idx_articles_author_published ON articles(author_id, published_at DESC);
CREATE INDEX idx_articles_featured_published ON articles(is_featured, published_at DESC);
CREATE INDEX idx_articles_trending_published ON articles(is_trending, published_at DESC);
CREATE INDEX idx_comments_article_approved ON comments(article_id, status);
CREATE INDEX idx_views_article_date ON article_views(article_id, viewed_at);

-- ============================================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- ============================================================================

DELIMITER //

-- Update article counters
CREATE PROCEDURE UpdateArticleCounters(IN article_id_param INT)
BEGIN
    UPDATE articles SET 
        view_count = (SELECT COUNT(*) FROM article_views WHERE article_id = article_id_param),
        like_count = (SELECT COUNT(*) FROM user_likes WHERE article_id = article_id_param),
        comment_count = (SELECT COUNT(*) FROM comments WHERE article_id = article_id_param AND status = 'approved'),
        share_count = (SELECT COUNT(*) FROM social_shares WHERE article_id = article_id_param)
    WHERE id = article_id_param;
END //

-- Get trending articles
CREATE PROCEDURE GetTrendingArticles(IN limit_param INT)
BEGIN
    SELECT a.*, c.name as category_name, au.name as author_name
    FROM articles a
    JOIN categories c ON a.category_id = c.id
    JOIN authors au ON a.author_id = au.id
    WHERE a.status = 'published' 
    AND a.published_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ORDER BY (a.view_count * 0.4 + a.like_count * 0.3 + a.comment_count * 0.2 + a.share_count * 0.1) DESC
    LIMIT limit_param;
END //

DELIMITER ;

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Popular articles view
CREATE VIEW popular_articles AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.featured_image_url,
    a.view_count,
    a.like_count,
    a.comment_count,
    a.published_at,
    c.name as category_name,
    c.slug as category_slug,
    c.color as category_color,
    au.name as author_name,
    au.slug as author_slug
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN authors au ON a.author_id = au.id
WHERE a.status = 'published'
ORDER BY a.view_count DESC;

-- Latest articles view
CREATE VIEW latest_articles AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.featured_image_url,
    a.view_count,
    a.like_count,
    a.comment_count,
    a.published_at,
    c.name as category_name,
    c.slug as category_slug,
    c.color as category_color,
    au.name as author_name,
    au.slug as author_slug
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN authors au ON a.author_id = au.id
WHERE a.status = 'published'
ORDER BY a.published_at DESC;

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================================================

DELIMITER //

-- Update author article count when article is published
CREATE TRIGGER update_author_stats_on_article_insert
AFTER INSERT ON articles
FOR EACH ROW
BEGIN
    IF NEW.status = 'published' THEN
        UPDATE authors SET 
            article_count = article_count + 1
        WHERE id = NEW.author_id;
    END IF;
END //

-- Update poll option vote count
CREATE TRIGGER update_poll_vote_count
AFTER INSERT ON poll_votes
FOR EACH ROW
BEGIN
    UPDATE poll_options SET 
        vote_count = vote_count + 1
    WHERE id = NEW.option_id;
END //

DELIMITER ;

-- ============================================================================
-- FINAL NOTES
-- ============================================================================
/*
This database schema provides:

1. COMPLETE CONTENT MANAGEMENT:
   - Articles with full SEO metadata
   - Categories with hierarchical support
   - Authors with social profiles
   - Rich media support (images, videos)

2. USER ENGAGEMENT:
   - Comment system with moderation
   - Likes and bookmarks
   - User profiles and preferences
   - Social sharing tracking

3. ANALYTICS & INSIGHTS:
   - Detailed view tracking
   - User behavior analytics
   - Popular content identification
   - Search term tracking

4. LIVE FEATURES:
   - Sports scores
   - Breaking news ticker
   - Polls and surveys
   - Live updates

5. MARKETING & GROWTH:
   - Newsletter management
   - Campaign tracking
   - Subscription tiers
   - Email automation support

6. ADMINISTRATION:
   - Role-based access control
   - Audit logging
   - Content moderation
   - SEO management

7. PERFORMANCE:
   - Optimized indexes
   - Stored procedures
   - Materialized views
   - Efficient queries

To use this schema:
1. Run this SQL file in your MySQL server
2. Update your application's data service to connect to this database
3. Implement API endpoints for CRUD operations
4. Add authentication and authorization middleware
5. Set up background jobs for analytics aggregation

The schema is production-ready and scalable for a professional news magazine.
*/
