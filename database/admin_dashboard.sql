-- ============================================================================
-- ADMIN DASHBOARD QUERIES FOR ENTÉRATE.LO
-- ============================================================================
-- Pre-built queries and procedures for the administration dashboard
-- ============================================================================

USE enteratelo_db;

-- ============================================================================
-- ANALYTICS DASHBOARD QUERIES
-- ============================================================================

-- Most popular articles (last 30 days)
CREATE VIEW dashboard_popular_articles AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.view_count,
    a.like_count,
    a.comment_count,
    a.share_count,
    c.name as category_name,
    au.name as author_name,
    a.published_at,
    (a.view_count * 0.4 + a.like_count * 0.3 + a.comment_count * 0.2 + a.share_count * 0.1) as engagement_score
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN authors au ON a.author_id = au.id
WHERE a.status = 'published'
AND a.published_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY engagement_score DESC
LIMIT 20;

-- Daily traffic statistics
CREATE VIEW dashboard_daily_stats AS
SELECT 
    DATE(viewed_at) as date,
    COUNT(*) as total_views,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(DISTINCT user_id) as registered_users,
    AVG(time_spent) as avg_time_spent,
    AVG(scroll_depth) as avg_scroll_depth
FROM article_views
WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(viewed_at)
ORDER BY date DESC;

-- Category performance
CREATE VIEW dashboard_category_stats AS
SELECT 
    c.id,
    c.name,
    c.slug,
    COUNT(a.id) as article_count,
    SUM(a.view_count) as total_views,
    SUM(a.like_count) as total_likes,
    SUM(a.comment_count) as total_comments,
    AVG(a.view_count) as avg_views_per_article
FROM categories c
LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
GROUP BY c.id, c.name, c.slug
ORDER BY total_views DESC;

-- Author performance
CREATE VIEW dashboard_author_stats AS
SELECT 
    au.id,
    au.name,
    au.slug,
    COUNT(a.id) as article_count,
    SUM(a.view_count) as total_views,
    SUM(a.like_count) as total_likes,
    SUM(a.comment_count) as total_comments,
    AVG(a.view_count) as avg_views_per_article,
    MAX(a.published_at) as last_published
FROM authors au
LEFT JOIN articles a ON au.id = a.author_id AND a.status = 'published'
GROUP BY au.id, au.name, au.slug
ORDER BY total_views DESC;

-- Traffic sources
CREATE VIEW dashboard_traffic_sources AS
SELECT 
    CASE 
        WHEN referrer LIKE '%google%' THEN 'Google'
        WHEN referrer LIKE '%facebook%' THEN 'Facebook'
        WHEN referrer LIKE '%twitter%' THEN 'Twitter'
        WHEN referrer LIKE '%instagram%' THEN 'Instagram'
        WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
        WHEN referrer = '' OR referrer IS NULL THEN 'Direct'
        ELSE 'Other'
    END as source,
    COUNT(*) as visits,
    COUNT(DISTINCT session_id) as unique_sessions,
    AVG(time_spent) as avg_time_spent
FROM article_views
WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY source
ORDER BY visits DESC;

-- Device breakdown
CREATE VIEW dashboard_device_stats AS
SELECT 
    device_type,
    COUNT(*) as visits,
    COUNT(DISTINCT session_id) as unique_sessions,
    AVG(time_spent) as avg_time_spent,
    AVG(scroll_depth) as avg_scroll_depth
FROM article_views
WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY device_type
ORDER BY visits DESC;

-- Geographic distribution
CREATE VIEW dashboard_geographic_stats AS
SELECT 
    country,
    COUNT(*) as visits,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(DISTINCT user_id) as registered_users
FROM article_views
WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
AND country IS NOT NULL
GROUP BY country
ORDER BY visits DESC
LIMIT 20;

-- ============================================================================
-- CONTENT MANAGEMENT QUERIES
-- ============================================================================

-- Articles pending review
CREATE VIEW dashboard_pending_articles AS
SELECT 
    a.id,
    a.title,
    a.status,
    a.created_at,
    a.updated_at,
    c.name as category_name,
    au.name as author_name
