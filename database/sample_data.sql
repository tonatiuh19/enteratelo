-- ============================================================================
-- SAMPLE DATA FOR ENTÉRATE.LO DATABASE
-- ============================================================================
-- This file contains realistic sample data for testing and development
-- Run this after creating the main schema
-- ============================================================================

USE enteratelo_db;

-- ============================================================================
-- SAMPLE USERS
-- ============================================================================

INSERT INTO users (email, username, first_name, last_name, is_subscriber, subscription_tier) VALUES
('juan.perez@email.com', 'juanp', 'Juan', 'Pérez', TRUE, 'premium'),
('maria.lopez@email.com', 'marial', 'María', 'López', TRUE, 'free'),
('carlos.ruiz@email.com', 'carlosr', 'Carlos', 'Ruiz', FALSE, 'free'),
('ana.martinez@email.com', 'anam', 'Ana', 'Martínez', TRUE, 'vip'),
('pedro.gonzalez@email.com', 'pedrog', 'Pedro', 'González', TRUE, 'free');

-- ============================================================================
-- SAMPLE ARTICLES
-- ============================================================================

INSERT INTO articles (
    title, slug, excerpt, content, category_id, author_id,
    meta_title, meta_description, featured_image_url,
    status, published_at, is_featured, is_trending,
    view_count, like_count, estimated_read_time, word_count, tags
) VALUES
(
    'El Real Madrid ficha a la nueva estrella del fútbol mundial',
    'real-madrid-ficha-nueva-estrella-futbol',
    'El club merengue anuncia la incorporación de uno de los jugadores más prometedores de la temporada.',
    '<h2>Una incorporación histórica</h2><p>El Real Madrid ha confirmado oficialmente la contratación de la nueva sensación del fútbol mundial. El jugador, de tan solo 22 años, llega procedente de una de las mejores ligas europeas tras una temporada espectacular.</p><h3>Los números hablan por sí solos</h3><p>Con 25 goles en 30 partidos la temporada pasada, el nuevo fichaje promete revolucionar el ataque madridista. Su versatilidad para jugar en varias posiciones lo convierte en una pieza clave para el esquema de Ancelotti.</p><blockquote>Este fichaje marca un antes y un después en nuestra historia reciente</blockquote><p>La operación, valorada en 120 millones de euros, convierte al jugador en el fichaje más caro de la historia del club. Los aficionados ya muestran su entusiasmo en las redes sociales.</p>',
    1, 1,
    'Real Madrid ficha nueva estrella | Entérate.lo',
    'El Real Madrid anuncia la incorporación de la nueva sensación del fútbol mundial por 120 millones de euros.',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    'published', '2024-07-20 10:00:00', TRUE, TRUE,
    15420, 342, 4, 850, 
    '["Real Madrid", "fichajes", "fútbol", "Champions League", "LaLiga"]'
),
(
    'Inteligencia Artificial: La revolución que está transformando el periodismo',
    'inteligencia-artificial-revolucion-periodismo',
    'Descubre cómo la IA está cambiando la forma en que se crean, editan y distribuyen las noticias en todo el mundo.',
    '<h2>El futuro del periodismo ya está aquí</h2><p>La inteligencia artificial está revolucionando la industria del periodismo de maneras que parecían impensables hace apenas una década. Desde la automatización de noticias deportivas hasta la personalización del contenido, la IA se ha convertido en una herramienta indispensable.</p><h3>Aplicaciones actuales</h3><p>Las redacciones de todo el mundo ya utilizan algoritmos para generar informes financieros, resúmenes deportivos y alertas meteorológicas. Estos sistemas pueden procesar miles de datos en segundos y crear artículos coherentes y precisos.</p><p>Sin embargo, la IA no solo automatiza tareas repetitivas. También ayuda a los periodistas a investigar, verificar fuentes y detectar noticias falsas con mayor eficacia que nunca.</p><blockquote>La IA no reemplaza al periodista, lo potencia</blockquote><p>Los expertos coinciden en que el futuro del periodismo será una colaboración entre humanos y máquinas, donde cada uno aporte sus fortalezas únicas.</p>',
    2, 2,
    'IA en el Periodismo: Revolución Digital | Entérate.lo',
    'Cómo la inteligencia artificial está transformando la creación, edición y distribución de noticias.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    'published', '2024-07-19 14:30:00', TRUE, FALSE,
    8930, 189, 6, 1200,
    '["IA", "periodismo", "tecnología", "automatización", "futuro"]'
),
(
    'Netflix estrena la serie más esperada del año',
    'netflix-estrena-serie-mas-esperada-ano',
    'La plataforma de streaming presenta su nueva producción original que promete ser el fenómeno televisivo de 2024.',
    '<h2>Un estreno sin precedentes</h2><p>Netflix acaba de lanzar su producción más ambiciosa del año: una serie de ciencia ficción que combina drama, acción y efectos visuales de última generación. Con un presupuesto de 200 millones de dólares, la serie promete competir con las grandes producciones cinematográficas.</p><h3>Reparto estelar</h3><p>La serie cuenta con un reparto de lujo encabezado por actores ganadores del Oscar. La química entre los protagonistas y la complejidad de los personajes han sido elogiadas por la crítica especializada.</p><p>Los primeros episodios ya están disponibles en la plataforma, y las redes sociales no han tardado en llenarse de teorías y especulaciones sobre el desarrollo de la trama.</p><blockquote>Una obra maestra de la televisión moderna</blockquote><p>Los críticos han destacado la calidad de la producción, comparándola con grandes éxitos como "Stranger Things" y "The Crown".</p>',
    4, 3,
    'Netflix Serie Más Esperada 2024 | Entérate.lo',
    'Netflix presenta su nueva serie de ciencia ficción con presupuesto de 200 millones de dólares.',
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
    'published', '2024-07-18 16:45:00', FALSE, TRUE,
    12650, 256, 5, 980,
    '["Netflix", "series", "streaming", "ciencia ficción", "entretenimiento"]'
),
(
    'Descubren nueva especie marina en las profundidades del Pacífico',
    'descubren-nueva-especie-marina-pacifico',
    'Científicos internacionales anuncian el hallazgo de una fascinante criatura que podría revolucionar nuestro entendimiento de la vida oceánica.',
    '<h2>Un hallazgo extraordinario</h2><p>Un equipo internacional de biólogos marinos ha descubierto una nueva especie en las profundidades del Océano Pacífico. La criatura, que habita a más de 3.000 metros de profundidad, presenta características únicas que desafían las teorías actuales sobre la evolución marina.</p><h3>Características únicas</h3><p>El nuevo organismo posee capacidades bioluminiscentes extraordinarias y un sistema de comunicación que utiliza frecuencias sonoras nunca antes documentadas. Los investigadores creen que esta especie podría haber evolucionado de forma completamente aislada durante millones de años.</p><p>El descubrimiento fue posible gracias a las nuevas tecnologías de exploración submarina que permiten alcanzar profundidades antes inaccesibles para la investigación científica.</p><blockquote>Este hallazgo reescribe los libros de biología marina</blockquote><p>Los científicos continúan estudiando la especie para comprender mejor su papel en el ecosistema oceánico profundo.</p>',
    4, 4,
    'Nueva Especie Marina Descubierta | Entérate.lo',
    'Científicos descubren fascinante criatura marina a 3.000 metros de profundidad en el Pacífico.',
    'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
    'published', '2024-07-17 11:20:00', FALSE, FALSE,
    6780, 123, 7, 1350,
    '["ciencia", "océano", "descubrimiento", "biología marina", "investigación"]'
),
(
    'Tendencias de moda sostenible que marcarán el otoño 2024',
    'tendencias-moda-sostenible-otono-2024',
    'La industria de la moda abraza la sostenibilidad con nuevas tendencias que combinan estilo y responsabilidad ambiental.',
    '<h2>Moda con conciencia</h2><p>La sostenibilidad se ha convertido en el tema central de la moda para la temporada otoño 2024. Las principales marcas internacionales han presentado colecciones que priorizan materiales reciclados, procesos de producción éticos y diseños atemporales.</p><h3>Materiales innovadores</h3><p>Los diseñadores están experimentando con tejidos creados a partir de algas marinas, fibras de piña y algodón orgánico. Estos materiales no solo son respetuosos con el medio ambiente, sino que también ofrecen propiedades únicas como mayor durabilidad y confort.</p><p>Las paletas de colores se inspiran en tonos terrosos y naturales, reflejando la conexión con la naturaleza que caracteriza esta nueva era de la moda.</p><blockquote>La moda sostenible no es una tendencia, es el futuro</blockquote><p>Los consumidores cada vez más conscientes están impulsando este cambio hacia una industria más responsable.</p>',
    5, 1,
    'Moda Sostenible Otoño 2024 | Entérate.lo',
    'Descubre las tendencias de moda sostenible que dominarán el otoño con materiales innovadores y diseños éticos.',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    'published', '2024-07-16 09:15:00', FALSE, FALSE,
    4560, 89, 4, 820,
    '["moda", "sostenibilidad", "otoño 2024", "tendencias", "eco-friendly"]'
);

