import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { Layout } from "@/components/shared";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout showBreakingNews={false}>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
          <p className="text-muted-foreground mb-6">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
};

export default NotFound;