FROM articles a
JOIN categories c ON a.category_id = c.id
JOIN authors au ON a.author_id = au.id
WHERE a.status IN ('draft', 'review')
ORDER BY a.updated_at DESC;

-- Comments pending moderation
CREATE VIEW dashboard_pending_comments AS
SELECT 
    cm.id,
    cm.content,
    cm.author_name,
    cm.author_email,
    cm.created_at,
    a.title as article_title,
    a.slug as article_slug,
    cm.report_count
FROM comments cm
JOIN articles a ON cm.article_id = a.id
WHERE cm.status = 'pending'
ORDER BY cm.report_count DESC, cm.created_at ASC;

-- Most commented articles (last 7 days)
CREATE VIEW dashboard_hot_discussions AS
SELECT 
    a.id,
    a.title,
    a.slug,
    COUNT(cm.id) as recent_comments,
    a.comment_count as total_comments,
    c.name as category_name
FROM articles a
JOIN categories c ON a.category_id = c.id
LEFT JOIN comments cm ON a.id = cm.article_id 
    AND cm.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    AND cm.status = 'approved'
WHERE a.status = 'published'
GROUP BY a.id, a.title, a.slug, a.comment_count, c.name
HAVING recent_comments > 0
ORDER BY recent_comments DESC
LIMIT 15;

-- ============================================================================
-- USER ENGAGEMENT ANALYSIS
-- ============================================================================

-- Most active users
CREATE VIEW dashboard_active_users AS
SELECT 
    u.id,
    u.email,
    u.username,
    u.first_name,
    u.last_name,
    COUNT(DISTINCT cm.id) as comments_count,
    COUNT(DISTINCT ul.id) as likes_count,
    COUNT(DISTINCT ub.id) as bookmarks_count,
    u.last_active_at
FROM users u
LEFT JOIN comments cm ON u.id = cm.user_id AND cm.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
LEFT JOIN user_likes ul ON u.id = ul.user_id AND ul.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
LEFT JOIN user_bookmarks ub ON u.id = ub.user_id AND ub.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
WHERE u.is_active = TRUE
GROUP BY u.id, u.email, u.username, u.first_name, u.last_name, u.last_active_at
HAVING (comments_count + likes_count + bookmarks_count) > 0
ORDER BY (comments_count + likes_count + bookmarks_count) DESC
LIMIT 20;

-- Newsletter subscription growth
CREATE VIEW dashboard_newsletter_growth AS
SELECT 
    DATE(subscribed_at) as date,
    COUNT(*) as new_subscribers,
    SUM(COUNT(*)) OVER (ORDER BY DATE(subscribed_at)) as cumulative_subscribers
FROM newsletter_subscribers
WHERE status = 'active'
AND subscribed_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
GROUP BY DATE(subscribed_at)
ORDER BY date DESC;

-- ============================================================================
-- STORED PROCEDURES FOR DASHBOARD
-- ============================================================================

DELIMITER //

-- Get article performance details
CREATE PROCEDURE GetArticlePerformance(IN article_id_param INT, IN days_back INT)
BEGIN
    SELECT 
        DATE(av.viewed_at) as date,
        COUNT(*) as views,
        COUNT(DISTINCT av.session_id) as unique_sessions,
        AVG(av.time_spent) as avg_time_spent,
        AVG(av.scroll_depth) as avg_scroll_depth
    FROM article_views av
    WHERE av.article_id = article_id_param
    AND av.viewed_at >= DATE_SUB(NOW(), INTERVAL days_back DAY)
    GROUP BY DATE(av.viewed_at)
    ORDER BY date ASC;
END //

