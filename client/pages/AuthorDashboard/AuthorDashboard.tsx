import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/store/actions/authActions";
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/store/selectors/authSelectors";
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

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

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
                    {user.article_count || 0}
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
                    {user.total_views?.toLocaleString() || 0}
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
                  <p className="author-dashboard__stat-number">
                    {user.total_likes?.toLocaleString() || 0}
                  </p>
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
                    {user.total_views && user.article_count
                      ? Math.round(user.total_views / user.article_count)
                      : 0}
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
                  <CardTitle>Mis Artículos</CardTitle>
                </CardHeader>
                <CardContent>
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
