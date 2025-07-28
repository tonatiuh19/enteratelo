import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, PenTool } from "lucide-react";
import { categories } from "@/services/data.service";
import "./Header.css";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__left">
            <Link to="/" className="header__logo">
              <div className="header__logo-icon">
                <span className="header__logo-text">E</span>
              </div>
              <span className="header__logo-title">Entérate.lo</span>
            </Link>

            <nav className="header__nav">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  className="header__nav-link"
                >
                  <span className="header__nav-link-icon">{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="header__right">
            <div className="header__search">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artículos..."
                className="header__search-input"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="header__mobile-menu">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.id}`}
                className="header__mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="header__mobile-nav-icon">{category.icon}</span>
                {category.name}
              </Link>
            ))}
            <div className="header__mobile-search">
              <div className="header__mobile-search-container">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos..."
                  className="header__mobile-search-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
