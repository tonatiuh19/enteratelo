import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/store/selectors/authSelectors";
import { selectActiveCategories } from "@/store/selectors/categoriesSelectors";
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
import { ArrowLeft, Save, Eye, Upload, X, Link, ImageIcon } from "lucide-react";
import { RichContentEditor } from "@/components/RichContentEditor/RichContentEditor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ArticlePage from "@/pages/ArticlePage/ArticlePage";
import { Article } from "@/services/data.service";
import "./NewArticle.css";

export default function NewArticle() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const categories = useAppSelector(selectActiveCategories);

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    image_url: "",
    featured_image_caption: "",
    is_breaking: false,
    is_trending: false,
    publish_datetime: "",
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
  });

  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploadMode, setImageUploadMode] = useState<"url" | "upload">(
    "url",
  );
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setArticleData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Special handler for exclusive checkbox selection
  const handleExclusiveCheckbox = (
    field: "is_breaking" | "is_trending",
    value: boolean,
  ) => {
    if (value) {
      // If checking one, uncheck the other
      if (field === "is_breaking") {
        setArticleData((prev) => ({
          ...prev,
          is_breaking: true,
          is_trending: false,
        }));
      } else {
        setArticleData((prev) => ({
          ...prev,
          is_trending: true,
          is_breaking: false,
        }));
      }
    } else {
      // If unchecking, just update the field
      setArticleData((prev) => ({
        ...prev,
        [field]: false,
      }));
    }

    // Clear related errors
    if (errors[field] || errors.publish_datetime) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
        publish_datetime: "",
      }));
    }
  };

  // Handle image file upload
  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setUploadedImageFile(file);

      // Create a temporary URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("image_url", result);
      };
      reader.readAsDataURL(file);

      // Clear any existing errors
      if (errors.image_url) {
        setErrors((prev) => ({
          ...prev,
          image_url: "",
        }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        image_url: "Por favor selecciona un archivo de imagen válido",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required field validations
    if (!articleData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    } else if (articleData.title.trim().length < 10) {
      newErrors.title = "El título debe tener al menos 10 caracteres";
    }

    if (!articleData.excerpt.trim()) {
      newErrors.excerpt = "El extracto es obligatorio";
    } else if (articleData.excerpt.trim().length < 50) {
      newErrors.excerpt = "El extracto debe tener al menos 50 caracteres";
    }

    if (!articleData.category) {
      newErrors.category = "La categoría es obligatoria";
    }

    if (contentBlocks.length === 0) {
      newErrors.content = "El contenido del artículo es obligatorio";
    }

    // Image is now required (either URL or uploaded file)
    if (imageUploadMode === "url") {
      if (!articleData.image_url.trim()) {
        newErrors.image_url = "La imagen principal es obligatoria";
      } else {
        const urlPattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
        if (
          !urlPattern.test(articleData.image_url) &&
          !articleData.image_url.startsWith("data:image/")
        ) {
          newErrors.image_url =
            "Debe ser una URL válida de imagen (jpg, jpeg, png, webp, gif)";
        }
      }
    } else {
      if (!uploadedImageFile && !articleData.image_url) {
        newErrors.image_url = "Por favor sube una imagen o proporciona una URL";
      }
    }

    // Publish datetime is required if neither breaking news nor trending
    if (
      !articleData.is_breaking &&
      !articleData.is_trending &&
      !articleData.publish_datetime.trim()
    ) {
      newErrors.publish_datetime =
        "La fecha y hora de publicación es obligatoria";
    }

    // SEO fields are now required
    if (!articleData.seo_title.trim()) {
      newErrors.seo_title = "El título SEO es obligatorio";
    } else if (articleData.seo_title.length > 60) {
      newErrors.seo_title = "El título SEO no debe exceder 60 caracteres";
    }

    if (!articleData.seo_description.trim()) {
      newErrors.seo_description = "La descripción SEO es obligatoria";
    } else if (articleData.seo_description.length > 160) {
      newErrors.seo_description =
        "La descripción SEO no debe exceder 160 caracteres";
    }

    if (!articleData.seo_keywords.trim()) {
      newErrors.seo_keywords = "Las palabras clave SEO son obligatorias";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  // Convert content blocks to HTML string
  const convertContentBlocksToHTML = () => {
    if (!contentBlocks || contentBlocks.length === 0) {
      return "";
    }

    return contentBlocks
      .map((block) => {
        // Handle different content structures from RichContentEditor
        let content = "";
        let formatting: any = {};

        if (typeof block.content === "string") {
          content = block.content;
        } else if (
          typeof block.content === "object" &&
          block.content !== null
        ) {
          // Extract text content and formatting from RichContentEditor structure
          content =
            block.content.text || block.content.value || String(block.content);
          formatting = block.content;
        } else {
          content = String(block.content || "");
        }

        switch (block.type) {
          case "text":
            // Handle text formatting from the rich editor
            let textStyle = "line-height: 1.6;";

            // Apply formatting from RichContentEditor
            if (formatting.fontSize)
              textStyle += ` font-size: ${formatting.fontSize}px;`;
            if (formatting.fontWeight && formatting.fontWeight !== "normal")
              textStyle += ` font-weight: ${formatting.fontWeight};`;
            if (formatting.fontStyle && formatting.fontStyle !== "normal")
              textStyle += ` font-style: ${formatting.fontStyle};`;
            if (
              formatting.textDecoration &&
              formatting.textDecoration !== "none"
            )
              textStyle += ` text-decoration: ${formatting.textDecoration};`;
            if (formatting.textAlign)
              textStyle += ` text-align: ${formatting.textAlign};`;
            if (formatting.color && formatting.color !== "#000000")
              textStyle += ` color: ${formatting.color};`;
            if (formatting.marginTop)
              textStyle += ` margin-top: ${formatting.marginTop}px;`;
            if (formatting.marginBottom)
              textStyle += ` margin-bottom: ${formatting.marginBottom}px;`;
            if (formatting.lineHeight)
              textStyle += ` line-height: ${formatting.lineHeight};`;

            // Handle line breaks properly - preserve manual <br> tags and convert newlines
            const processedContent = content
              .replace(/\n/g, "<br>") // Convert newlines to <br>
              .replace(/<br>\s*<br>/g, "<br>"); // Clean up double line breaks

            return `<p style="${textStyle}">${processedContent}</p>`;

          case "quote":
            let quoteStyle =
              "border-left: 4px solid #3b82f6; padding-left: 16px; margin: 24px 0; font-style: italic; color: #374151;";

            // Apply quote-specific formatting
            if (formatting.fontSize)
              quoteStyle += ` font-size: ${formatting.fontSize}px;`;
            if (formatting.textAlign)
              quoteStyle += ` text-align: ${formatting.textAlign};`;
            if (formatting.marginTop)
              quoteStyle += ` margin-top: ${formatting.marginTop}px;`;
            if (formatting.marginBottom)
              quoteStyle += ` margin-bottom: ${formatting.marginBottom}px;`;
            if (formatting.backgroundColor)
              quoteStyle += ` background-color: ${formatting.backgroundColor}; padding: 16px; border-radius: 8px;`;

            let quoteHtml = `<blockquote style="${quoteStyle}">
              "${content}"`;

            if (formatting.author) {
              quoteHtml += `<cite style="display: block; margin-top: 12px; font-size: 14px; color: #64748b;">— ${formatting.author}</cite>`;
            }

            if (formatting.source) {
              quoteHtml += `<span style="display: block; margin-top: 8px; font-size: 12px; color: #94a3b8;">${formatting.source}</span>`;
            }

            quoteHtml += `</blockquote>`;
            return quoteHtml;

          case "image":
            const imageUrl = formatting.url || content;
            return `<div style="margin: 24px 0; text-align: center;">
              <img src="${imageUrl}" alt="${formatting.alt || "Article image"}" style="max-width: 100%; height: auto; border-radius: 8px;" />
              ${formatting.caption ? `<p style="margin-top: 8px; font-size: 14px; color: #64748b; font-style: italic;">${formatting.caption}</p>` : ""}
            </div>`;

          case "video":
            const videoUrl = formatting.url || content;
            return `<div style="margin: 24px 0; text-align: center;">
              <video controls style="max-width: 100%; height: auto; border-radius: 8px;">
                <source src="${videoUrl}" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              ${formatting.caption ? `<p style="margin-top: 8px; font-size: 14px; color: #64748b; font-style: italic;">${formatting.caption}</p>` : ""}
            </div>`;

          case "html":
            return formatting.code || content;

          case "social_twitter":
          case "social_instagram":
          case "social_youtube":
          case "social_facebook":
            const platform = block.type.replace("social_", "");
            const socialUrl = formatting.url || content;
            const embedCode = formatting.embedCode;

            if (embedCode) {
              return `<div style="margin: 24px 0; text-align: center;">${embedCode}</div>`;
            } else {
              return `<div style="border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 16px 0; background: #f8fafc;">
                <p style="margin: 0 0 8px 0;"><strong>📱 ${platform.charAt(0).toUpperCase() + platform.slice(1)} Embed:</strong></p>
                <a href="${socialUrl}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none;">${socialUrl}</a>
              </div>`;
            }

          case "embed":
            const embedCodeGeneral = formatting.embedCode || formatting.code;
            if (embedCodeGeneral) {
              return `<div style="margin: 24px 0; text-align: center;">${embedCodeGeneral}</div>`;
            } else {
              return `<div style="border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin: 16px 0; background: #f8fafc;">
                <p style="margin: 0;"><strong>📎 Embed:</strong> ${formatting.url || content}</p>
              </div>`;
            }

          default:
            // For any unknown block types, just render as paragraph
            return `<p style="margin-bottom: 16px; line-height: 1.6;">${content}</p>`;
        }
      })
      .join("");
  };

  const handleSaveDraft = () => {
    const htmlContent = convertContentBlocksToHTML();
    const articleWithContent = {
      ...articleData,
      content: htmlContent, // Save as HTML string instead of JSON
      content_blocks: JSON.stringify(contentBlocks), // Keep original blocks for editing
      tags: tagsList,
      status: "draft",
    };
    console.log("Saving draft...", articleWithContent);
    console.log("Content as HTML:", htmlContent);
    // TODO: Implement actual save draft API call
  };

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) {
      console.log("Validation failed:", errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const htmlContent = convertContentBlocksToHTML();
      const articleWithContent = {
        ...articleData,
        content: htmlContent, // Save as HTML string instead of JSON
        content_blocks: JSON.stringify(contentBlocks), // Keep original blocks for editing
        tags: tagsList,
        status: "published",
        published_at: new Date().toISOString(),
      };

      console.log("Publishing article successfully:", articleWithContent);
      console.log("Article validation passed!");
      console.log("Content as HTML:", htmlContent);
      console.log("Content blocks (for editing):", contentBlocks);
      console.log("Tags:", tagsList);

      // TODO: Implement actual publish API call
      // await publishArticleAPI(articleWithContent);

      // Reset form or redirect on success
      // navigate("/author/dashboard");
    } catch (error) {
      console.error("Error publishing article:", error);
      // Handle error (show notification, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview Component
  const ArticlePreview = () => {
    // Create a mock article object based on current form data
    const previewArticle: Article = {
      id: "preview",
      title: articleData.title || "Título del artículo",
      excerpt: articleData.excerpt || "Extracto del artículo",
      content: convertContentBlocksToHTML(),
      category: articleData.category || "general",
      author: "Vista Previa", // This would come from the authenticated user
      authorBio: "Autor de la vista previa",
      authorAvatar: "",
      publishedAt: new Date().toISOString(),
      imageUrl:
        articleData.image_url ||
        "https://via.placeholder.com/800x400?text=Imagen+Principal",
      imageCaption: "Imagen principal del artículo",
      readTime: Math.max(1, Math.ceil(contentBlocks.length * 0.5)), // Estimate read time
      views: 0,
      likes: 0,
      featured: articleData.is_breaking,
      trending: articleData.is_trending,
      tags: tagsList,
      metaDescription: articleData.seo_description || articleData.excerpt,
      metaKeywords: articleData.seo_keywords
        ? articleData.seo_keywords.split(",").map((k) => k.trim())
        : tagsList,
    };

    return (
      <div
        className="article-preview-wrapper"
        style={{
          maxHeight: "80vh",
          overflow: "auto",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
        }}
      >
        {/* Simple preview for now - we'll create a dedicated preview component */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "white",
            margin: "16px",
            borderRadius: "8px",
          }}
        >
          {articleData.is_breaking && (
            <Badge variant="destructive" style={{ marginBottom: "16px" }}>
              🚨 ÚLTIMO MOMENTO
            </Badge>
          )}

          {articleData.is_trending && (
            <Badge
              style={{
                backgroundColor: "#f59e0b",
                color: "white",
                marginBottom: "16px",
              }}
            >
              🔥 TRENDING
            </Badge>
          )}

          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#1e293b",
              lineHeight: "1.2",
            }}
          >
            {articleData.title || "Título del artículo"}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
              paddingBottom: "16px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <Badge style={{ backgroundColor: "#3b82f6", color: "white" }}>
              {articleData.category || "Categoría"}
            </Badge>
            <span style={{ color: "#64748b", fontSize: "14px" }}>
              Vista Previa • {new Date().toLocaleDateString()}
            </span>
          </div>

          {articleData.image_url && (
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <img
                src={articleData.image_url}
                alt="Imagen principal"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
              {articleData.featured_image_caption && (
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: "#64748b",
                    fontStyle: "italic",
                  }}
                >
                  {articleData.featured_image_caption}
                </p>
              )}
            </div>
          )}

          <p
            style={{
              fontSize: "1.25rem",
              color: "#64748b",
              marginBottom: "32px",
              lineHeight: "1.6",
              fontStyle: "italic",
            }}
          >
            {articleData.excerpt || "Extracto del artículo"}
          </p>

          <div
            style={{
              fontSize: "16px",
              lineHeight: "1.7",
              color: "#374151",
            }}
            dangerouslySetInnerHTML={{
              __html:
                convertContentBlocksToHTML() ||
                '<p style="color: #64748b; font-style: italic;">El contenido del artículo aparecerá aquí cuando agregues bloques de contenido...</p>',
            }}
          />

          {tagsList.length > 0 && (
            <div
              style={{
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <h4
                style={{
                  marginBottom: "12px",
                  color: "#374151",
                  fontWeight: "600",
                }}
              >
                Etiquetas:
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {tagsList.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#f1f5f9",
                      color: "#475569",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
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
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="new-article__draft-btn"
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Borrador
              </Button>
              <Button
                variant="outline"
                onClick={handlePreview}
                className="new-article__preview-btn"
                disabled={
                  !articleData.title ||
                  !articleData.excerpt ||
                  !articleData.category
                }
              >
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              <Button
                onClick={handlePublish}
                className="new-article__publish-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publicando..." : "Publicar Artículo"}
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
                      className={`new-article__input ${errors.title ? "border-red-500" : ""}`}
                    />
                    {errors.title && (
                      <span className="text-red-500 text-sm">
                        {errors.title}
                      </span>
                    )}
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
                      className={`new-article__textarea ${errors.excerpt ? "border-red-500" : ""}`}
                      rows={3}
                    />
                    {errors.excerpt && (
                      <span className="text-red-500 text-sm">
                        {errors.excerpt}
                      </span>
                    )}
                  </div>

                  <div className="new-article__field">
                    <Label htmlFor="content" className="new-article__label">
                      Contenido del Artículo *
                    </Label>
                    <RichContentEditor
                      initialContent={contentBlocks}
                      onChange={setContentBlocks}
                      autoLineBreak={true}
                    />
                    {errors.content && (
                      <span className="text-red-500 text-sm">
                        {errors.content}
                      </span>
                    )}
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
                      Título SEO&nbsp;
                      <span style={{ color: "#ef4444", display: "inline" }}>
                        *
                      </span>
                    </Label>
                    <Input
                      id="seo_title"
                      value={articleData.seo_title}
                      onChange={(e) =>
                        handleInputChange("seo_title", e.target.value)
                      }
                      placeholder="Título optimizado para buscadores..."
                      className={`new-article__input ${errors.seo_title ? "border-red-500" : ""}`}
                    />
                    <span className="text-xs text-gray-500">
                      {articleData.seo_title.length}/60 caracteres
                    </span>
                    {errors.seo_title && (
                      <span className="text-red-500 text-sm">
                        {errors.seo_title}
                      </span>
                    )}
                  </div>

                  <div className="new-article__field">
                    <Label
                      htmlFor="seo_description"
                      className="new-article__label"
                    >
                      Descripción SEO&nbsp;
                      <span style={{ color: "#ef4444", display: "inline" }}>
                        *
                      </span>
                    </Label>
                    <Textarea
                      id="seo_description"
                      value={articleData.seo_description}
                      onChange={(e) =>
                        handleInputChange("seo_description", e.target.value)
                      }
                      placeholder="Descripción meta para buscadores..."
                      className={`new-article__textarea ${errors.seo_description ? "border-red-500" : ""}`}
                      rows={3}
                    />
                    <span className="text-xs text-gray-500">
                      {articleData.seo_description.length}/160 caracteres
                    </span>
                    {errors.seo_description && (
                      <span className="text-red-500 text-sm">
                        {errors.seo_description}
                      </span>
                    )}
                  </div>

                  <div className="new-article__field">
                    <Label
                      htmlFor="seo_keywords"
                      className="new-article__label"
                    >
                      Palabras Clave SEO&nbsp;
                      <span style={{ color: "#ef4444", display: "inline" }}>
                        *
                      </span>
                    </Label>
                    <Input
                      id="seo_keywords"
                      value={articleData.seo_keywords}
                      onChange={(e) =>
                        handleInputChange("seo_keywords", e.target.value)
                      }
                      placeholder="palabras, clave, separadas, por, comas"
                      className={`new-article__input ${errors.seo_keywords ? "border-red-500" : ""}`}
                    />
                    {errors.seo_keywords && (
                      <span className="text-red-500 text-sm">
                        {errors.seo_keywords}
                      </span>
                    )}
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
                      <SelectTrigger
                        className={`new-article__select ${errors.category ? "border-red-500" : ""}`}
                      >
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <span className="text-red-500 text-sm">
                        {errors.category}
                      </span>
                    )}
                  </div>

                  <div className="new-article__field">
                    <Label htmlFor="image_url" className="new-article__label">
                      Imagen Principal&nbsp;
                      <span style={{ color: "#ef4444", display: "inline" }}>
                        *
                      </span>
                    </Label>

                    {/* Image mode toggle */}
                    <div className="flex gap-2 mb-3">
                      <Button
                        type="button"
                        variant={
                          imageUploadMode === "url" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setImageUploadMode("url");
                          setUploadedImageFile(null);
                          if (articleData.image_url.startsWith("data:image/")) {
                            handleInputChange("image_url", "");
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <Link className="h-4 w-4" />
                        URL
                      </Button>
                      <Button
                        type="button"
                        variant={
                          imageUploadMode === "upload" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setImageUploadMode("upload")}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Subir Archivo
                      </Button>
                    </div>

                    {imageUploadMode === "url" ? (
                      <Input
                        id="image_url"
                        value={articleData.image_url}
                        onChange={(e) =>
                          handleInputChange("image_url", e.target.value)
                        }
                        placeholder="https://ejemplo.com/imagen.jpg"
                        className={`new-article__input ${errors.image_url ? "border-red-500" : ""}`}
                      />
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file);
                            }
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {uploadedImageFile && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <ImageIcon className="h-4 w-4" />
                            {uploadedImageFile.name}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setUploadedImageFile(null);
                                handleInputChange("image_url", "");
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {errors.image_url && (
                      <span className="text-red-500 text-sm">
                        {errors.image_url}
                      </span>
                    )}

                    {/* Image preview */}
                    {articleData.image_url && (
                      <div className="mt-3">
                        <img
                          src={articleData.image_url}
                          alt="Vista previa"
                          className="max-w-full h-32 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="new-article__field">
                    <Label
                      htmlFor="featured_image_caption"
                      className="new-article__label"
                    >
                      Pie de foto de la imagen principal
                    </Label>
                    <Input
                      id="featured_image_caption"
                      value={articleData.featured_image_caption}
                      onChange={(e) =>
                        handleInputChange(
                          "featured_image_caption",
                          e.target.value,
                        )
                      }
                      placeholder="Ejemplo: Foto cortesía de NASA"
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
                          handleExclusiveCheckbox(
                            "is_breaking",
                            e.target.checked,
                          )
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

                  <div className="new-article__field">
                    <div className="new-article__checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="is_trending"
                        checked={articleData.is_trending}
                        onChange={(e) =>
                          handleExclusiveCheckbox(
                            "is_trending",
                            e.target.checked,
                          )
                        }
                        className="new-article__checkbox"
                      />
                      <Label
                        htmlFor="is_trending"
                        className="new-article__checkbox-label"
                      >
                        Noticia Trending
                      </Label>
                    </div>
                  </div>

                  {/* Conditional datetime field - only show if neither breaking nor trending */}
                  {!articleData.is_breaking && !articleData.is_trending && (
                    <div className="new-article__field">
                      <Label
                        htmlFor="publish_datetime"
                        className="new-article__label"
                      >
                        Fecha y hora de publicación&nbsp;
                        <span style={{ color: "#ef4444", display: "inline" }}>
                          *
                        </span>
                      </Label>
                      <input
                        type="datetime-local"
                        id="publish_datetime"
                        value={articleData.publish_datetime}
                        onChange={(e) =>
                          handleInputChange("publish_datetime", e.target.value)
                        }
                        className={`new-article__input ${
                          errors.publish_datetime ? "border-red-500" : ""
                        }`}
                      />
                      {errors.publish_datetime && (
                        <span className="text-red-500 text-sm">
                          {errors.publish_datetime}
                        </span>
                      )}
                    </div>
                  )}
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

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl">
                Vista Previa del Artículo
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[85vh]">
              <ArticlePreview />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
