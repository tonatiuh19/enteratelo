import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, Eye, Heart, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Article } from "@/services/data.service";

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
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className={cn(
            "w-full object-cover transition-transform duration-300 group-hover:scale-105",
            featured ? "h-64" : "h-48",
          )}
        />
        {article.trending && (
          <Badge className="absolute top-3 right-3 bg-red-500 shadow-lg">
            <span className="animate-pulse">🔥</span>
            Trending
          </Badge>
        )}
        {article.featured && (
          <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-900 shadow-lg">
            <span>⭐</span>
            Destacado
          </Badge>
        )}
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(article.publishedAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        <Link
          to={`/articulo/${article.id}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3
            className={cn(
              "font-bold leading-tight line-clamp-2",
              featured ? "text-xl" : "text-lg",
            )}
          >
            {article.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-2">
          {article.excerpt}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {article.likes.toLocaleString()}
            </div>
          </div>
          <span className="font-medium">{article.author}</span>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