-- Get top performing content by timeframe
CREATE PROCEDURE GetTopContent(IN days_back INT, IN limit_param INT)
BEGIN
    SELECT 
        a.id,
        a.title,
        a.slug,
        COUNT(av.id) as views,
        COUNT(DISTINCT av.session_id) as unique_sessions,
        a.like_count,
        a.comment_count,
        a.share_count,
        c.name as category_name,
        au.name as author_name
    FROM articles a
    JOIN categories c ON a.category_id = c.id
    JOIN authors au ON a.author_id = au.id
    LEFT JOIN article_views av ON a.id = av.article_id 
        AND av.viewed_at >= DATE_SUB(NOW(), INTERVAL days_back DAY)
    WHERE a.status = 'published'
    GROUP BY a.id, a.title, a.slug, a.like_count, a.comment_count, a.share_count, c.name, au.name
    ORDER BY views DESC
    LIMIT limit_param;
END //

-- Get user engagement summary
CREATE PROCEDURE GetUserEngagementSummary(IN days_back INT)
BEGIN
    SELECT 
        COUNT(DISTINCT u.id) as total_active_users,
        COUNT(DISTINCT cm.user_id) as users_who_commented,
        COUNT(DISTINCT ul.user_id) as users_who_liked,
        COUNT(DISTINCT ub.user_id) as users_who_bookmarked,
        AVG(user_sessions.session_count) as avg_sessions_per_user
    FROM users u
    LEFT JOIN comments cm ON u.id = cm.user_id 
        AND cm.created_at >= DATE_SUB(NOW(), INTERVAL days_back DAY)
    LEFT JOIN user_likes ul ON u.id = ul.user_id 
        AND ul.created_at >= DATE_SUB(NOW(), INTERVAL days_back DAY)
    LEFT JOIN user_bookmarks ub ON u.id = ub.user_id 
        AND ub.created_at >= DATE_SUB(NOW(), INTERVAL days_back DAY)
    LEFT JOIN (
        SELECT 
            user_id, 
            COUNT(DISTINCT session_id) as session_count
        FROM article_views 
        WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL days_back DAY)
        AND user_id IS NOT NULL
        GROUP BY user_id
    ) user_sessions ON u.id = user_sessions.user_id
    WHERE u.is_active = TRUE;
END //

-- Get content calendar for upcoming scheduled posts
CREATE PROCEDURE GetContentCalendar(IN days_ahead INT)
BEGIN
    SELECT 
        a.id,
        a.title,
        a.scheduled_at,
        a.status,
        c.name as category_name,
        au.name as author_name,
        a.is_featured,
        a.is_breaking_news
    FROM articles a
    JOIN categories c ON a.category_id = c.id
    JOIN authors au ON a.author_id = au.id
    WHERE a.status = 'scheduled'
    AND a.scheduled_at BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL days_ahead DAY)
    ORDER BY a.scheduled_at ASC;
END //

DELIMITER ;

-- ============================================================================
-- REAL-TIME DASHBOARD FUNCTIONS
-- ============================================================================

-- Function to get current online users (last 5 minutes)
DELIMITER //
CREATE FUNCTION GetCurrentOnlineUsers() RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE user_count INT;
    
    SELECT COUNT(DISTINCT session_id)
    INTO user_count
    FROM article_views
    WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 5 MINUTE);
    
    RETURN user_count;
END //
DELIMITER ;

-- ============================================================================
-- ADMIN NOTIFICATION QUERIES
-- ============================================================================

-- Articles that need attention (low performance)
CREATE VIEW dashboard_articles_need_attention AS
SELECT 
    a.id,
    a.title,
    a.slug,
    a.published_at,
    a.view_count,
    a.like_count,
    a.comment_count,
    c.name as category_name,
    DATEDIFF(NOW(), a.published_at) as days_since_published,
    (a.view_count / GREATEST(DATEDIFF(NOW(), a.published_at), 1)) as daily_avg_views
FROM articles a
JOIN categories c ON a.category_id = c.id
WHERE a.status = 'published'
AND a.published_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
AND a.view_count < 100  -- Customize threshold
ORDER BY daily_avg_views ASC
LIMIT 10;

-- Comments with high report count
CREATE VIEW dashboard_flagged_comments AS
SELECT 
    cm.id,
    cm.content,
    cm.author_name,
    cm.report_count,
    cm.created_at,
    a.title as article_title,
    a.slug as article_slug
FROM comments cm
JOIN articles a ON cm.article_id = a.id
WHERE cm.report_count >= 3  -- Customize threshold
AND cm.status = 'approved'
ORDER BY cm.report_count DESC;

