import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectAuth = (state: any) => state.auth;
export const selectUser = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: any) => state.auth.isLoading;
export const selectAuthError = (state: any) => state.auth.error;

// Memoized selectors
export const selectUserRole = createSelector(
  [selectUser],
  (user) => user?.role,
);

export const selectIsAuthor = createSelector(
  [selectUser],
  (user) => user?.role === "author",
);

export const selectIsAdmin = createSelector(
  [selectUser],
  (user) => user?.role === "admin",
);

export const selectUserSpecialty = createSelector(
  [selectUser],
  (user) => user?.specialty,
);

export const selectUserStatus = createSelector(
  [selectUser],
  (user) => user?.status,
);

export const selectIsActiveUser = createSelector(
  [selectUser],
  (user) => user?.status === "active",
);

export const selectIsPendingUser = createSelector(
  [selectUser],
  (user) => user?.status === "pending_review",
);
