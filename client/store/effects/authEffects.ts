import { Middleware, AnyAction } from "@reduxjs/toolkit";

// Custom middleware for auth-related side effects
export const authEffectsMiddleware: Middleware =
  (store) => (next) => (action: AnyAction) => {
    const result = next(action);

    // Handle auth state changes
    if (action.type === "auth/loginUser/fulfilled") {
      // Auto-redirect or show welcome notification
      console.log("User logged in successfully");
    }

    if (action.type === "auth/registerUser/fulfilled") {
      // Show registration success message
      store.dispatch({
        type: "ui/showNotification/fulfilled",
        payload: {
          id: Date.now().toString(),
          type: "success",
          title: "Registro Exitoso",
          message:
            "Tu solicitud ha sido enviada. Te notificaremos cuando sea aprobada.",
          timestamp: new Date().toISOString(),
          read: false,
        },
      });
    }

    if (action.type === "auth/logoutUser/fulfilled") {
      // Clear sensitive data and redirect
      console.log("User logged out");
    }

    return result;
  };