-- Newsletter unsubscribe rate monitoring
CREATE VIEW dashboard_newsletter_unsubscribes AS
SELECT 
    DATE(unsubscribed_at) as date,
    COUNT(*) as unsubscribes,
    (SELECT COUNT(*) FROM newsletter_subscribers WHERE DATE(subscribed_at) = DATE(ns.unsubscribed_at)) as same_day_subscriptions
FROM newsletter_subscribers ns
WHERE unsubscribed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(unsubscribed_at)
ORDER BY date DESC;

-- ============================================================================
-- PERFORMANCE MONITORING
-- ============================================================================

-- Slow loading articles (high bounce rate)
CREATE VIEW dashboard_high_bounce_articles AS
SELECT 
    a.id,
    a.title,
    a.slug,
    COUNT(av.id) as total_views,
    SUM(CASE WHEN av.time_spent < 30 THEN 1 ELSE 0 END) as quick_exits,
    (SUM(CASE WHEN av.time_spent < 30 THEN 1 ELSE 0 END) / COUNT(av.id) * 100) as bounce_rate,
    AVG(av.time_spent) as avg_time_spent
FROM articles a
JOIN article_views av ON a.id = av.article_id
WHERE av.viewed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY a.id, a.title, a.slug
HAVING total_views >= 50  -- Minimum views for statistical significance
ORDER BY bounce_rate DESC
LIMIT 20;

-- Search terms with no results
CREATE VIEW dashboard_empty_searches AS
SELECT 
    term,
    search_count,
    last_searched_at
FROM search_terms
WHERE result_count = 0
AND search_count >= 5  -- Multiple searches with no results
ORDER BY search_count DESC;

-- ============================================================================
-- DASHBOARD KPI CALCULATIONS
-- ============================================================================

-- Daily KPI summary
DELIMITER //
CREATE PROCEDURE GetDailyKPIs(IN target_date DATE)
BEGIN
    SELECT 
        target_date as date,
        
        -- Traffic KPIs
        (SELECT COUNT(*) FROM article_views WHERE DATE(viewed_at) = target_date) as total_pageviews,
        (SELECT COUNT(DISTINCT session_id) FROM article_views WHERE DATE(viewed_at) = target_date) as unique_sessions,
        (SELECT COUNT(DISTINCT user_id) FROM article_views WHERE DATE(viewed_at) = target_date AND user_id IS NOT NULL) as registered_users,
        
        -- Engagement KPIs
        (SELECT COUNT(*) FROM comments WHERE DATE(created_at) = target_date AND status = 'approved') as new_comments,
        (SELECT COUNT(*) FROM user_likes WHERE DATE(created_at) = target_date) as new_likes,
        (SELECT COUNT(*) FROM social_shares WHERE DATE(shared_at) = target_date) as social_shares,
        
        -- Content KPIs
        (SELECT COUNT(*) FROM articles WHERE DATE(published_at) = target_date) as articles_published,
        (SELECT COUNT(*) FROM newsletter_subscribers WHERE DATE(subscribed_at) = target_date) as newsletter_signups,
        
        -- Performance KPIs
        (SELECT AVG(time_spent) FROM article_views WHERE DATE(viewed_at) = target_date) as avg_session_duration,
        (SELECT AVG(scroll_depth) FROM article_views WHERE DATE(viewed_at) = target_date) as avg_scroll_depth;
END //
DELIMITER ;

-- ============================================================================
-- CLEANUP AND MAINTENANCE
-- ============================================================================

