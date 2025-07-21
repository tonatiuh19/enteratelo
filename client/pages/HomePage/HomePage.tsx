import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  Share2,
  User,
  Calendar,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Search,
  Play,
  Star,
  MessageCircle,
  BarChart3,
  Newspaper,
  Radio,
  ArrowRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockArticles,
  categories,
  socialPosts,
  editorsPicks,
  videoContent,
  liveUpdates,
  polls,
  liveScores,
} from "@/services/data.service";
import { Layout } from "@/components/Layout/Layout";
import { LatestNews } from "@/components/LatestNews/LatestNews";
import "./HomePage.css";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(
    null,
  );

  const featuredArticles = mockArticles.filter((article) => article.featured);
  const trendingArticles = mockArticles
    .filter((article) => article.trending)
    .slice(0, 6);
  const latestArticles = mockArticles.slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length,
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const handlePollVote = (optionId: string) => {
    setSelectedPollOption(optionId);
  };

  return (
    <Layout>
      <div className="home-page">
        {/* Enhanced Hero Carousel */}
        <section className="home-page__hero">
          <div className="home-page__hero-carousel">
            <div className="home-page__hero-main">
              {featuredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className={cn(
                    "home-page__hero-slide",
                    index === currentSlide
                      ? "home-page__hero-slide--active"
                      : index < currentSlide
                        ? "home-page__hero-slide--prev"
                        : "home-page__hero-slide--next",
                  )}
                >
                  <div className="home-page__hero-image-container">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="home-page__hero-image"
                    />
                    <div className="home-page__hero-overlay" />
                    <div className="home-page__hero-overlay-side" />

                    {/* Content Overlay */}
                    <div className="home-page__hero-content">
                      <div className="home-page__hero-content-wrapper">
                        <Badge
                          className={cn(
                            "home-page__hero-category",
                            categories.find((c) => c.id === article.category)
                              ?.color || "bg-primary",
                          )}
                        >
                          {
                            categories.find((c) => c.id === article.category)
                              ?.icon
                          }
                          <span className="ml-2">
                            {
                              categories.find((c) => c.id === article.category)
                                ?.name
                            }
                          </span>
                        </Badge>
                        <h1 className="home-page__hero-title">
                          {article.title}
                        </h1>
                        <p className="home-page__hero-excerpt">
                          {article.excerpt}
                        </p>
                        <div className="home-page__hero-meta">
                          <div className="home-page__hero-meta-left">
                            <div className="home-page__hero-meta-item">
                              <User className="h-5 w-5" />
                              <span>{article.author}</span>
                            </div>
                            <div className="home-page__hero-meta-item">
                              <Calendar className="h-5 w-5" />
                              <span>{article.publishedAt}</span>
                            </div>
                            <div className="home-page__hero-meta-item">
                              <Clock className="h-5 w-5" />
                              <span>{article.readTime} min</span>
                            </div>
                          </div>
                          <div className="home-page__hero-meta-right">
                            <div className="home-page__hero-meta-item">
                              <Eye className="h-5 w-5" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <div className="home-page__hero-meta-item">
                              <Heart className="h-5 w-5" />
                              <span>{article.likes}</span>
                            </div>
                          </div>
                        </div>
                        <Link to={`/articulo/${article.id}`}>
                          <Button size="lg" className="text-lg px-8 py-3">
                            Leer Artículo Completo
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Article Tags */}
                    <div className="home-page__hero-tags">
                      {article.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced Navigation */}
              <Button
                variant="secondary"
                size="icon"
                className="home-page__hero-nav-btn home-page__hero-nav-btn--prev"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="home-page__hero-nav-btn home-page__hero-nav-btn--next"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Enhanced Slide Indicators */}
              <div className="home-page__hero-indicators">
                {featuredArticles.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "home-page__hero-indicator",
                      index === currentSlide
                        ? "home-page__hero-indicator--active"
                        : "home-page__hero-indicator--inactive",
                    )}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>

              {/* Carousel Progress Bar */}
              <div className="home-page__hero-progress">
                <Progress
                  value={((currentSlide + 1) / featuredArticles.length) * 100}
                  className="h-1 bg-white/20"
                />
              </div>
            </div>

            {/* Carousel Preview Sidebar */}
            <div className="home-page__hero-preview">
              <div className="home-page__hero-preview-content">
                <div className="home-page__hero-preview-list">
                  {featuredArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className={cn(
                        "home-page__hero-preview-item",
                        index === currentSlide &&
                          "home-page__hero-preview-item--active",
                      )}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <div className="home-page__hero-preview-image">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="home-page__hero-preview-overlay">
                          <div className="home-page__hero-preview-number">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>
                      <div className="home-page__hero-preview-info">
                        <Badge
                          className={cn(
                            "home-page__hero-preview-category",
                            categories.find((c) => c.id === article.category)
                              ?.color || "bg-primary",
                          )}
                        >
                          {
                            categories.find((c) => c.id === article.category)
                              ?.icon
                          }
                        </Badge>
                        <h4 className="home-page__hero-preview-item-title">
                          {article.title}
                        </h4>
                        <div className="home-page__hero-preview-meta">
                          <span className="home-page__hero-preview-author">
                            {article.author}
                          </span>
                          <span className="home-page__hero-preview-time">
                            {article.readTime} min
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="home-page__container">
          <div className="home-page__grid">
            {/* Main Content */}
            <div className="home-page__main-content">
              {/* Live Sports Scores */}
              <section>
                <div className="home-page__live-scores-header">
                  <div className="home-page__live-indicator"></div>
                  <h2 className="home-page__section-title">
                    Marcadores en Vivo
                  </h2>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-500/10 text-green-700 border-green-200"
                  >
                    EN DIRECTO
                  </Badge>
                </div>

                <div className="home-page__live-scores-grid">
                  {liveScores.map((match) => (
                    <Card
                      key={match.id}
                      className={cn(
                        "hover:shadow-lg transition-all duration-300 border-l-4",
                        match.status === "LIVE"
                          ? "border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
                          : match.status === "FINISHED"
                            ? "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                            : "border-l-gray-400 bg-gray-50/50 dark:bg-gray-950/20",
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs font-medium",
                                match.status === "LIVE"
                                  ? "text-green-700 border-green-300"
                                  : match.status === "FINISHED"
                                    ? "text-blue-700 border-blue-300"
                                    : "text-gray-700 border-gray-300",
                              )}
                            >
                              {match.league}
                            </Badge>
                            {match.status === "LIVE" && (
                              <Badge className="bg-red-500 text-white text-xs animate-pulse">
                                {match.minute}
                              </Badge>
                            )}
                            {match.status === "FINISHED" && (
                              <Badge variant="secondary" className="text-xs">
                                {match.minute}
                              </Badge>
                            )}
                            {match.status !== "LIVE" &&
                              match.status !== "FINISHED" && (
                                <Badge variant="outline" className="text-xs">
                                  {match.status}
                                </Badge>
                              )}
                          </div>
                          {match.status === "LIVE" && (
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                        </div>

                        <div className="space-y-3">
                          {/* Home Team */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">
                                {match.homeTeam.logo}
                              </span>
                              <div>
                                <p className="font-semibold text-sm">
                                  {match.homeTeam.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {match.homeTeam.shortName}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span
                                className={cn(
                                  "text-2xl font-bold",
                                  match.homeTeam.score !== null
                                    ? "text-foreground"
                                    : "text-muted-foreground",
                                )}
                              >
                                {match.homeTeam.score !== null
                                  ? match.homeTeam.score
                                  : "-"}
                              </span>
                            </div>
                          </div>

                          {/* Away Team */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">
                                {match.awayTeam.logo}
                              </span>
                              <div>
                                <p className="font-semibold text-sm">
                                  {match.awayTeam.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {match.awayTeam.shortName}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span
                                className={cn(
                                  "text-2xl font-bold",
                                  match.awayTeam.score !== null
                                    ? "text-foreground"
                                    : "text-muted-foreground",
                                )}
                              >
                                {match.awayTeam.score !== null
                                  ? match.awayTeam.score
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>📍</span>
                            <span>{match.venue}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Link
                    to="/deportes/marcadores"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    <span>Ver todos los marcadores</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>

              {/* Live Updates */}
              <section>
                <div className="home-page__section-header">
                  <Radio className="h-6 w-6 text-red-500 animate-pulse" />
                  <h2 className="home-page__section-title">
                    Actualizaciones en Vivo
                  </h2>
                </div>
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {liveUpdates.map((update) => (
                        <div
                          key={update.id}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors"
                        >
                          <div className="w-16 h-6 bg-primary/10 rounded text-xs flex items-center justify-center font-mono text-primary">
                            {update.time}
                          </div>
                          <p className="text-sm font-medium flex-1">
                            {update.title}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {update.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Latest Articles Grid */}
              <section>
                <div className="home-page__section-header">
                  <Newspaper className="h-6 w-6 text-primary" />
                  <h2 className="home-page__section-title">Últimas Noticias</h2>
                </div>
                <div className="home-page__articles-grid">
                  {latestArticles.map((article) => (
                    <Link key={article.id} to={`/articulo/${article.id}`}>
                      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge
                            className={cn(
                              "absolute top-3 left-3 shadow-lg",
                              categories.find((c) => c.id === article.category)
                                ?.color || "bg-primary",
                            )}
                          >
                            {
                              categories.find((c) => c.id === article.category)
                                ?.name
                            }
                          </Badge>
                          {article.trending && (
                            <Badge className="absolute top-3 right-3 bg-red-500 shadow-lg">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span className="font-medium">
                              {article.author}
                            </span>
                            <span>{article.publishedAt}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{article.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{article.readTime} min</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Editor's Picks */}
              <section>
                <div className="home-page__section-header">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <h2 className="home-page__section-title">
                    Selección del Editor
                  </h2>
                </div>
                <div className="home-page__editors-grid">
                  {editorsPicks.map((article, index) => (
                    <Card
                      key={article.id}
                      className={cn(
                        "group cursor-pointer hover:shadow-xl transition-all duration-300",
                        index === 0 && "lg:col-span-2 lg:row-span-2",
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden",
                          index === 0 ? "h-64 lg:h-full" : "h-48",
                        )}
                      >
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-yellow-500 text-yellow-900 shadow-lg">
                            <Star className="h-3 w-3 mr-1" />
                            Editor's Pick
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          {index === 0 && (
                            <>
                              <h3 className="font-bold text-2xl mb-2 line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-white/90 mb-3 line-clamp-3">
                                {article.excerpt}
                              </p>
                            </>
                          )}
                          <div className="flex items-center space-x-4 text-sm">
                            <span>{article.author}</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{article.readTime} min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index !== 0 && (
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {article.excerpt}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </section>

              {/* Video Content */}
              <section>
                <div className="home-page__section-header">
                  <Play className="h-6 w-6 text-red-500" />
                  <h2 className="home-page__section-title">
                    Contenido en Video
                  </h2>
                </div>
                <div className="home-page__video-grid">
                  {videoContent.map((video) => (
                    <Card
                      key={video.id}
                      className="group cursor-pointer hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge
                            className={
                              categories.find((c) => c.id === video.category)
                                ?.color || "bg-primary"
                            }
                          >
                            {
                              categories.find((c) => c.id === video.category)
                                ?.name
                            }
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{video.views} vistas</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Play className="h-3 w-3" />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Trending Articles */}
              <section>
                <div className="home-page__section-header">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <h2 className="home-page__section-title">Tendencias</h2>
                </div>
                <div className="home-page__trending-grid">
                  {trendingArticles.map((article) => (
                    <Link key={article.id} to={`/articulo/${article.id}`}>
                      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge
                            className={cn(
                              "absolute top-3 left-3 shadow-lg",
                              categories.find((c) => c.id === article.category)
                                ?.color || "bg-primary",
                            )}
                          >
                            {
                              categories.find((c) => c.id === article.category)
                                ?.name
                            }
                          </Badge>
                          <Badge className="absolute top-3 right-3 bg-red-500 shadow-lg">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{article.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{article.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{article.readTime} min</span>
                              </div>
                            </div>
                            <span>{article.publishedAt}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Enhanced Sidebar */}
            <div className="home-page__sidebar">
              {/* Lo Último */}
              <LatestNews maxArticles={5} showUpdateBadge={true} />

              {/* Interactive Poll */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Encuesta del Día</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  {polls[0] && (
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">
                        {polls[0].question}
                      </h4>
                      <div className="space-y-2">
                        {polls[0].options.map((option) => (
                          <div key={option.id} className="space-y-1">
                            <div
                              className={cn(
                                "flex items-center justify-between p-2 rounded cursor-pointer transition-colors",
                                selectedPollOption === option.id
                                  ? "bg-primary/10 border border-primary"
                                  : "hover:bg-muted",
                              )}
                              onClick={() => handlePollVote(option.id)}
                            >
                              <span className="text-sm">{option.text}</span>
                              <span className="text-xs text-muted-foreground">
                                {Math.round(
                                  (option.votes / polls[0].totalVotes) * 100,
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={(option.votes / polls[0].totalVotes) * 100}
                              className="h-1"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {polls[0].totalVotes.toLocaleString()} votos totales
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Newsletter Subscription */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Newsletter</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recibe las últimas noticias directamente en tu email
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Suscribirse
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Social Media Feed */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold">Redes Sociales</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lo último de nuestras redes
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialPosts.map((post, index) => (
                    <div key={post.id}>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {post.platform === "twitter" && (
                            <Twitter className="h-4 w-4 text-blue-500" />
                          )}
                          {post.platform === "instagram" && (
                            <Instagram className="h-4 w-4 text-pink-500" />
                          )}
                          {post.platform === "facebook" && (
                            <Facebook className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">
                              {post.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {post.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-2">
                            {post.content}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Share2 className="h-3 w-3" />
                              <span>{post.shares}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < socialPosts.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-bold">🏷️ Tags Populares</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "IA",
                      "Tecnología",
                      "Fútbol",
                      "Ciencia",
                      "Netflix",
                      "Bienestar",
                      "Política",
                      "Sostenibilidad",
                      "Gaming",
                      "Salud",
                      "Cine",
                      "Música",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Advertisement Space */}
              <Card className="border-dashed border-2 border-muted-foreground/20">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">📢</span>
                    </div>
                    <p className="text-sm">Espacio Publicitario</p>
                    <p className="text-xs">Anúnciate aquí</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
