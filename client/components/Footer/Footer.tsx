import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Twitter, Facebook, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/services/data.service";
import "./Footer.css";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Logo and Description */}
          <div className="footer__section">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <span className="footer__logo-text">E</span>
              </div>
              <span className="footer__logo-title">Entérate.lo</span>
            </div>
            <p className="footer__description">
              Tu fuente confiable de noticias e información actualizada las 24
              horas del día.
            </p>
            <div className="footer__social">
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
          <div className="footer__section">
            <h3 className="footer__section-title">Categorías</h3>
            <div className="footer__links">
              {categories.slice(0, 3).map((category) => (
                <Link
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  className="footer__link"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* More Categories */}
          <div className="footer__section">
            <h3 className="footer__section-title">Más Categorías</h3>
            <div className="footer__links">
              {categories.slice(3).map((category) => (
                <Link
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  className="footer__link"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer__section">
            <h3 className="footer__section-title">Newsletter</h3>
            <p className="footer__newsletter-description">
              Recibe las noticias más importantes en tu email.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="footer__newsletter-form"
            >
              <Input
                placeholder="Tu email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" size="sm">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>

        <Separator className="footer__separator" />

        <div className="footer__bottom">
          <p>&copy; 2024 Entérate.lo. Todos los derechos reservados.</p>
          <div className="footer__bottom-links">
            <Link to="/terminos" className="footer__bottom-link">
              Términos de Uso
            </Link>
            <Link to="/privacidad" className="footer__bottom-link">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
