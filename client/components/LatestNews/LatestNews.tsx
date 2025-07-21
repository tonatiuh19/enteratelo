import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockArticles, categories } from "@/services/data.service";

interface LatestNewsProps {
  maxArticles?: number;
  showUpdateBadge?: boolean;
  compact?: boolean;
}

export function LatestNews({
  maxArticles = 5,
  showUpdateBadge = true,
  compact = false,
}: LatestNewsProps) {
  const latestArticles = mockArticles.slice(0, maxArticles);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className={cn("font-bold", compact ? "text-base" : "text-lg")}>
            Lo Último
          </h3>
        </div>
        {showUpdateBadge && (
          <Badge variant="secondary" className="text-xs animate-pulse">
            Actualizado hace 5 min
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {latestArticles.map((article, index) => (
          <div
            key={article.id}
            className="flex space-x-3 p-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group"
          >
            <div className="flex-shrink-0 w-6 text-center">
              <span className="text-xs font-mono text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div
              className={cn(
                "flex-shrink-0 overflow-hidden rounded",
                compact ? "w-10 h-8" : "w-12 h-10",
              )}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link to={`/articulo/${article.id}`}>
                <h4
                  className={cn(
                    "font-medium line-clamp-2 group-hover:text-primary transition-colors mb-1",
                    compact ? "text-xs" : "text-xs",
                  )}
                >
                  {article.title}
                </h4>
              </Link>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    categories.find((c) => c.id === article.category)?.color ||
                      "bg-primary",
                  )}
                ></span>
                <span className="truncate">
                  {categories.find((c) => c.id === article.category)?.name}
                </span>
                <span>•</span>
                <span>Hace {index + 1}h</span>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t">
          <Link
            to="/todas-las-noticias"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-xs font-medium"
          >
            <span>Ver todas las noticias</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
