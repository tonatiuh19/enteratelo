import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article, DOMAIN } from "../state/types";
import { AppDispatch, RootState } from "../index";
import axios from "axios";

export interface FetchArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  author?: string;
  search?: string;
}

export interface FetchArticlesByAuthorParams {
  authorId: string;
}

// Mock data service
const mockArticles: Article[] = [
  {
    id: "1",
    title: "El Futuro de la Tecnología en América Latina",
    slug: "futuro-tecnologia-america-latina",
    content: "Contenido del artículo...",
    excerpt:
      "Un análisis profundo sobre las tendencias tecnológicas en la región.",
    authorId: "author1",
    authorName: "Ana García",
    category: "technology",
    tags: ["tecnología", "américa latina", "innovación"],
    imageUrl: "/placeholder.svg",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "published",
    viewCount: 1250,
    featured: true,
  },
  // Add more mock articles as needed
];

// Fetch Article by Slug with real API call
export const fetchArticleBySlug = createAsyncThunk(
  "articles/fetchArticleBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      console.log("Fetching article by slug:", slug);

      const response = await axios.post(`${DOMAIN}/getArticleBySlug.php`, {
        slug: slug,
      });

      console.log("Fetch article by slug response:", response.data);

      if (response.data.success) {
        return response.data.article;
      } else {
        return rejectWithValue(response.data.error || "Artículo no encontrado");
      }
    } catch (error: any) {
      console.error("Error fetching article by slug:", error);
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Error al obtener artículo",
      );
    }
  },
);

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params: FetchArticlesParams = {}, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { page = 1, limit = 10, category, author, search } = params;

      let filteredArticles = [...mockArticles];

      // Apply filters
      if (category) {
        filteredArticles = filteredArticles.filter(
          (article) => article.category === category,
        );
      }

      if (author) {
        filteredArticles = filteredArticles.filter(
          (article) => article.authorId === author,
        );
      }

      if (search) {
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.content.toLowerCase().includes(search.toLowerCase()),
        );
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const paginatedArticles = filteredArticles.slice(
        startIndex,
        startIndex + limit,
      );

      return {
        articles: paginatedArticles,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredArticles.length / limit),
          totalItems: filteredArticles.length,
          itemsPerPage: limit,
        },
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al cargar artículos");
    }
  },
);

export const fetchArticleById = createAsyncThunk(
  "articles/fetchArticleById",
  async (articleId: string, { rejectWithValue }) => {
    try {
      console.log("Fetching article by ID:", articleId);

      const response = await axios.post(
        `${DOMAIN}/getArticleByAuthorId.php`,
        {
          article_id: articleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Article by ID response:", response.data);

      if (response.data.success) {
        if (!response.data.article) {
          return rejectWithValue("Artículo no encontrado");
        }
        return response.data.article;
      } else {
        return rejectWithValue(
          response.data.error || "Error al cargar artículo",
        );
      }
    } catch (error: any) {
      console.error("Error fetching article by ID:", error);
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Error al cargar artículo",
      );
    }
  },
);

export const fetchArticlesByAuthorId = createAsyncThunk(
  "articles/fetchArticlesByAuthorId",
  async (params: FetchArticlesByAuthorParams, { rejectWithValue }) => {
    try {
      console.log("Fetching articles for author ID:", params.authorId);

      const response = await axios.post(
        `${DOMAIN}/getArticlesByAuthorId.php`,
        {
          author_id: params.authorId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Articles by author response:", response.data);

      if (response.data.success) {
        return {
          articles: response.data.articles || [],
          authorId: params.authorId,
        };
      } else {
        return rejectWithValue(
          response.data.error || "Error al cargar artículos del autor",
        );
      }
    } catch (error: any) {
      console.error("Error fetching articles by author:", error);
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Error al cargar artículos del autor",
      );
    }
  },
);

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (
    articleData: Omit<
      Article,
      "id" | "publishedAt" | "updatedAt" | "viewCount"
    >,
    { rejectWithValue },
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newArticle: Article = {
        ...articleData,
        id: Math.random().toString(36).substr(2, 9),
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewCount: 0,
      };

      return newArticle;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al crear artículo");
    }
  },
);

