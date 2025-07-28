import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateUserProfile } from "@/store/actions/authActions";
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/store/selectors/authSelectors";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Edit3,
  Save,
  X,
  Camera,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Facebook,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import "./AuthorProfile.css";

export default function AuthorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authLoading = useAppSelector(selectAuthLoading);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    position: "",
    specialization: "",
    avatar_url: "",
    social_twitter: "",
    social_instagram: "",
    social_linkedin: "",
    social_facebook: "",
    meta_title: "",
    meta_description: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        position: user.position || "",
        specialization: user.specialization || "",
        avatar_url: user.avatar_url || "",
        social_twitter: user.social_twitter || "",
        social_instagram: user.social_instagram || "",
        social_linkedin: user.social_linkedin || "",
        social_facebook: user.social_facebook || "",
        meta_title: user.meta_title || "",
        meta_description: user.meta_description || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await dispatch(
        updateUserProfile({
          ...user,
          ...formData,
        }),
      );

      if (result.type === "auth/updateUserProfile/fulfilled") {
        setMessage({
          type: "success",
          text: "Perfil actualizado exitosamente",
        });
        setIsEditing(false);
      } else {
        throw new Error("Error al actualizar el perfil");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error al actualizar el perfil. Inténtalo nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        position: user.position || "",
        specialization: user.specialization || "",
        avatar_url: user.avatar_url || "",
        social_twitter: user.social_twitter || "",
        social_instagram: user.social_instagram || "",
        social_linkedin: user.social_linkedin || "",
        social_facebook: user.social_facebook || "",
        meta_title: user.meta_title || "",
        meta_description: user.meta_description || "",
      });
    }
    setIsEditing(false);
    setMessage(null);
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!user) {
    return (
      <Layout>
        <div className="author-profile__loading">
          <p>Cargando perfil...</p>
        </div>
      </Layout>
    );
  }

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const specializations = [
    "journalism",
    "sports",
    "technology",
    "politics",
    "economy",
    "culture",
    "science",
    "health",
    "entertainment",
    "other",
  ];

  const specializationLabels: Record<string, string> = {
    journalism: "Periodismo General",
    sports: "Deportes",
    technology: "Tecnología",
    politics: "Política",
    economy: "Economía",
    culture: "Cultura",
    science: "Ciencia",
    health: "Salud",
    entertainment: "Entretenimiento",
    other: "Otro",
  };

  return (
    <Layout showBreakingNews={false}>
      <div className="author-profile">
        <div className="author-profile__container">
          {/* Header */}
          <div className="author-profile__header">
            <Button
              variant="ghost"
              onClick={() => navigate("/author/dashboard")}
              className="author-profile__back-btn"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>

            <div className="author-profile__header-content">
              <div className="author-profile__header-info">
                <h1 className="author-profile__title">Mi Perfil</h1>
                <p className="author-profile__subtitle">
                  Gestiona tu información personal y profesional
                </p>
              </div>

              <div className="author-profile__header-actions">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="author-profile__edit-btn"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                ) : (
                  <div className="author-profile__edit-actions">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="author-profile__save-btn"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isLoading ? "Guardando..." : "Guardar"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          {message && (
            <Alert
              className={`author-profile__alert ${
                message.type === "success"
                  ? "author-profile__alert--success"
                  : "author-profile__alert--error"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Profile Content */}
          <div className="author-profile__content">
            <Tabs defaultValue="personal" className="author-profile__tabs">
              <TabsList className="author-profile__tabs-list">
                <TabsTrigger value="personal" className="author-profile__tab">
                  <User className="h-4 w-4 mr-2" />
                  Información Personal
                </TabsTrigger>
                <TabsTrigger
                  value="professional"
                  className="author-profile__tab"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Información Profesional
                </TabsTrigger>
                <TabsTrigger value="social" className="author-profile__tab">
                  <Globe className="h-4 w-4 mr-2" />
                  Redes Sociales
                </TabsTrigger>
                <TabsTrigger value="seo" className="author-profile__tab">
                  <Globe className="h-4 w-4 mr-2" />
                  SEO
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="author-profile__avatar-section">
                      <div className="author-profile__avatar-container">
                        <Avatar className="author-profile__avatar">
                          <AvatarImage
                            src={formData.avatar_url}
                            alt={formData.name}
                          />
                          <AvatarFallback>{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="author-profile__avatar-btn"
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Cambiar Foto
                          </Button>
                        )}
                      </div>
                      <div className="author-profile__avatar-info">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        <Badge
                          variant={
                            user.status === "active" ? "default" : "secondary"
                          }
                        >
                          {user.status === "active" ? "Activo" : "Pendiente"}
                        </Badge>
                      </div>
                    </div>

                    {/* Name Field */}
                    <div className="author-profile__field">
                      <Label htmlFor="name">Nombre Completo</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Tu nombre completo"
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.name || "No especificado"}
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="author-profile__field">
                      <Label htmlFor="email">Email</Label>
                      <div className="author-profile__field-value author-profile__field-value--readonly">
                        <Mail className="h-4 w-4 mr-2" />
                        {user.email}
                        <span className="author-profile__readonly-note">
                          (No editable)
                        </span>
                      </div>
                    </div>

                    {/* Bio Field */}
                    <div className="author-profile__field">
                      <Label htmlFor="bio">Biografía</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) =>
                            handleInputChange("bio", e.target.value)
                          }
                          placeholder="Cuéntanos sobre ti..."
                          rows={4}
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.bio || "No especificada"}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Professional Information Tab */}
              <TabsContent value="professional">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Profesional</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Position Field */}
                    <div className="author-profile__field">
                      <Label htmlFor="position">Cargo/Posición</Label>
                      {isEditing ? (
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) =>
                            handleInputChange("position", e.target.value)
                          }
                          placeholder="Ej: Editor Senior, Periodista, etc."
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.position || "No especificado"}
                        </div>
                      )}
                    </div>

                    {/* Specialization Field */}
                    <div className="author-profile__field">
                      <Label htmlFor="specialization">Especialización</Label>
                      {isEditing ? (
                        <Select
                          value={formData.specialization}
                          onValueChange={(value) =>
                            handleInputChange("specialization", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una especialización" />
                          </SelectTrigger>
                          <SelectContent>
                            {specializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>
                                {specializationLabels[spec]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="author-profile__field-value">
                          {user.specialization
                            ? specializationLabels[user.specialization] ||
                              user.specialization
                            : "No especificada"}
                        </div>
                      )}
                    </div>

                    {/* Stats Section */}
                    <div className="author-profile__stats">
                      <h4 className="font-semibold mb-4">Estadísticas</h4>
                      <div className="author-profile__stats-grid">
                        <div className="author-profile__stat">
                          <div className="author-profile__stat-number">
                            {user.article_count || 0}
                          </div>
                          <div className="author-profile__stat-label">
                            Artículos
                          </div>
                        </div>
                        <div className="author-profile__stat">
                          <div className="author-profile__stat-number">
                            {user.total_views?.toLocaleString() || 0}
                          </div>
                          <div className="author-profile__stat-label">
                            Visualizaciones
                          </div>
                        </div>
                        <div className="author-profile__stat">
                          <div className="author-profile__stat-number">
                            {user.total_likes || 0}
                          </div>
                          <div className="author-profile__stat-label">
                            Me Gusta
                          </div>
                        </div>
                        <div className="author-profile__stat">
                          <div className="author-profile__stat-number">
                            {user.created_at
                              ? new Date(user.created_at).getFullYear()
                              : "N/A"}
                          </div>
                          <div className="author-profile__stat-label">
                            Miembro desde
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Social Media Tab */}
              <TabsContent value="social">
                <Card>
                  <CardHeader>
                    <CardTitle>Redes Sociales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Twitter */}
                    <div className="author-profile__field">
                      <Label htmlFor="twitter">
                        <Twitter className="h-4 w-4 mr-2 inline" />
                        Twitter
                      </Label>
                      {isEditing ? (
                        <Input
                          id="twitter"
                          value={formData.social_twitter}
                          onChange={(e) =>
                            handleInputChange("social_twitter", e.target.value)
                          }
                          placeholder="@tuusuario"
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.social_twitter ? (
                            <a
                              href={`https://twitter.com/${user.social_twitter.replace("@", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {user.social_twitter}
                            </a>
                          ) : (
                            "No especificado"
                          )}
                        </div>
                      )}
                    </div>

                    {/* Instagram */}
                    <div className="author-profile__field">
                      <Label htmlFor="instagram">
                        <Instagram className="h-4 w-4 mr-2 inline" />
                        Instagram
                      </Label>
                      {isEditing ? (
                        <Input
                          id="instagram"
                          value={formData.social_instagram}
                          onChange={(e) =>
                            handleInputChange(
                              "social_instagram",
                              e.target.value,
                            )
                          }
                          placeholder="@tuusuario"
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.social_instagram ? (
                            <a
                              href={`https://instagram.com/${user.social_instagram.replace("@", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-500 hover:underline"
                            >
                              {user.social_instagram}
                            </a>
                          ) : (
                            "No especificado"
                          )}
                        </div>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div className="author-profile__field">
                      <Label htmlFor="linkedin">
                        <Linkedin className="h-4 w-4 mr-2 inline" />
                        LinkedIn
                      </Label>
                      {isEditing ? (
                        <Input
                          id="linkedin"
                          value={formData.social_linkedin}
                          onChange={(e) =>
                            handleInputChange("social_linkedin", e.target.value)
                          }
                          placeholder="tu-perfil-linkedin"
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.social_linkedin ? (
                            <a
                              href={`https://linkedin.com/in/${user.social_linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {user.social_linkedin}
                            </a>
                          ) : (
                            "No especificado"
                          )}
                        </div>
                      )}
                    </div>

                    {/* Facebook */}
                    <div className="author-profile__field">
                      <Label htmlFor="facebook">
                        <Facebook className="h-4 w-4 mr-2 inline" />
                        Facebook
                      </Label>
                      {isEditing ? (
                        <Input
                          id="facebook"
                          value={formData.social_facebook}
                          onChange={(e) =>
                            handleInputChange("social_facebook", e.target.value)
                          }
                          placeholder="tu-perfil-facebook"
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.social_facebook ? (
                            <a
                              href={`https://facebook.com/${user.social_facebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:underline"
                            >
                              {user.social_facebook}
                            </a>
                          ) : (
                            "No especificado"
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimización SEO</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Meta Title */}
                    <div className="author-profile__field">
                      <Label htmlFor="meta_title">Título Meta</Label>
                      {isEditing ? (
                        <Input
                          id="meta_title"
                          value={formData.meta_title}
                          onChange={(e) =>
                            handleInputChange("meta_title", e.target.value)
                          }
                          placeholder="Título optimizado para SEO"
                          maxLength={60}
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.meta_title || "No especificado"}
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Recomendado: 50-60 caracteres
                      </p>
                    </div>

                    {/* Meta Description */}
                    <div className="author-profile__field">
                      <Label htmlFor="meta_description">Descripción Meta</Label>
                      {isEditing ? (
                        <Textarea
                          id="meta_description"
                          value={formData.meta_description}
                          onChange={(e) =>
                            handleInputChange(
                              "meta_description",
                              e.target.value,
                            )
                          }
                          placeholder="Descripción optimizada para SEO"
                          maxLength={160}
                          rows={3}
                        />
                      ) : (
                        <div className="author-profile__field-value">
                          {user.meta_description || "No especificada"}
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Recomendado: 150-160 caracteres
                      </p>
                    </div>

                    {/* Profile URL Preview */}
                    <div className="author-profile__field">
                      <Label>URL del Perfil</Label>
                      <div className="author-profile__field-value author-profile__field-value--readonly">
                        <Globe className="h-4 w-4 mr-2" />
                        {`https://enteratelo.com/autor/${user.slug || user.id}`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
