import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "@/store/selectors/authSelectors";
import { Layout } from "@/components/Layout/Layout";
import "./ProtectedRoute.css";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isAuthenticated && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Layout showBreakingNews={false}>
        <div className="protected-route-loading">
          <div className="protected-route-loading__container">
            <div className="protected-route-loading__content">
              <p>Verificando autenticación...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
}
