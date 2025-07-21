import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { categories } from "@/services/data.service";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  E
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Entérate.lo
              </span>
            </Link>

            <nav className="hidden lg:flex space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar artículos..." className="w-48" />
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
          <div className="lg:hidden py-4 space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.id}`}
                className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Link>
            ))}
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar artículos..." className="flex-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