-- ============================================================================
-- SAMPLE COMMENTS
-- ============================================================================

INSERT INTO comments (article_id, user_id, author_name, author_email, content, status) VALUES
(1, 1, 'Juan Pérez', 'juan.perez@email.com', '¡Increíble fichaje! El Real Madrid sigue apostando por los mejores talentos del mundo. Seguro que será una temporada espectacular.', 'approved'),
(1, 2, 'María López', 'maria.lopez@email.com', 'Me parece una inversión muy alta, pero si rinde como en su anterior equipo, será una gran incorporación.', 'approved'),
(1, NULL, 'Fanático Madridista', 'fan@email.com', '¡HALA MADRID! Ya tengo ganas de ver el primer partido con el nuevo fichaje.', 'approved'),
(2, 3, 'Carlos Ruiz', 'carlos.ruiz@email.com', 'Muy interesante el artículo sobre IA. Como programador, veo mucho potencial en estas tecnologías para el periodismo.', 'approved'),
(2, 4, 'Ana Martínez', 'ana.martinez@email.com', 'Me preocupa un poco que la IA pueda reemplazar a los periodistas humanos. ¿Qué opinan?', 'approved'),
(3, 5, 'Pedro González', 'pedro.gonzalez@email.com', 'Ya la vi completa y puedo confirmar que está espectacular. Netflix se ha superado esta vez.', 'approved'),
(3, 1, 'Juan Pérez', 'juan.perez@email.com', 'Sin spoilers por favor! La voy a empezar este fin de semana.', 'approved');

