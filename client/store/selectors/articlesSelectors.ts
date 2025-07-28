import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectArticles = (state: any) => state.articles;
export const selectAllArticles = (state: any) => state.articles.articles;
export const selectCurrentArticle = (state: any) =>
  state.articles.currentArticle;
export const selectArticlesLoading = (state: any) => state.articles.isLoading;
export const selectArticlesError = (state: any) => state.articles.error;
export const selectCategories = (state: any) => state.articles.categories;
export const selectPagination = (state: any) => state.articles.pagination;

// Memoized selectors
export const selectFeaturedArticles = createSelector(
  [selectAllArticles],
  (articles) =>
    articles.filter(
      (article: any) => article.featured && article.status === "published",
    ),
);

export const selectPublishedArticles = createSelector(
  [selectAllArticles],
  (articles) =>
    articles.filter((article: any) => article.status === "published"),
);

export const selectArticlesByCategory = createSelector(
  [selectAllArticles, (state: any, category: string) => category],
  (articles, category) =>
    articles.filter(
      (article: any) =>
        article.category === category && article.status === "published",
    ),
);

export const selectArticlesByAuthor = createSelector(
  [selectAllArticles, (state: any, authorId: string) => authorId],
  (articles, authorId) =>
    articles.filter((article: any) => article.authorId === authorId),
);

export const selectLatestArticles = createSelector(
  [selectPublishedArticles],
  (articles) =>
    [...articles]
      .sort(
        (a: any, b: any) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .slice(0, 10),
);

export const selectMostViewedArticles = createSelector(
  [selectPublishedArticles],
  (articles) =>
    [...articles]
      .sort((a: any, b: any) => b.viewCount - a.viewCount)
      .slice(0, 10),
);

export const selectArticleById = createSelector(
  [selectAllArticles, (state: any, articleId: string) => articleId],
  (articles, articleId) =>
    articles.find((article: any) => article.id === articleId),
);
