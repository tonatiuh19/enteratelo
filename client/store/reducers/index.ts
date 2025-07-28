// Export default slices for store configuration
export { default as authSlice } from "./authSlice";
export { default as articlesSlice } from "./articlesSlice";
export { default as uiSlice } from "./uiSlice";
export { default as categoriesSlice } from "./categoriesSlice";

// Export named exports with prefixes to avoid conflicts
export * as AuthActions from "./authSlice";
export * as ArticlesActions from "./articlesSlice";
export * as UIActions from "./uiSlice";
export * as CategoriesActions from "./categoriesSlice";
