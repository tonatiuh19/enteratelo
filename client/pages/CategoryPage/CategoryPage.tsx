import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import { cn } from "@/lib/utils";
import { mockArticles, categories } from "@/services/data.service";
import { Layout } from "@/components/Layout/Layout";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState("latest");
  const [displayCount, setDisplayCount] = useState(9);

  const category = categories.find((c) => c.id === categoryId);
  const categoryArticles = mockArticles.filter(
    (article) => article.category === categoryId,
  );

  const sortedArticles = [...categoryArticles].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views;
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case "oldest":
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      default: // latest
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    }
  });

  const displayedArticles = sortedArticles.slice(0, displayCount);
  const hasMore = displayCount < sortedArticles.length;

  if (!category) {
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

  return (
    <Layout showBreakingNews={false}>
      <div className="category-page">
        <div className="category-page__container">
          {/* Category Header */}
          <div className="category-page__header">
            <div className="category-page__icon">{category.icon}</div>
            <h1 className="category-page__title">{category.name}</h1>
            <p className="category-page__description">
              Descubre las últimas noticias y artículos sobre{" "}
              {category.name.toLowerCase()}. Mantente al día con toda la
              información más relevante.
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
                article={article}
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
