import { RootState } from "../index";

export const selectAllCategories = (state: RootState) =>
  state.categories.categories;
export const selectCategoriesLoading = (state: RootState) =>
  state.categories.loading;
export const selectCategoriesError = (state: RootState) =>
  state.categories.error;

// Selector to get active categories sorted by sort_order
export const selectActiveCategories = (state: RootState) =>
  state.categories.categories
    .filter((category) => category.is_active === "1")
    .sort((a, b) => parseInt(a.sort_order) - parseInt(b.sort_order));