-- ============================================================================
-- SAMPLE LIKES
-- ============================================================================

INSERT INTO user_likes (user_id, article_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 4), (2, 5),
(3, 2), (3, 3), (3, 4),
(4, 1), (4, 3), (4, 5),
(5, 2), (5, 3), (5, 4);

-- ============================================================================
-- SAMPLE NEWSLETTER SUBSCRIBERS
-- ============================================================================

INSERT INTO newsletter_subscribers (email, user_id, categories, frequency, status, verified) VALUES
('juan.perez@email.com', 1, '[1, 2]', 'weekly', 'active', TRUE),
('maria.lopez@email.com', 2, '[1, 4, 5]', 'daily', 'active', TRUE),
('carlos.ruiz@email.com', 3, '[2]', 'weekly', 'active', TRUE),
('ana.martinez@email.com', 4, '[3, 4, 5]', 'monthly', 'active', TRUE),
('newsletter@example.com', NULL, '[1, 2, 3, 4, 5, 6]', 'weekly', 'active', TRUE);

-- ============================================================================
-- SAMPLE SPORTS MATCHES
-- ============================================================================

INSERT INTO sports_matches (
    league, home_team_name, home_team_logo, home_team_score,
    away_team_name, away_team_logo, away_team_score,
    status, match_time, venue, scheduled_at
) VALUES
('Primera División', 'Real Madrid', '👑', 2, 'FC Barcelona', '🔵', 1, 'finished', 'FT', 'Santiago Bernabéu', '2024-07-20 16:00:00'),
('Liga MX', 'Club América', '🦅', NULL, 'Chivas', '🐐', NULL, 'live', '67\'', 'Estadio Azteca', '2024-07-20 19:00:00'),
('Premier League', 'Manchester City', '🔵', NULL, 'Liverpool', '🔴', NULL, 'scheduled', '15:30', 'Etihad Stadium', '2024-07-21 15:30:00'),
('Champions League', 'PSG', '🔴', 1, 'Bayern Munich', '🔴', 3, 'finished', 'FT', 'Parc des Princes', '2024-07-19 20:00:00');

-- ============================================================================
-- SAMPLE LIVE UPDATES
-- ============================================================================

INSERT INTO live_updates (title, type, time_label, is_active, sort_order) VALUES
('ÚLTIMA HORA: Terremoto de magnitud 6.2 en la costa del Pacífico', 'breaking', 'AHORA', TRUE, 1),
('Gol de último minuto en el clásico Real Madrid vs Barcelona', 'sports', '90+3\'', TRUE, 2),
('Lluvia intensa prevista para esta tarde en la Ciudad de México', 'weather', '14:30', TRUE, 3),
('Cierre parcial de la autopista México-Toluca por obras', 'traffic', '12:00', TRUE, 4),
('El Banco Central anuncia nueva política monetaria', 'general', '11:45', TRUE, 5);

-- ============================================================================
-- SAMPLE POLLS
-- ============================================================================

INSERT INTO polls (question, description, is_active, starts_at, ends_at) VALUES
('¿Cuál crees que será el mejor fichaje de la temporada?', 'Vota por el fichaje que crees que tendrá mayor impacto en su nuevo equipo', TRUE, '2024-07-20 00:00:00', '2024-07-27 23:59:59'),
('¿Qué opinas sobre el uso de IA en el periodismo?', 'Comparte tu perspectiva sobre la integración de inteligencia artificial en los medios', TRUE, '2024-07-15 00:00:00', '2024-07-30 23:59:59');

