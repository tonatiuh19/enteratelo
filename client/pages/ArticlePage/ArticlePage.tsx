import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  Share2,
  BookmarkPlus,
  MessageCircle,
  Eye,
  Clock,
  User,
  Calendar,
  Twitter,
  Facebook,
  Instagram,
  ChevronLeft,
  Send,
  ThumbsUp,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockArticles, categories } from "@/services/data.service";
import { Layout } from "@/components/Layout/Layout";
import "./ArticlePage.css";

export default function ArticlePage() {
  const { articleId } = useParams();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Find the article (in a real app, this would fetch from API)
  const article =
    mockArticles.find((a) => a.id === articleId) || mockArticles[0];
  const category = categories.find((c) => c.id === article.category);
  const relatedArticles = mockArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // Utility function to scroll to top
  const scrollToTop = (behavior: "smooth" | "instant" = "smooth") => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: behavior,
    });
  };

  // Update document metadata dynamically
  useEffect(() => {
    // Scroll to top when article changes
    // Use requestAnimationFrame to ensure DOM is ready
    const scrollToTopDelayed = () => {
      scrollToTop("smooth");
    };

    // Small delay to ensure the component has rendered
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(scrollToTopDelayed);
    }, 0);

    document.title = `${article.title} | Entérate lo`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        article.metaDescription || article.excerpt,
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = article.metaDescription || article.excerpt;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    if (article.metaKeywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", article.metaKeywords.join(", "));
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = article.metaKeywords.join(", ");
        document.head.appendChild(meta);
      }
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    updateOGTag("og:title", article.title);
    updateOGTag("og:description", article.metaDescription || article.excerpt);
    updateOGTag("og:image", article.imageUrl);
    updateOGTag("og:type", "article");
    updateOGTag("og:url", window.location.href);

    // Article specific OG tags
    updateOGTag("article:author", article.author);
    updateOGTag("article:published_time", article.publishedAt);
    updateOGTag("article:section", category?.name || "");
    if (article.tags) {
      article.tags.forEach((tag) => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "article:tag");
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }

    // Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    updateTwitterTag("twitter:card", "summary_large_image");
    updateTwitterTag("twitter:title", article.title);
    updateTwitterTag(
      "twitter:description",
      article.metaDescription || article.excerpt,
    );
    updateTwitterTag("twitter:image", article.imageUrl);

    // Add structured data (JSON-LD) for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription || article.excerpt,
      image: article.imageUrl,
      author: {
        "@type": "Person",
        name: article.author,
        description: article.authorBio,
      },
      publisher: {
        "@type": "Organization",
        name: "Entérate lo",
        logo: {
          "@type": "ImageObject",
          url: "/favicon.ico",
        },
      },
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": window.location.href,
      },
      keywords: article.metaKeywords?.join(", ") || article.tags.join(", "),
      articleSection: category?.name,
      wordCount: article.content.replace(/<[^>]*>/g, "").split(" ").length,
      timeRequired: `PT${article.readTime}M`,
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: article.likes,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/ViewAction",
          userInteractionCount: article.views,
        },
      ],
    };

    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function to reset title when component unmounts
    return () => {
      // Clear the scroll timeout
      clearTimeout(timeoutId);

      document.title = "Entérate lo";
      // Clean up structured data
      const scriptToRemove = document.querySelector(
        'script[type="application/ld+json"]',
      );
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [article, category]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <Layout showBreakingNews={false}>
      <div className="article-page">
        {/* Article Header */}
        <div className="article-page__header-section">
          <div className="article-page__container">
            <div className="article-page__header-content">
              {/* Breadcrumb */}
              <div className="article-page__breadcrumb">
                <Link to="/" className="article-page__breadcrumb-link">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Inicio</span>
                </Link>
                <span className="text-muted-foreground mx-2">•</span>
                <Link
                  to={`/categoria/${category?.id}`}
                  className="article-page__breadcrumb-link"
                >
                  {category?.name}
                </Link>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground">Artículo</span>
              </div>

              {/* Category Badge */}
              <Badge className="article-page__category-badge mb-4">
                <span className="mr-1">{category?.icon}</span>
                {category?.name}
              </Badge>

              {/* Title */}
              <h1 className="article-page__title">{article.title}</h1>

              {/* Excerpt */}
              <p className="article-page__excerpt">{article.excerpt}</p>

              {/* Meta Information */}
              <div className="article-page__meta">
                <div className="article-page__meta-left">
                  <div className="article-page__meta-item">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="article-page__meta-item">
                    <Calendar className="h-4 w-4" />
                    <span>{article.publishedAt}</span>
                  </div>
                  <div className="article-page__meta-item">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} min de lectura</span>
                  </div>
                  <div className="article-page__meta-item">
                    <Eye className="h-4 w-4" />
                    <span>{article.views.toLocaleString()} vistas</span>
                  </div>
                </div>

                <div className="article-page__meta-right">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart
                      className={cn("h-4 w-4 mr-2", liked && "fill-current")}
                    />
                    {article.likes + (liked ? 1 : 0)}
                  </Button>
                  <Button
                    variant={bookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBookmarked(!bookmarked)}
                  >
                    <BookmarkPlus
                      className={cn("h-4 w-4", bookmarked && "fill-current")}
                    />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="article-page__container">
          <div className="article-page__content-wrapper">
            {/* Full Width Hero Image */}
            <div className="article-page__hero-section">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="article-page__hero-image"
              />

              {/* Image Caption */}
              <div className="article-page__image-caption">
                <p>
                  {article.imageCaption || "Imagen ilustrativa del artículo"}
                </p>
              </div>
            </div>

            {/* Content + Sidebar Grid */}
            <div className="article-page__content-sidebar-grid">
              {/* Main Content Column */}
              <div className="article-page__main-content">
                <div
                  className="article-page__content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <div className="article-page__tags">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="article-page__share-buttons">
                  <span className="font-medium">Compartir artículo:</span>
                  <div className="article-page__social-share">
                    <Button variant="outline" size="sm">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </Button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="article-page__comments">
                  <h3 className="article-page__comments-title">
                    Comentarios ({mockComments.length})
                  </h3>

                  <Card className="article-page__comment-form">
                    <CardContent className="pt-6">
                      <h4 className="article-page__comment-form-title">
                        Deja tu comentario
                      </h4>
                      <form onSubmit={handleSubmitComment}>
                        <div className="article-page__comment-form-grid">
                          <Input placeholder="Tu nombre" required />
                          <Input placeholder="Tu email" type="email" required />
                        </div>
                        <Textarea
                          placeholder="Escribe tu comentario..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="article-page__comment-form-textarea"
                          required
                        />
                        <Button type="submit" className="w-fit">
                          <Send className="h-4 w-4 mr-2" />
                          Enviar comentario
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <div className="article-page__comment-list">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="article-page__comment">
                        <div className="article-page__comment-header">
                          <Avatar>
                            <AvatarFallback>
                              {comment.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="article-page__comment-author">
                              {comment.author}
                            </span>
                            <div className="article-page__comment-time">
                              {comment.timestamp}
                            </div>
                          </div>
                        </div>
                        <p className="article-page__comment-content">
                          {comment.content}
                        </p>
                        <div className="article-page__comment-actions">
                          <button className="article-page__comment-action">
                            <ThumbsUp className="h-4 w-4" />
                            {comment.likes}
                          </button>
                          <button className="article-page__comment-action">
                            <MessageCircle className="h-4 w-4" />
                            Responder
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="article-page__sidebar-column">
                {/* Author Info */}
                <Card className="article-page__author-card">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-lg">
                          {article.authorAvatar || article.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{article.author}</h3>
                        <p className="text-sm text-muted-foreground">
                          Periodista
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {article.authorBio ||
                        "Periodista especializado en la cobertura de temas de actualidad e interés general."}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Seguir autor
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                <Card className="article-page__related-card">
                  <CardHeader>
                    <h3 className="font-bold">Artículos Relacionados</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedArticles
                      .slice(0, 3)
                      .map((relatedArticle, index) => (
                        <div key={relatedArticle.id} className="space-y-3">
                          <Link
                            to={`/articulo/${relatedArticle.id}`}
                            className="group block"
                          >
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0 w-16 h-12 overflow-hidden rounded">
                                <img
                                  src={relatedArticle.imageUrl}
                                  alt={relatedArticle.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                  {relatedArticle.title}
                                </h4>
                                <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                                  <span>{relatedArticle.author}</span>
                                  <span>•</span>
                                  <span>{relatedArticle.readTime} min</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                          {index < relatedArticles.slice(0, 3).length - 1 && (
                            <Separator />
                          )}
                        </div>
                      ))}
                    <div className="pt-2">
                      <Link
                        to={`/categoria/${category?.id}`}
                        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      >
                        <span>Ver más de {category?.name}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="article-page__newsletter-card">
                  <CardHeader>
                    <h3 className="font-bold">Newsletter</h3>
                    <p className="text-sm text-muted-foreground">
                      Recibe los mejores artículos en tu email
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-3">
                      <Input placeholder="tu@email.com" type="email" />
                      <Button className="w-full" size="sm">
                        Suscribirse
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card className="article-page__tags-card">
                  <CardHeader>
                    <h3 className="font-bold">Tags Populares</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Tecnología",
                        "Deportes",
                        "Innovación",
                        "Estadios",
                        "Futuro",
                        "IA",
                      ].map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Related Articles Bottom */}
            <div className="article-page__related-articles">
              <h3 className="article-page__related-title">
                Artículos Relacionados
              </h3>
              <div className="article-page__related-grid">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/articulo/${relatedArticle.id}`}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedArticle.imageUrl}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {relatedArticle.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Mock comments data for now
const mockComments = [
  {
    id: "1",
    author: "Carlos Ruiz",
    content:
      "Excelente artículo. La tecnología en los estadios realmente está cambiando la experiencia.",
    timestamp: "Hace 2 horas",
    likes: 12,
  },
  {
    id: "2",
    author: "Maria González",
    content:
      "Me encanta cómo explicaste el tema del 5G. Muy fácil de entender.",
    timestamp: "Hace 4 horas",
    likes: 8,
  },
  {
    id: "3",
    author: "Diego Fernández",
    content:
      "¿Crees que esta tecnología llegará pronto a estadios más pequeños?",
    timestamp: "Hace 1 día",
    likes: 5,
  },
];
