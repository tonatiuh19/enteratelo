import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./store/StoreProvider";
import { AppInitializer } from "./components/AppInitializer/AppInitializer";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import {
  HomePage,
  CategoryPage,
  ArticlePage,
  NotFoundPage,
  LoginPage,
  AuthorDashboard,
  NewArticle,
} from "./pages";

const App = () => (
  <StoreProvider>
    <TooltipProvider>
      <BrowserRouter>
        <AppInitializer>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categoria/:categoryId" element={<CategoryPage />} />
            <Route path="/articulo/:articleId" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/author/dashboard"
              element={
                <ProtectedRoute>
                  <AuthorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/author/new-article"
              element={
                <ProtectedRoute>
                  <NewArticle />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppInitializer>
      </BrowserRouter>
    </TooltipProvider>
  </StoreProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
