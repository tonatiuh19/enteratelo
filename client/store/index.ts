import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "./reducers/authSlice.js";
import articlesReducer from "./reducers/articlesSlice.js";
import uiReducer from "./reducers/uiSlice.js";
import categoriesReducer from "./reducers/categoriesSlice.js";
import { authEffectsMiddleware, uiEffectsMiddleware } from "./effects";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesReducer,
    ui: uiReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(authEffectsMiddleware, uiEffectsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
