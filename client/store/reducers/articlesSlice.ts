import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesState, Article } from "../state/types";
import {
  fetchArticles,
  fetchArticleById,
  fetchArticleBySlug,
  fetchArticlesByAuthorId,
  createArticle,
  updateArticle,
  deleteArticle,
  insertArticle,
  hideArticle,
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
      // Fetch article by slug
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticle = action.payload;
        state.error = null;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
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
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Handle the new response structure with nested article
        if (action.payload.success && action.payload.article) {
          const updatedArticle = action.payload.article;
          const index = state.articles.findIndex(
            (article) => article.id === updatedArticle.id,
          );
          if (index !== -1) {
            state.articles[index] = updatedArticle;
          }
          if (state.currentArticle?.id === updatedArticle.id) {
            state.currentArticle = updatedArticle;
          }
          // Note: Articles will be refreshed via fetchArticlesByAuthorId dispatch in component
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
      })
      // Hide article
      .addCase(hideArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(hideArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Update the article status in the articles array
        const articleIndex = state.articles.findIndex(
          (article) => article.id === action.payload.articleId,
        );
        if (articleIndex !== -1) {
          state.articles[articleIndex].status = "archived";
        }
        // Update current article if it's the one being hidden
        if (state.currentArticle?.id === action.payload.articleId) {
          state.currentArticle.status = "archived";
        }
      })
      .addCase(hideArticle.rejected, (state, action) => {
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
