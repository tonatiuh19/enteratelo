import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Layout } from "@/components/Layout/Layout";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout showBreakingNews={false}>
      <div className="not-found-page">
        <div className="not-found-page__container">
          <div className="not-found-page__error-code">404</div>
          <h1 className="not-found-page__title">Página no encontrada</h1>
          <p className="not-found-page__description">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="not-found-page__actions">
            <Link to="/">
              <Button>
                <Home className="h-4 w-4 mr-2" />
                Ir al inicio
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver atrás
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