-- Archive old data procedure
DELIMITER //
CREATE PROCEDURE ArchiveOldData(IN days_to_keep INT)
BEGIN
    -- Archive old article views (keep detailed data for X days)
    CREATE TABLE IF NOT EXISTS article_views_archive LIKE article_views;
    
    INSERT INTO article_views_archive 
    SELECT * FROM article_views 
    WHERE viewed_at < DATE_SUB(NOW(), INTERVAL days_to_keep DAY);
    
    DELETE FROM article_views 
    WHERE viewed_at < DATE_SUB(NOW(), INTERVAL days_to_keep DAY);
    
    -- Archive old social shares
    CREATE TABLE IF NOT EXISTS social_shares_archive LIKE social_shares;
    
    INSERT INTO social_shares_archive 
    SELECT * FROM social_shares 
    WHERE shared_at < DATE_SUB(NOW(), INTERVAL days_to_keep DAY);
    
    DELETE FROM social_shares 
    WHERE shared_at < DATE_SUB(NOW(), INTERVAL days_to_keep DAY);
    
    SELECT CONCAT('Archived data older than ', days_to_keep, ' days') as result;
END //
DELIMITER ;

-- Update search term statistics
DELIMITER //
CREATE PROCEDURE UpdateSearchStats()
BEGIN
    -- This would be called periodically to update search statistics
    UPDATE search_terms st
    SET result_count = (
        SELECT COUNT(*)
        FROM articles a
        WHERE a.status = 'published'
        AND MATCH(a.title, a.excerpt, a.content) AGAINST(st.term IN NATURAL LANGUAGE MODE)
    );
END //
DELIMITER ;

-- ============================================================================
-- SCHEDULED EVENTS (MySQL Event Scheduler)
-- ============================================================================

-- Enable event scheduler
SET GLOBAL event_scheduler = ON;

-- Daily cleanup event
CREATE EVENT IF NOT EXISTS daily_cleanup
ON SCHEDULE EVERY 1 DAY
STARTS '2024-01-01 03:00:00'
DO
BEGIN
  -- Update article counters
  CALL UpdateArticleCounters(NULL);
  
  -- Update search statistics
  CALL UpdateSearchStats();
  
  -- Clean up old sessions (if tracking)
  DELETE FROM article_views 
  WHERE session_id NOT IN (
    SELECT DISTINCT session_id 
    FROM article_views 
    WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
  );
END;

-- Weekly archiving event
CREATE EVENT IF NOT EXISTS weekly_archive
ON SCHEDULE EVERY 1 WEEK
STARTS '2024-01-01 02:00:00'
DO
BEGIN
  -- Archive data older than 1 year
  CALL ArchiveOldData(365);
END;

-- ============================================================================
-- DASHBOARD USAGE EXAMPLES
-- ============================================================================

/*
-- Get today's KPIs
CALL GetDailyKPIs(CURDATE());

-- Get top articles last 7 days
CALL GetTopContent(7, 10);

-- Get article performance for specific article
CALL GetArticlePerformance(1, 30);

-- Get user engagement summary for last month
CALL GetUserEngagementSummary(30);

-- Get upcoming scheduled content
CALL GetContentCalendar(7);

-- View popular articles
SELECT * FROM dashboard_popular_articles;

-- View daily traffic stats
SELECT * FROM dashboard_daily_stats LIMIT 30;

-- View category performance
SELECT * FROM dashboard_category_stats;

-- View pending content
SELECT * FROM dashboard_pending_articles;
SELECT * FROM dashboard_pending_comments;

-- Current online users
SELECT GetCurrentOnlineUsers() as current_online_users;
*/

-- ============================================================================
-- FINAL NOTE
-- ============================================================================
/*
This admin dashboard system provides:

1. COMPREHENSIVE ANALYTICS:
   - Traffic and engagement metrics
   - Content performance analysis
   - User behavior insights
   - Geographic and device breakdowns

2. CONTENT MANAGEMENT:
   - Pending articles and comments
   - Content calendar
   - Performance monitoring
   - Quality assurance tools

3. USER ENGAGEMENT:
   - Active user tracking
   - Comment moderation
   - Newsletter analytics
   - Social media performance

4. OPERATIONAL INSIGHTS:
   - Real-time monitoring
   - Trend analysis
   - Alert systems
   - Maintenance procedures

5. AUTOMATED PROCESSES:
   - Data archiving
   - Statistics updates
   - Cleanup procedures
   - Performance optimization

Use these queries and procedures to build a comprehensive admin dashboard
that provides all necessary insights for managing a professional news website.
*/
