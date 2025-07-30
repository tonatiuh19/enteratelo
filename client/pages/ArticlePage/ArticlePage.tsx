import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store";
import { selectCurrentArticle } from "@/store/selectors/articlesSelectors";
import { fetchArticleBySlug } from "@/store/actions/articlesActions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  ArrowRight,
  Copy,
  Link as LinkIcon,
} from "lucide-react";
import { cn, getImageUrl, getLatestFormattedDate } from "@/lib/utils";
import { Layout } from "@/components/Layout/Layout";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import "./ArticlePage.css";

export default function ArticlePage() {
  const { slug } = useParams(); // Change from articleId to slug
  const dispatch = useAppDispatch();
  const article = useAppSelector(selectCurrentArticle);
  const isLoading = useAppSelector((state) => state.articles.isLoading);
  const error = useAppSelector((state) => state.articles.error);

  // Use Redux auth state instead of useAuth hook
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // Fetch article by slug when component mounts or slug changes
  useEffect(() => {
    if (slug) {
      dispatch(fetchArticleBySlug(slug));
    }
  }, [dispatch, slug]);

  // Update document metadata dynamically
  useEffect(() => {
    if (!article) return;

    // Scroll to top when article changes
    const scrollToTop = (behavior: "smooth" | "instant" = "smooth") => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior,
      });
    };

    const scrollToTopDelayed = () => {
      scrollToTop("smooth");
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(scrollToTopDelayed);
    }, 0);

    document.title = `${article.title} | Entérate lo`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        article.meta_description || article.excerpt || article.title,
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        article.meta_description || article.excerpt || article.title;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    if (article.meta_keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", article.meta_keywords);
      } else {
        const meta = document.createElement("meta");
        meta.name = "keywords";
        meta.content = article.meta_keywords;
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
    updateOGTag(
      "og:description",
      article.meta_description || article.excerpt || article.title,
    );
    updateOGTag(
      "og:image",
      getImageUrl(article.featured_image_url || article.imageUrl),
    );
    updateOGTag("og:type", "article");
    updateOGTag("og:url", window.location.href);

    // Article specific OG tags
    updateOGTag("article:author", article.author_name || article.author || "");
    updateOGTag(
      "article:published_time",
      article.published_at || article.publishedAt || "",
    );
    updateOGTag("article:section", "Tecnología");

    // Handle tags from different formats
    const tags = article.tags
      ? typeof article.tags === "string"
        ? JSON.parse(article.tags)
        : article.tags
      : [];
    if (Array.isArray(tags)) {
      tags.forEach((tag: string) => {
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
      article.meta_description || article.excerpt || article.title,
    );
    updateTwitterTag(
      "twitter:image",
      getImageUrl(article.featured_image_url || article.imageUrl),
    );

    // Add structured data (JSON-LD) for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.meta_description || article.excerpt || article.title,
      image: getImageUrl(article.featured_image_url || article.imageUrl),
      author: {
        "@type": "Person",
        name: article.author_name || article.author || "",
        description: article.author_bio || "",
      },
      publisher: {
        "@type": "Organization",
        name: "Entérate lo",
        logo: {
          "@type": "ImageObject",
          url: "/favicon.ico",
        },
      },
      datePublished: article.published_at || article.publishedAt || "",
      dateModified:
        article.updated_at ||
        article.updatedAt ||
        article.published_at ||
        article.publishedAt ||
        "",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": window.location.href,
      },
      keywords:
        article.meta_keywords || (Array.isArray(tags) ? tags.join(", ") : ""),
      articleSection: "Tecnología",
      wordCount: article.content
        ? article.content.replace(/<[^>]*>/g, "").split(" ").length
        : 0,
      timeRequired: `PT${Math.ceil((article.content?.replace(/<[^>]*>/g, "").split(" ").length || 0) / 200)}M`,
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/ViewAction",
          userInteractionCount: article.view_count || article.views || 0,
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
      clearTimeout(timeoutId);
      document.title = "Entérate lo";
      const scriptToRemove = document.querySelector(
        'script[type="application/ld+json"]',
      );
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [article]);

  // Mock data for now - these would come from API in real implementation
  const category = { id: "technology", name: "Tecnología", icon: "🔬" };
  const relatedArticles: any[] = []; // Would be fetched from API
  const articleComments: any[] = []; // Would be fetched from API

  // Show loading state
  if (isLoading || !article) {
    return (
      <Layout showBreakingNews={false}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando artículo...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout showBreakingNews={false}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Intentar de nuevo
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.excerpt || article.title,
      url: window.location.href,
    };

    // Check if Web Share API is supported (mainly mobile devices)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Article shared successfully");
      } catch (error) {
        console.log("Share cancelled or failed:", error);
      }
    } else {
      // Fallback: toggle share menu for desktop
      setShareMenuOpen(!shareMenuOpen);
    }
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const text = encodeURIComponent(article.excerpt || article.title);

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShareMenuOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("¡Enlace copiado al portapapeles!");
      setShareMenuOpen(false);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        alert("¡Enlace copiado al portapapeles!");
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError);
      }
      document.body.removeChild(textArea);
      setShareMenuOpen(false);
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
                    <span className="font-medium">
                      {article.author_name || "Autor"}
                    </span>
                  </div>
                  <div className="article-page__meta-item">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {getLatestFormattedDate(
                        article.created_at,
                        article.updated_at,
                      )}
                    </span>
                  </div>
                  <div className="article-page__meta-item">
                    <Clock className="h-4 w-4" />
                    <span>
                      {Math.ceil(
                        (article.content?.replace(/<[^>]*>/g, "").split(" ")
                          .length || 0) / 200,
                      )}{" "}
                      min de lectura
                    </span>
                  </div>
                  {isAuthenticated &&
                    String(user.id) === String(article.author_id) && (
                      <div className="article-page__meta-item">
                        <Eye className="h-4 w-4" />
                        <span>
                          {(article.view_count || 0).toLocaleString()} vistas
                        </span>
                      </div>
                    )}
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
                    {isAuthenticated &&
                      String(user.id) === String(article.author_id) &&
                      (article.likes || 0) + (liked ? 1 : 0)}
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
                  <Popover open={shareMenuOpen} onOpenChange={setShareMenuOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56" align="end">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm mb-3">
                          Compartir artículo
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareToSocial("twitter")}
                            className="flex items-center justify-center"
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareToSocial("facebook")}
                            className="flex items-center justify-center"
                          >
                            <Facebook className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareToSocial("linkedin")}
                            className="flex items-center justify-center"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => shareToSocial("whatsapp")}
                            className="flex items-center justify-center"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <Separator className="my-3" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="w-full flex items-center justify-center"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar enlace
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
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
                src={getImageUrl(
                  article.featured_image_url || article.imageUrl,
                )}
                alt={article.title}
                className="article-page__hero-image"
              />

              {/* Image Caption */}
              <div className="article-page__image-caption">
                <p>
                  {article.featured_image_caption ||
                    article.imageCaption ||
                    "Imagen ilustrativa del artículo"}
                </p>
              </div>
            </div>

            {/* Content + Sidebar Grid */}
            <div className="article-page__content-sidebar-grid">
              {/* Main Content Column */}
              <div className="article-page__main-content">
                <div className="article-page__content">
                  {(() => {
                    // First try to parse content_blocks if available
                    if (article.content_blocks) {
                      try {
                        const blocks = JSON.parse(article.content_blocks);
                        return blocks.map((block: any, index: number) => {
                          switch (block.type) {
                            case "text":
                              return (
                                <div key={block.id || index} className="mb-4">
                                  <p
                                    style={{
                                      color: block.content.color || "#000000",
                                      fontSize: `${block.content.fontSize || 16}px`,
                                      fontWeight:
                                        block.content.fontWeight || "normal",
                                      fontStyle:
                                        block.content.fontStyle || "normal",
                                      textAlign:
                                        block.content.textAlign || "left",
                                      lineHeight:
                                        block.content.lineHeight || "1.5",
                                      marginTop: `${block.content.marginTop || 0}px`,
                                      marginBottom: `${block.content.marginBottom || 16}px`,
                                      textDecoration:
                                        block.content.textDecoration || "none",
                                    }}
                                  >
                                    {block.content.text}
                                  </p>
                                </div>
                              );
                            case "quote":
                              return (
                                <div key={block.id || index} className="mb-6">
                                  <blockquote
                                    style={{
                                      fontSize: `${block.content.fontSize || 18}px`,
                                      fontStyle:
                                        block.content.fontStyle || "italic",
                                      textAlign:
                                        block.content.textAlign || "center",
                                      marginTop: `${block.content.marginTop || 24}px`,
                                      marginBottom: `${block.content.marginBottom || 24}px`,
                                      backgroundColor:
                                        block.content.backgroundColor ||
                                        "#f8f9fa",
                                      padding: "20px",
                                      borderLeft: block.content.borderLeft
                                        ? "4px solid #e9ecef"
                                        : "none",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    {block.content.text}
                                    {block.content.author && (
                                      <footer className="mt-2 text-sm text-muted-foreground">
                                        — {block.content.author}
                                        {block.content.source &&
                                          `, ${block.content.source}`}
                                      </footer>
                                    )}
                                  </blockquote>
                                </div>
                              );
                            case "image":
                              return (
                                <div
                                  key={block.id || index}
                                  className="mb-6 text-center"
                                >
                                  <img
                                    src={getImageUrl(block.url)}
                                    alt={block.content.alt || ""}
                                    style={{
                                      maxWidth: "100%",
                                      borderRadius: "8px",
                                      margin: "24px auto",
                                    }}
                                  />
                                  {block.content.alt && (
                                    <p className="text-sm text-muted-foreground italic mt-2">
                                      {block.content.alt}
                                    </p>
                                  )}
                                </div>
                              );
                            default:
                              return null;
                          }
                        });
                      } catch (error) {
                        console.error("Error parsing content_blocks:", error);
                        // Fallback to regular content
                        return (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: article.content,
                            }}
                          />
                        );
                      }
                    }

                    // Fallback to regular content if content_blocks is not available
                    return (
                      <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    );
                  })()}
                </div>

                <div className="article-page__tags">
                  {(() => {
                    const tags = article.tags
                      ? typeof article.tags === "string"
                        ? JSON.parse(article.tags)
                        : article.tags
                      : [];
                    return Array.isArray(tags)
                      ? tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            #{tag}
                          </Badge>
                        ))
                      : null;
                  })()}
                </div>

                <div className="article-page__share-buttons">
                  <span className="font-medium">Compartir artículo:</span>
                  <div className="article-page__social-share">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => shareToSocial("twitter")}
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => shareToSocial("facebook")}
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => shareToSocial("whatsapp")}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar enlace
                    </Button>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="article-page__comments">
                  <h3 className="article-page__comments-title">
                    Comentarios ({articleComments.length})
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
                    {articleComments.map((comment) => (
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
                              {comment.verified && (
                                <span className="ml-1 text-primary text-xs">
                                  ✓
                                </span>
                              )}
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
                {/* Lo Último */}
                <LatestNews maxArticles={5} showUpdateBadge={true} />

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

                {/* Author Info */}
                <Card className="article-page__author-card">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-lg">
                          {(article.author_name || "A").charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold">
                          {article.author_name || "Autor"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Periodista
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {article.author_bio ||
                        "Periodista especializado en la cobertura de temas de actualidad e interés general."}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Seguir autor
                    </Button>
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