// Update Article with real API call
export interface UpdateArticleParams {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_blocks: string;
  category_id: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url?: string;
  featured_image_caption?: string;
  gallery?: string;
  status: string;
  published_at?: string;
  scheduled_at?: string;
  is_featured: boolean;
  is_trending: boolean;
  is_breaking_news: boolean;
  is_editors_pick: boolean;
  tags: string[];
  external_source?: string;
  language?: string;
  featured_image?: File;
  content_images?: { [key: string]: File };
  image_url?: string;
}

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (articleData: UpdateArticleParams, { rejectWithValue, getState }) => {
    try {
      console.log("Updating article with data:", articleData);

      // Create FormData for multipart request
      const formData = new FormData();

      // Add article ID
      formData.append("id", articleData.id);

      // Add basic article data with null checking
      formData.append("title", articleData.title || "");
      formData.append("slug", articleData.slug || "");
      formData.append("excerpt", articleData.excerpt || "");
      formData.append("content", articleData.content || "");
      formData.append("content_blocks", articleData.content_blocks || "[]");
      formData.append(
        "category_id",
        articleData.category_id?.toString() || "0",
      );
      formData.append("meta_title", articleData.meta_title || "");
      formData.append("meta_description", articleData.meta_description || "");
      formData.append("meta_keywords", articleData.meta_keywords || "");
      formData.append("canonical_url", articleData.canonical_url || "");
      formData.append(
        "featured_image_caption",
        articleData.featured_image_caption || "",
      );
      formData.append("gallery", articleData.gallery || "[]");
      formData.append("status", articleData.status || "published");
      formData.append("published_at", articleData.published_at || "");
      formData.append("scheduled_at", articleData.scheduled_at || "");
      formData.append("is_featured", articleData.is_featured ? "1" : "0");
      formData.append("is_trending", articleData.is_trending ? "1" : "0");
      formData.append(
        "is_breaking_news",
        articleData.is_breaking_news ? "1" : "0",
      );
      formData.append(
        "is_editors_pick",
        articleData.is_editors_pick ? "1" : "0",
      );
      formData.append("tags", JSON.stringify(articleData.tags || []));
      formData.append("external_source", articleData.external_source || "");
      formData.append("language", articleData.language || "es");

      console.log("FormData entries for update:");
      for (let [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }

      // Add image URL if provided (for URL mode)
      if (articleData.image_url) {
        formData.append("image_url", articleData.image_url);
      }

      // Add featured image file if provided (for upload mode)
      if (articleData.featured_image) {
        formData.append("featured_image", articleData.featured_image);
      }

      // Add content images if provided
      if (articleData.content_images) {
        Object.entries(articleData.content_images).forEach(([key, file]) => {
          formData.append(key, file);
        });
      }

      const response = await axios.post(`${DOMAIN}/editArticle.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Edit article response:", response.data);

      if (response.data.success) {
        return {
          success: true,
          article: response.data.article,
          message: "Artículo actualizado exitosamente",
        };
      } else {
        return rejectWithValue(
          response.data.error || "Error al actualizar artículo",
        );
      }
    } catch (error: any) {
      console.error("Error updating article:", error);
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Error al actualizar artículo",
      );
    }
  },
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      return articleId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al eliminar artículo");
    }
  },
);

// Insert Article with real API call
export interface InsertArticleParams {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content_blocks: string;
  category_id: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url?: string;
  featured_image_caption?: string;
  gallery?: string;
  status: string;
  published_at?: string;
  scheduled_at?: string;
  is_featured: boolean;
  is_trending: boolean;
  is_breaking_news: boolean;
  is_editors_pick: boolean;
  tags: string[];
  external_source?: string;
  language?: string;
  featured_image?: File;
  content_images?: { [key: string]: File };
  image_url?: string;
}

export const insertArticle = createAsyncThunk(
  "articles/insertArticle",
  async (articleData: InsertArticleParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      console.log("Inserting article with data:", state);
      const user = state.auth.user;

      if (!user || (!user.id && !user.user_id)) {
        return rejectWithValue("Usuario no autenticado");
      }

      // Get author_id - prefer user_id if available, fallback to id
      const authorId = user.user_id || parseInt(user.id) || 0;
      if (!authorId) {
        return rejectWithValue("No se pudo obtener el ID del usuario");
      }

      console.log("User data:", { user, authorId });

      // Create FormData for multipart request
      const formData = new FormData();

      // Add basic article data with null checking
      formData.append("title", articleData.title || "");
      formData.append("slug", articleData.slug || "");
      formData.append("excerpt", articleData.excerpt || "");
      formData.append("content", articleData.content || "");
      formData.append("content_blocks", articleData.content_blocks || "[]");
      formData.append(
        "category_id",
        articleData.category_id?.toString() || "0",
      );
      formData.append("author_id", authorId.toString());
      formData.append("meta_title", articleData.meta_title || "");
      formData.append("meta_description", articleData.meta_description || "");
      formData.append("meta_keywords", articleData.meta_keywords || "");
      formData.append("canonical_url", articleData.canonical_url || "");
      formData.append(
        "featured_image_caption",
        articleData.featured_image_caption || "",
      );
      formData.append("gallery", articleData.gallery || "");
      formData.append("status", articleData.status || "draft");
      formData.append("published_at", articleData.published_at || "");
      formData.append("scheduled_at", articleData.scheduled_at || "");
      formData.append("is_featured", articleData.is_featured ? "1" : "0");
      formData.append("is_trending", articleData.is_trending ? "1" : "0");
      formData.append(
        "is_breaking_news",
        articleData.is_breaking_news ? "1" : "0",
      );
      formData.append(
        "is_editors_pick",
        articleData.is_editors_pick ? "1" : "0",
      );
      formData.append("tags", JSON.stringify(articleData.tags || []));
      formData.append("external_source", articleData.external_source || "");
      formData.append("language", articleData.language || "es");

      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(key, ":", value);
      }

      // Add image URL if provided (for URL mode)
      if (articleData.image_url) {
        formData.append("image_url", articleData.image_url);
      }

      // Add featured image file if provided (for upload mode)
      if (articleData.featured_image) {
        formData.append("featured_image", articleData.featured_image);
      }

      // Add content images if provided
      if (articleData.content_images) {
        Object.entries(articleData.content_images).forEach(([key, file]) => {
          formData.append(key, file);
        });
      }

      const response = await axios.post(
        `${DOMAIN}/insertArticle.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        return {
          success: true,
          articles: response.data.articles,
          message: "Artículo publicado exitosamente",
        };
      } else {
        return rejectWithValue(
          response.data.error || "Error al insertar artículo",
        );
      }
    } catch (error: any) {
      console.error("Error inserting article:", error);
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Error al insertar artículo",
      );
    }
  },
);

export const hideArticle = createAsyncThunk(
  "articles/hideArticle",
  async (articleId: string, { rejectWithValue }) => {
    try {
      console.log("Hiding article with ID:", articleId);

      const response = await axios.post(
        `${DOMAIN}/hideArticle.php`,
        {
          id: articleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Hide article response:", response.data);

      if (response.data.success) {
        return {
          success: true,
          articleId: articleId,
          message: "Artículo ocultado exitosamente",
        };
      } else {
        return rejectWithValue(
          response.data.error || "Error al ocultar artículo",
        );
      }
    } catch (error: any) {
      console.error("Error hiding article:", error);
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Error al ocultar artículo",
      );
    }
  },
);
