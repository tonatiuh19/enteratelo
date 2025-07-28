import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../state/types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  specialty: string;
  bio: string;
}

// Async thunks (effects)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check localStorage for existing user (demo purposes)
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === credentials.email) {
          const updatedUser = {
            ...user,
            loginTime: new Date().toISOString(),
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return updatedUser as User;
        }
      }

      // Create demo user if not found
      const demoUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: "Autor Demo",
        email: credentials.email,
        role: "author",
        specialty: "journalism",
        bio: "Periodista experimentado con pasión por la investigación.",
        status: "active",
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(demoUser));
      return demoUser;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al iniciar sesión");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: "author",
        specialty: userData.specialty,
        bio: userData.bio,
        status: "pending_review", // New authors need approval
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al registrar usuario");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage
      localStorage.removeItem("user");
      // In a real app, you'd make an API call to invalidate the session
      return;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al cerrar sesión");
    }
  },
);

export const loadStoredUser = createAsyncThunk(
  "auth/loadStoredUser",
  async (_, { rejectWithValue }) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al cargar usuario");
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const updatedUser = { ...user, ...userData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser as User;
      }

      throw new Error("Usuario no encontrado");
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al actualizar perfil");
    }
  },
);