INSERT INTO poll_options (poll_id, text, vote_count, sort_order) VALUES
(1, 'Nuevo fichaje del Real Madrid', 156, 1),
(1, 'Estrella del Barcelona', 89, 2),
(1, 'Refuerzo del Manchester City', 67, 3),
(1, 'Incorporación del PSG', 43, 4),
(2, 'Es una herramienta útil que mejora el periodismo', 234, 1),
(2, 'Me preocupa que reemplace a los periodistas humanos', 178, 2),
(2, 'Debería usarse solo para tareas básicas', 145, 3),
(2, 'No tengo una opinión formada', 56, 4);

-- ============================================================================
-- SAMPLE VIDEOS
-- ============================================================================

INSERT INTO videos (
    title, slug, description, video_url, thumbnail_url,
    duration_seconds, video_type, external_id, category_id, author_id,
    status, published_at, view_count, tags
) VALUES
(
    'Resumen: Los mejores goles de la jornada',
    'resumen-mejores-goles-jornada',
    'Disfruta de los goles más espectaculares de la última jornada de fútbol',
    'https://www.youtube.com/watch?v=example1',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    180, 'youtube', 'example1', 1, 1,
    'published', '2024-07-20 18:00:00', 5420,
    '["fútbol", "goles", "resumen", "jornada"]'
),
(
    'Tutorial: Cómo funciona la inteligencia artificial',
    'tutorial-como-funciona-inteligencia-artificial',
    'Explicación sencilla sobre los conceptos básicos de la IA',
    'https://www.youtube.com/watch?v=example2',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    480, 'youtube', 'example2', 2, 2,
    'published', '2024-07-19 12:00:00', 3210,
    '["IA", "tutorial", "tecnología", "educación"]'
),
(
    'Behind the scenes: Nueva serie de Netflix',
    'behind-scenes-nueva-serie-netflix',
    'Detrás de cámaras de la producción más ambiciosa de Netflix',
    'https://www.youtube.com/watch?v=example3',
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
    360, 'youtube', 'example3', 4, 3,
    'published', '2024-07-18 20:00:00', 7890,
    '["Netflix", "behind the scenes", "series", "producción"]'
);

-- ============================================================================
-- SAMPLE ARTICLE VIEWS (for analytics)
-- ============================================================================

INSERT INTO article_views (
    article_id, user_id, session_id, ip_address, referrer,
    device_type, country, time_spent, scroll_depth, viewed_at
) VALUES
(1, 1, 'session_001', '192.168.1.1', 'https://google.com', 'desktop', 'MX', 240, 85.5, '2024-07-20 10:15:00'),
(1, 2, 'session_002', '192.168.1.2', 'https://facebook.com', 'mobile', 'MX', 180, 70.2, '2024-07-20 10:30:00'),
(1, NULL, 'session_003', '192.168.1.3', 'https://twitter.com', 'tablet', 'US', 156, 92.1, '2024-07-20 11:00:00'),
(2, 3, 'session_004', '192.168.1.4', 'direct', 'desktop', 'MX', 420, 95.8, '2024-07-19 14:45:00'),
(2, 4, 'session_005', '192.168.1.5', 'https://linkedin.com', 'mobile', 'ES', 380, 88.3, '2024-07-19 15:20:00'),
(3, 5, 'session_006', '192.168.1.6', 'https://instagram.com', 'desktop', 'MX', 210, 76.4, '2024-07-18 17:10:00');

-- ============================================================================
-- SAMPLE SOCIAL SHARES
-- ============================================================================

INSERT INTO social_shares (article_id, platform, user_id, session_id) VALUES
(1, 'facebook', 1, 'session_001'),
(1, 'twitter', 2, 'session_002'),
(1, 'whatsapp', NULL, 'session_003'),
(2, 'linkedin', 3, 'session_004'),
(2, 'twitter', 4, 'session_005'),
(3, 'instagram', 5, 'session_006'),
(3, 'facebook', 1, 'session_007');

-- ============================================================================
-- FINAL STATISTICS UPDATE
-- ============================================================================

-- Update article counters to match sample data
CALL UpdateArticleCounters(1);
CALL UpdateArticleCounters(2);
CALL UpdateArticleCounters(3);
CALL UpdateArticleCounters(4);
CALL UpdateArticleCounters(5);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify data insertion
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Authors', COUNT(*) FROM authors
UNION ALL
SELECT 'Articles', COUNT(*) FROM articles
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Comments', COUNT(*) FROM comments
UNION ALL
SELECT 'Videos', COUNT(*) FROM videos
UNION ALL
SELECT 'Sports Matches', COUNT(*) FROM sports_matches
UNION ALL
SELECT 'Live Updates', COUNT(*) FROM live_updates
UNION ALL
SELECT 'Polls', COUNT(*) FROM polls
UNION ALL
SELECT 'Newsletter Subscribers', COUNT(*) FROM newsletter_subscribers;

SELECT 'Sample data inserted successfully!' as status;
