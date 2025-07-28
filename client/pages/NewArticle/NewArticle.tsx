import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/store/selectors/authSelectors";
import { Layout } from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ArrowLeft, Save, Eye, Upload, X } from "lucide-react";
import "./NewArticle.css";

export default function NewArticle() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    image_url: "",
    is_breaking: false,
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  const [tagsList, setTagsList] = useState<string[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const categories = [
    "Política",
    "Economía",
    "Deportes",
    "Tecnología",
    "Entretenimiento",
    "Salud",
    "Ciencia",
    "Cultura",
    "Internacional",
    "Nacional",
    "Local",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setArticleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (
      articleData.tags.trim() &&
      !tagsList.includes(articleData.tags.trim())
    ) {
      setTagsList((prev) => [...prev, articleData.tags.trim()]);
      setArticleData((prev) => ({ ...prev, tags: "" }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTagsList((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSaveDraft = () => {
    // TODO: Implement save draft functionality
    console.log("Saving draft...", { ...articleData, tags: tagsList });
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality
    console.log("Opening preview...", { ...articleData, tags: tagsList });
  };

  const handlePublish = () => {
    // TODO: Implement publish functionality
    console.log("Publishing article...", { ...articleData, tags: tagsList });
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="new-article__loading">
          <p>Verificando autenticación...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBreakingNews={false}>
      <div className="new-article">
        <div className="new-article__container">
          {/* Header */}
          <div className="new-article__header">
            <div className="new-article__header-left">
              <Button
                variant="outline"
                onClick={() => navigate("/author/dashboard")}
                className="new-article__back-btn"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
              <h1 className="new-article__title">Crear Nuevo Artículo</h1>
            </div>
            <div className="new-article__header-actions">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Borrador
              </Button>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Button
                onClick={handlePublish}
                className="new-article__publish-btn"
              >
                Publicar Artículo
              </Button>
            </div>
          </div>

          <div className="new-article__content">
            {/* Main Content */}
            <div className="new-article__main">
              <Card className="new-article__card">
                <CardHeader>
                  <CardTitle>Contenido del Artículo</CardTitle>
                </CardHeader>
                <CardContent className="new-article__card-content">
                  <div className="new-article__field">
                    <Label htmlFor="title" className="new-article__label">
                      Título del Artículo *
                    </Label>
                    <Input
                      id="title"
                      value={articleData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Ingresa un título llamativo..."
                      className="new-article__input"
                    />
                  </div>

                  <div className="new-article__field">
                    <Label htmlFor="excerpt" className="new-article__label">
                      Extracto/Resumen *
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={articleData.excerpt}
                      onChange={(e) =>
                        handleInputChange("excerpt", e.target.value)
                      }
                      placeholder="Escribe un breve resumen del artículo..."
                      className="new-article__textarea"
                      rows={3}
                    />
                  </div>

                  <div className="new-article__field">
                    <Label htmlFor="content" className="new-article__label">
                      Contenido del Artículo *
                    </Label>
                    <Textarea
                      id="content"
                      value={articleData.content}
                      onChange={(e) =>
                        handleInputChange("content", e.target.value)
                      }
                      placeholder="Escribe el contenido completo del artículo..."
                      className="new-article__textarea new-article__content-textarea"
                      rows={15}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card className="new-article__card">
                <CardHeader>
                  <CardTitle>Configuración SEO</CardTitle>
                </CardHeader>
                <CardContent className="new-article__card-content">
                  <div className="new-article__field">
                    <Label htmlFor="seo_title" className="new-article__label">
                      Título SEO
                    </Label>
                    <Input
                      id="seo_title"
                      value={articleData.seo_title}
                      onChange={(e) =>
                        handleInputChange("seo_title", e.target.value)
                      }
                      placeholder="Título optimizado para buscadores..."
                      className="new-article__input"
                    />
                  </div>

                  <div className="new-article__field">
                    <Label
                      htmlFor="seo_description"
                      className="new-article__label"
                    >
                      Descripción SEO
                    </Label>
                    <Textarea
                      id="seo_description"
                      value={articleData.seo_description}
                      onChange={(e) =>
                        handleInputChange("seo_description", e.target.value)
                      }
                      placeholder="Descripción meta para buscadores..."
                      className="new-article__textarea"
                      rows={3}
                    />
                  </div>

                  <div className="new-article__field">
                    <Label
                      htmlFor="seo_keywords"
                      className="new-article__label"
                    >
                      Palabras Clave SEO
                    </Label>
                    <Input
                      id="seo_keywords"
                      value={articleData.seo_keywords}
                      onChange={(e) =>
                        handleInputChange("seo_keywords", e.target.value)
                      }
                      placeholder="palabras, clave, separadas, por, comas"
                      className="new-article__input"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="new-article__sidebar">
              <Card className="new-article__card">
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                </CardHeader>
                <CardContent className="new-article__card-content">
                  <div className="new-article__field">
                    <Label htmlFor="category" className="new-article__label">
                      Categoría *
                    </Label>
                    <Select
                      value={articleData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger className="new-article__select">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="new-article__field">
                    <Label htmlFor="image_url" className="new-article__label">
                      URL de Imagen Principal
                    </Label>
                    <Input
                      id="image_url"
                      value={articleData.image_url}
                      onChange={(e) =>
                        handleInputChange("image_url", e.target.value)
                      }
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="new-article__input"
                    />
                  </div>

                  <div className="new-article__field">
                    <div className="new-article__checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="is_breaking"
                        checked={articleData.is_breaking}
                        onChange={(e) =>
                          handleInputChange("is_breaking", e.target.checked)
                        }
                        className="new-article__checkbox"
                      />
                      <Label
                        htmlFor="is_breaking"
                        className="new-article__checkbox-label"
                      >
                        Noticia de Último Momento
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="new-article__card">
                <CardHeader>
                  <CardTitle>Etiquetas</CardTitle>
                </CardHeader>
                <CardContent className="new-article__card-content">
                  <div className="new-article__field">
                    <Label htmlFor="tags" className="new-article__label">
                      Agregar Etiquetas
                    </Label>
                    <div className="new-article__tag-input-wrapper">
                      <Input
                        id="tags"
                        value={articleData.tags}
                        onChange={(e) =>
                          handleInputChange("tags", e.target.value)
                        }
                        onKeyPress={handleKeyPress}
                        placeholder="Escribe una etiqueta y presiona Enter"
                        className="new-article__input"
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        size="sm"
                        className="new-article__add-tag-btn"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>

                  <div className="new-article__tags-list">
                    {tagsList.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="new-article__tag"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="new-article__tag-remove"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
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
