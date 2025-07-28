import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Menu,
  PenTool,
  User,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  PlusCircle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/store/actions/authActions";
import {
  selectIsAuthenticated,
  selectUser,
} from "@/store/selectors/authSelectors";
import { selectActiveCategories } from "@/store/selectors/categoriesSelectors";
import "./Header.css";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesPanelOpen, setCategoriesPanelOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectActiveCategories);

  // Helper function to convert Font Awesome class names to emojis
  const getIconEmoji = (iconClass: string) => {
    const iconMap: { [key: string]: string } = {
      "fa-microchip": "💻",
      "fa-film": "🎬",
      "fa-heartbeat": "❤️",
      "fa-flask": "🔬",
      "fa-theater-masks": "🎭",
      "fa-globe": "🌍",
      "fa-flag": "🚩",
      "fa-map-marker-alt": "📍",
      Tecnología: "💻",
      Entretenimiento: "🎬",
      Salud: "❤️",
      Ciencia: "🔬",
      Cultura: "🎭",
      Internacional: "🌍",
      Nacional: "🚩",
      Local: "📍",
      Deportes: "⚽",
    };

    // If it's a Font Awesome class, use the mapping
    if (iconClass && iconClass.startsWith("fa-")) {
      return iconMap[iconClass] || "📰";
    }

    // If it's already an emoji, return as is
    if (iconClass && /\p{Emoji}/u.test(iconClass)) {
      return iconClass;
    }

    // Try to match by name
    return iconMap[iconClass] || "📰";
  };

  // Add/remove body class when categories panel opens/closes
  useEffect(() => {
    if (categoriesPanelOpen) {
      document.body.classList.add("categories-panel-open");
    } else {
      document.body.classList.remove("categories-panel-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("categories-panel-open");
    };
  }, [categoriesPanelOpen]);

  // Debug log for categories
  useEffect(() => {
    console.log("Header: Categories updated:", categories);
    console.log("Header: Categories length:", categories.length);
    categories.forEach((cat, index) => {
      console.log(`Category ${index}:`, cat.name, cat.slug, cat.icon);
    });
  }, [categories]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__left">
            <Button
              variant="ghost"
              size="icon"
              className="header__categories-btn"
              onClick={() => setCategoriesPanelOpen(!categoriesPanelOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link to="/" className="header__logo">
              <div className="header__logo-icon">
                <span className="header__logo-text">E</span>
              </div>
              <span className="header__logo-title">Entérate.lo</span>
            </Link>
          </div>

          <div className="header__right">
            <div className="header__search">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artículos..."
                className="header__search-input"
              />
            </div>

            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="header__user-menu">
                    <Avatar className="header__user-avatar">
                      <AvatarImage src={user.avatar_url} alt={user.name} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="header__user-name">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="header__dropdown">
                  <DropdownMenuLabel>
                    <div className="header__dropdown-header">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/author/dashboard")}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/author/new-article")}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Nuevo Artículo</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/author/articles")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Mis Artículos</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/author/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/author/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

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

        {/* Categories Panel */}
        {categoriesPanelOpen && (
          <div className="header__categories-panel">
            <div
              className="header__categories-panel-overlay"
              onClick={() => setCategoriesPanelOpen(false)}
            />
            <div className="header__categories-panel-content">
              <div className="header__categories-panel-header">
                <h3>Categorías</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCategoriesPanelOpen(false)}
                >
                  ✕
                </Button>
              </div>
              <nav className="header__categories-panel-nav">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categoria/${category.id}`}
                    className="header__categories-panel-link"
                    onClick={() => setCategoriesPanelOpen(false)}
                  >
                    <span className="header__categories-panel-icon">
                      {getIconEmoji(category.icon)}
                    </span>
                    <div className="header__categories-panel-text">
                      <span className="header__categories-panel-name">
                        {category.name}
                      </span>
                      <span className="header__categories-panel-desc">
                        {category.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="header__mobile-menu">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/categoria/${category.slug}`}
                className="header__mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="header__mobile-nav-icon">
                  {getIconEmoji(category.icon)}
                </span>
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

            {isAuthenticated && user ? (
              <div className="header__mobile-user-menu">
                <div className="header__mobile-user-info">
                  <Avatar className="header__mobile-avatar">
                    <AvatarImage src={user.avatar_url} alt={user.name} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div className="header__mobile-user-details">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="header__mobile-user-actions">
                  <Link
                    to="/author/dashboard"
                    className="header__mobile-user-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/author/new-article"
                    className="header__mobile-user-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo Artículo
                  </Link>
                  <Link
                    to="/author/articles"
                    className="header__mobile-user-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Mis Artículos
                  </Link>
                  <Link
                    to="/author/profile"
                    className="header__mobile-user-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="header__mobile-logout-btn"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <div className="header__mobile-auth">
                <Link
                  to="/login"
                  className="header__mobile-login-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PenTool className="mr-2 h-4 w-4" />
                  Portal de Autores
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
