import { Middleware, AnyAction } from "@reduxjs/toolkit";

// Custom middleware for UI-related side effects
export const uiEffectsMiddleware: Middleware =
  (store) => (next) => (action: AnyAction) => {
    const result = next(action);

    // Handle theme changes
    if (action.type === "ui/saveThemePreference/fulfilled") {
      // Apply theme to document
      document.documentElement.setAttribute("data-theme", action.payload);
    }

    // Auto-remove notifications after delay
    if (action.type === "ui/showNotification/fulfilled") {
      setTimeout(() => {
        store.dispatch({
          type: "ui/removeNotification",
          payload: action.payload.id,
        });
      }, 5000); // Remove after 5 seconds
    }

    return result;
  };
