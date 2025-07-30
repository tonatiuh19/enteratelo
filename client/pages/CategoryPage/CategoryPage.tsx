import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store";
import { fetchArticlesByCategorySlug } from "@/store/actions/articlesActions";
import { fetchCategories } from "@/store/actions/categoriesActions";
import {
  selectAllArticles,
  selectArticlesLoading,
  selectArticlesError,
} from "@/store/selectors/articlesSelectors";
import { selectAllCategories } from "@/store/selectors/categoriesSelectors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { cn, getImageUrl } from "@/lib/utils";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { Layout } from "@/components/Layout/Layout";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import "./CategoryPage.css";

// Transform Redux article to ArticleCard format
const transformArticleForCard = (article: any) => {
  // Safely parse tags
  let tags: string[] = [];
  console.log("Original article tags:", article.tags, typeof article.tags);

  try {
    if (typeof article.tags === "string" && article.tags.trim()) {
      tags = JSON.parse(article.tags);
    } else if (Array.isArray(article.tags)) {
      tags = article.tags;
    }
  } catch (error) {
    console.warn("Failed to parse tags:", article.tags, error);
    tags = [];
  }

  // Ensure tags is always an array
  if (!Array.isArray(tags)) {
    console.warn(
      "Tags is not an array after parsing, forcing to empty array:",
      tags,
    );
    tags = [];
  }

  console.log("Final transformed tags:", tags, Array.isArray(tags));

  return {
    id: article.slug || article.id, // Use slug for routing
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category_id || article.category,
    author: article.author_name,
    authorBio: article.author_bio || "",
    authorAvatar: article.author_avatar || "",
    publishedAt: article.published_at || article.publishedAt,
    imageUrl: getImageUrl(article.featured_image_url || article.imageUrl),
    imageCaption: article.featured_image_caption || article.imageCaption,
    readTime:
      article.estimated_read_time ||
      Math.ceil((article.word_count || 500) / 200),
    views: article.view_count || article.views || 0,
    likes: article.like_count || article.likes || 0,
    featured: article.is_featured || article.featured || false,
    trending: article.is_trending || article.trending || false,
    tags: tags, // Use safely parsed tags
    metaDescription: article.meta_description,
    metaKeywords: article.meta_keywords,
  };
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState("latest");
  const [displayCount, setDisplayCount] = useState(9);

  // Redux selectors
  const articles = useAppSelector(selectAllArticles);
  const categories = useAppSelector(selectAllCategories);
  const isLoading = useAppSelector(selectArticlesLoading);
  const error = useAppSelector(selectArticlesError);

  // Find category by slug (categoryId is actually a slug in the URL)
  const category = categories.find((c) => c.slug === categoryId);

  // Fetch data on component mount
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchArticlesByCategorySlug(categoryId));
    }
    // Fetch categories if not already loaded
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoryId, categories.length]);

  const sortedArticles = [...articles].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (b.view_count || 0) - (a.view_count || 0);
      case "trending":
        return (b.is_trending ? 1 : 0) - (a.is_trending ? 1 : 0);
      case "oldest":
        return (
          new Date(a.created_at || a.published_at).getTime() -
          new Date(b.created_at || b.published_at).getTime()
        );
      default: // latest
        return (
          new Date(b.created_at || b.published_at).getTime() -
          new Date(a.created_at || a.published_at).getTime()
        );
    }
  });

  const displayedArticles = sortedArticles.slice(0, displayCount);
  const hasMore = displayCount < sortedArticles.length;

  if (!category && categories.length > 0) {
    return (
      <Layout showBreakingNews={false}>
        <div className="category-page__container">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
            <p className="text-muted-foreground">
              La categoría que buscas no existe.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Show loading state
  if (isLoading || !category) {
    return (
      <Layout showBreakingNews={false}>
        <div className="category-page__container">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando categoría...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout showBreakingNews={false}>
        <div className="category-page__container">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-destructive mb-4">Error</h1>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button
              onClick={() => dispatch(fetchArticlesByCategorySlug(categoryId!))}
            >
              Intentar de nuevo
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBreakingNews={false}>
      <div className="category-page">
        <div className="category-page__container">
          {/* Category Header */}
          <div className="category-page__header">
            <div className="category-page__title-section">
              <div className="category-page__icon">
                {getCategoryIcon(category.icon || category.name, "w-6 h-6")}
              </div>
              <h1 className="category-page__title">{category.name}</h1>
            </div>
            <p className="category-page__description">
              {category.description ||
                `Descubre las últimas noticias y artículos sobre ${category.name.toLowerCase()}. Mantente al día con toda la información más relevante.`}
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className="category-page__filters">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Más recientes</SelectItem>
                <SelectItem value="popular">Más populares</SelectItem>
                <SelectItem value="trending">Tendencias</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="outline" className="px-4 py-2">
              {sortedArticles.length} artículos encontrados
            </Badge>
          </div>

          {/* Articles Grid */}
          <div className="category-page__grid">
            {displayedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={transformArticleForCard(article)}
                className="h-full"
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="category-page__load-more">
              <Button
                onClick={() => setDisplayCount((prev) => prev + 6)}
                size="lg"
              >
                Cargar más artículos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {/* No Articles Message */}
          {sortedArticles.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">
                No hay artículos en esta categoría
              </h3>
              <p className="text-muted-foreground">
                Pronto agregaremos contenido nuevo. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
