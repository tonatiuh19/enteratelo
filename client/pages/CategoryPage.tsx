import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { categories } from "@/services/data.service";
import { Layout } from "@/components/shared";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <Layout showBreakingNews={false}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBreakingNews={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl ${category.color}`}
          >
            {category.icon}
          </div>

          <h1 className="text-3xl font-bold mb-4">{category.name}</h1>

          <Card className="p-8 mb-8">
            <CardContent className="space-y-4">
              <Construction className="h-12 w-12 mx-auto text-muted-foreground" />
              <h2 className="text-xl font-semibold">Página en Construcción</h2>
              <p className="text-muted-foreground">
                Esta sección está siendo desarrollada. Aquí encontrarás
                artículos de <strong>{category.name.toLowerCase()}</strong> con
                funciones como:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Filtrado por fecha y popularidad</li>
                <li>• Búsqueda avanzada</li>
                <li>• Artículos relacionados</li>
                <li>• Paginación inteligente</li>
                <li>• Recomendaciones personalizadas</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Mientras tanto, puedes explorar otras secciones del sitio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button variant="default">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
              <Button variant="outline" disabled>
                Notificarme cuando esté lista
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
