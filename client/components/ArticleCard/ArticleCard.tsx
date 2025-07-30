import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, Eye, Heart, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Article } from "@/services/data.service";
import "./ArticleCard.css";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
}

export function ArticleCard({
  article,
  featured = false,
  className,
}: ArticleCardProps) {
  return (
    <Card className={cn("article-card group", className)}>
      <div className="article-card__image-container">
        <img
          src={article.imageUrl}
          alt={article.title}
          className={cn(
            "article-card__image",
            featured
              ? "article-card__image--featured"
              : "article-card__image--regular",
          )}
        />
        {article.trending && (
          <Badge className="article-card__badge article-card__badge--trending">
            <span className="animate-pulse">🔥</span>
            Trending
          </Badge>
        )}
        {article.featured && (
          <Badge className="article-card__badge article-card__badge--featured">
            <span>⭐</span>
            Destacado
          </Badge>
        )}
      </div>

      <CardHeader className="article-card__header">
        <div className="article-card__date">
          <Calendar className="h-4 w-4" />
          {new Date(article.publishedAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <Link
          to={`/articulo/${article.id}`}
          className="article-card__title-link"
        >
          <h3
            className={cn(
              "article-card__title",
              featured
                ? "article-card__title--featured"
                : "article-card__title--regular",
            )}
          >
            {article.title}
          </h3>
        </Link>

        <p className="article-card__excerpt">{article.excerpt}</p>
      </CardHeader>

      <CardContent className="article-card__content">
        <div className="article-card__meta">
          <div className="article-card__stats">
            <div className="article-card__stat">
              <Clock className="h-4 w-4" />
              {Math.ceil(
                (article.content?.replace(/<[^>]*>/g, "").split(" ").length ||
                  0) / 200,
              )}{" "}
              min
            </div>
          </div>
          <span className="article-card__author">{article.author}</span>
        </div>

        <div className="article-card__tags">
          {Array.isArray(article.tags) &&
            article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="article-card__tag">
                {tag}
              </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
