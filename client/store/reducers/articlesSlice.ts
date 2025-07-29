import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState, Article } from "../state/types";
import {
  fetchArticles,
  fetchArticleById,
  fetchArticlesByAuthorId,
  createArticle,
  updateArticle,
  deleteArticle,
  insertArticle,
} from "../actions/articlesActions";

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  categories: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    },
    incrementViewCount: (state, action: PayloadAction<string>) => {
      const article = state.articles.find(
        (article) => article.id === action.payload,
      );
      if (article) {
        article.viewCount += 1;
      }
      if (state.currentArticle?.id === action.payload) {
        state.currentArticle.viewCount += 1;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch articles
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch article by ID
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticle = action.payload;
        state.error = null;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch articles by author ID
      .addCase(fetchArticlesByAuthorId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticlesByAuthorId.fulfilled, (state, action) => {
        state.isLoading = false;
        // Replace articles with the author's articles
        state.articles = action.payload.articles;
        state.error = null;
      })
      .addCase(fetchArticlesByAuthorId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create article
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles.unshift(action.payload);
        state.error = null;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update article
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(
          (article) => article.id === action.payload.id,
        );
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        if (state.currentArticle?.id === action.payload.id) {
          state.currentArticle = action.payload;
        }
      })
      // Delete article
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article.id !== action.payload,
        );
        if (state.currentArticle?.id === action.payload) {
          state.currentArticle = null;
        }
      })
      // Insert article
      .addCase(insertArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Update articles list with the new articles from API response
        if (action.payload.articles) {
          state.articles = action.payload.articles;
        }
      })
      .addCase(insertArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCategories,
  clearCurrentArticle,
  incrementViewCount,
  clearError,
} = articlesSlice.actions;

export default articlesSlice.reducer;
