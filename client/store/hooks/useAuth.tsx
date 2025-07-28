import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../index";
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "../selectors/authSelectors";
import {
  loginUser,
  registerUser,
  logoutUser,
  loadStoredUser,
} from "../actions/authActions";

// Example hook for using auth state
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  // Load user from localStorage on app start
  useEffect(() => {
    dispatch(loadStoredUser());
  }, [dispatch]);

  const login = (credentials: { email: string; password: string }) => {
    return dispatch(loginUser(credentials));
  };

  const register = (userData: {
    name: string;
    email: string;
    password: string;
    specialty: string;
    bio: string;
  }) => {
    return dispatch(registerUser(userData));
  };

  const logout = () => {
    return dispatch(logoutUser());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };
};

// Example component using the store
export const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <h3>Bienvenido, {user?.name}</h3>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.role}</p>
      <p>Estado: {user?.status}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};
