import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/store/actions/authActions";
import { fetchArticlesByAuthorId } from "@/store/actions/articlesActions";
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/store/selectors/authSelectors";
import {
  selectAllArticles,
  selectArticlesLoading,
} from "@/store/selectors/articlesSelectors";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  PlusCircle,
  BarChart3,
  FileText,
  Heart,
  Eye,
  Edit,
  LogOut,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
} from "lucide-react";
import "./AuthorDashboard.css";

export default function AuthorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);

  // Articles state
  const allArticles = useAppSelector(selectAllArticles);
  const articlesLoading = useAppSelector(selectArticlesLoading);
  // Since we're fetching user articles directly, we can use allArticles as userArticles
  const userArticles = allArticles;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Fetch articles when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const authorId = user.user_id?.toString() || user.id?.toString();
      if (authorId) {
        console.log("Fetching articles for author ID:", authorId);
        dispatch(fetchArticlesByAuthorId({ authorId }));
      }
    }
  }, [dispatch, isAuthenticated, user]);

  // Debug user articles
  useEffect(() => {
    console.log("User:", user);
    console.log("User articles (from API):", userArticles);
  }, [user, userArticles]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // Calculate stats from user articles
  const totalViews = userArticles.reduce(
    (sum, article) => sum + (article.viewCount || 0),
    0,
  );
  const averageViews =
    userArticles.length > 0 ? Math.round(totalViews / userArticles.length) : 0;

  if (!user) {
    return (
      <Layout>
        <div className="author-dashboard__loading">
          <p>Cargando dashboard...</p>
        </div>
      </Layout>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Layout showBreakingNews={false}>
      <div className="author-dashboard">
        <div className="author-dashboard__container">
          {/* Header */}
          <div className="author-dashboard__header">
            <div className="author-dashboard__user-info">
              <Avatar className="author-dashboard__avatar">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="author-dashboard__user-details">
                <h1 className="author-dashboard__name">{user.name}</h1>
                <p className="author-dashboard__position">
                  {user.position || "Autor"} •{" "}
                  {user.specialization || "General"}
                </p>
                <div className="author-dashboard__social-links">
                  {user.social_twitter && (
                    <a
                      href={`https://twitter.com/${user.social_twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-dashboard__social-link"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {user.social_instagram && (
                    <a
                      href={`https://instagram.com/${user.social_instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-dashboard__social-link"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {user.social_linkedin && (
                    <a
                      href={`https://linkedin.com/in/${user.social_linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-dashboard__social-link"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {user.social_facebook && (
                    <a
                      href={`https://facebook.com/${user.social_facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-dashboard__social-link"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="author-dashboard__actions">
              <Button
                onClick={() => navigate("/author/new-article")}
                className="author-dashboard__new-article-btn"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Nuevo Artículo
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="author-dashboard__logout-btn"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="author-dashboard__stats">
            <Card className="author-dashboard__stat-card">
              <CardContent className="author-dashboard__stat-content">
                <div className="author-dashboard__stat-icon">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="author-dashboard__stat-info">
                  <p className="author-dashboard__stat-number">
                    {userArticles.length}
                  </p>
                  <p className="author-dashboard__stat-label">Artículos</p>
                </div>
              </CardContent>
            </Card>

            <Card className="author-dashboard__stat-card">
              <CardContent className="author-dashboard__stat-content">
                <div className="author-dashboard__stat-icon">
                  <Eye className="h-8 w-8" />
                </div>
                <div className="author-dashboard__stat-info">
                  <p className="author-dashboard__stat-number">
                    {totalViews.toLocaleString()}
                  </p>
                  <p className="author-dashboard__stat-label">Vistas Totales</p>
                </div>
              </CardContent>
            </Card>

            <Card className="author-dashboard__stat-card">
              <CardContent className="author-dashboard__stat-content">
                <div className="author-dashboard__stat-icon">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="author-dashboard__stat-info">
                  <p className="author-dashboard__stat-number">0</p>
                  <p className="author-dashboard__stat-label">Me Gusta</p>
                </div>
              </CardContent>
            </Card>

            <Card className="author-dashboard__stat-card">
              <CardContent className="author-dashboard__stat-content">
                <div className="author-dashboard__stat-icon">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <div className="author-dashboard__stat-info">
                  <p className="author-dashboard__stat-number">
                    {averageViews}
                  </p>
                  <p className="author-dashboard__stat-label">
                    Promedio/Artículo
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="author-dashboard__tabs"
          >
            <TabsList className="author-dashboard__tabs-list">
              <TabsTrigger
                value="overview"
                className="author-dashboard__tab-trigger"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Resumen
              </TabsTrigger>
              <TabsTrigger
                value="articles"
                className="author-dashboard__tab-trigger"
              >
                <FileText className="h-4 w-4 mr-2" />
                Mis Artículos
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="author-dashboard__tab-trigger"
              >
                <User className="h-4 w-4 mr-2" />
                Perfil
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="author-dashboard__tab-trigger"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="author-dashboard__tab-content"
            >
              <div className="author-dashboard__overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Bienvenido de nuevo, {user.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="author-dashboard__welcome-text">
                      Desde aquí puedes gestionar todos tus artículos, ver las
                      estadísticas de rendimiento y actualizar tu perfil de
                      autor.
                    </p>
                    <div className="author-dashboard__quick-actions">
                      <Button
                        onClick={() => navigate("/author/new-article")}
                        className="mr-4"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Crear Nuevo Artículo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("articles")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Mis Artículos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent
              value="articles"
              className="author-dashboard__tab-content"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Mis Artículos ({userArticles.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {articlesLoading ? (
                    <div className="text-center py-8">
                      <p>Cargando artículos...</p>
                    </div>
                  ) : userArticles.length === 0 ? (
                    <div className="author-dashboard__articles-empty">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-center text-gray-600 mb-4">
                        Aún no has publicado ningún artículo
                      </p>
                      <Button
                        onClick={() => navigate("/author/new-article")}
                        className="mx-auto"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Crear Tu Primer Artículo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userArticles.map((article) => (
                        <div
                          key={article.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                {article.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {article.viewCount || 0} vistas
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />0 me gusta
                                </span>
                                <Badge
                                  variant={
                                    article.status === "published"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {article.status === "published"
                                    ? "Publicado"
                                    : "Borrador"}
                                </Badge>
                                {article.featured && (
                                  <Badge variant="outline" className="text-xs">
                                    Destacado
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  navigate(`/articulo/${article.id}`)
                                }
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  navigate(`/author/edit-article/${article.id}`)
                                }
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                            Publicado el{" "}
                            {new Date(article.publishedAt).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="profile"
              className="author-dashboard__tab-content"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Información del Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="author-dashboard__profile-info">
                    <div className="author-dashboard__profile-field">
                      <label>Nombre:</label>
                      <span>{user.name}</span>
                    </div>
                    <div className="author-dashboard__profile-field">
                      <label>Email:</label>
                      <span>{user.email}</span>
                    </div>
                    <div className="author-dashboard__profile-field">
                      <label>Especialización:</label>
                      <span>{user.specialization || "No especificada"}</span>
                    </div>
                    <div className="author-dashboard__profile-field">
                      <label>Biografía:</label>
                      <span>{user.bio || "No disponible"}</span>
                    </div>
                    <div className="author-dashboard__profile-field">
                      <label>Miembro desde:</label>
                      <span>
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "No disponible"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="settings"
              className="author-dashboard__tab-content"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    Configuraciones próximamente disponibles
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
