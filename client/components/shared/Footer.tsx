import React from "react";
import { Link } from "react-router-dom";
import { Mail, Twitter, Facebook, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  E
                </span>
              </div>
              <span className="font-bold text-xl">Entérate.lo</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Tu fuente confiable de noticias e información actualizada las 24
              horas del día.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categorías</h3>
            <div className="space-y-2 text-sm">
              <Link
                to="/categoria/deportes"
                className="block text-muted-foreground hover:text-foreground"
              >
                Deportes
              </Link>
              <Link
                to="/categoria/tech"
                className="block text-muted-foreground hover:text-foreground"
              >
                Tecnología
              </Link>
              <Link
                to="/categoria/ciencia"
                className="block text-muted-foreground hover:text-foreground"
              >
                Ciencia
              </Link>
              <Link
                to="/categoria/entretenimiento"
                className="block text-muted-foreground hover:text-foreground"
              >
                Entretenimiento
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold">Acerca de</h3>
            <div className="space-y-2 text-sm">
              <Link
                to="/sobre-nosotros"
                className="block text-muted-foreground hover:text-foreground"
              >
                Sobre Nosotros
              </Link>
              <Link
                to="/contacto"
                className="block text-muted-foreground hover:text-foreground"
              >
                Contacto
              </Link>
              <Link
                to="/publicidad"
                className="block text-muted-foreground hover:text-foreground"
              >
                Publicidad
              </Link>
              <Link
                to="/privacidad"
                className="block text-muted-foreground hover:text-foreground"
              >
                Privacidad
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Recibe las noticias más importantes en tu email.
            </p>
            <div className="space-y-2">
              <Input placeholder="Tu email" type="email" />
              <Button className="w-full" size="sm">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Entérate.lo. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terminos" className="hover:text-foreground">
              Términos de Uso
            </Link>
            <Link to="/privacidad" className="hover:text-foreground">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
