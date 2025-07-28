import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "../state/types";

export interface FetchArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  author?: string;
  search?: string;
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const article = mockArticles.find((article) => article.id === articleId);

      if (!article) {
        throw new Error("Artículo no encontrado");
      }

      return article;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al cargar artículo");
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

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (
    articleData: Partial<Article> & { id: string },
    { rejectWithValue },
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedArticle: Article = {
        ...mockArticles.find((a) => a.id === articleData.id)!,
        ...articleData,
        updatedAt: new Date().toISOString(),
      };

      return updatedArticle;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al actualizar artículo");
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
