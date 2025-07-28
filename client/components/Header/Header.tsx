import React, { useState } from "react";
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
import { categories } from "@/services/data.service";
import "./Header.css";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

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
