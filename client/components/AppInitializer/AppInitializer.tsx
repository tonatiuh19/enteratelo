import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { loadStoredUser } from "@/store/actions/authActions";
import { fetchCategories } from "@/store/actions/categoriesActions";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/store/selectors/authSelectors";
import {
  selectActiveCategories,
  selectCategoriesLoading,
} from "@/store/selectors/categoriesSelectors";

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const categories = useAppSelector(selectActiveCategories);
  const isLoadingCategories = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    // Try to load stored user on app startup
    dispatch(loadStoredUser());
  }, [dispatch]);

  useEffect(() => {
    // Load categories on app startup if not already loaded
    if (categories.length === 0 && !isLoadingCategories) {
      console.log("AppInitializer: Dispatching fetchCategories (initial load)");
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, isLoadingCategories]);

  useEffect(() => {
    // If user is authenticated and trying to access login page, redirect to dashboard
    if (isAuthenticated && !isLoading && location.pathname === "/login") {
      navigate("/author/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  return <>{children}</>;
}
