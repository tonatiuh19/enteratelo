import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../state/types";

export interface LoginCredentials {
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  bio: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Check localStorage for existing user ID
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        // In a real app, you'd fetch user data from API using the ID
        // For demo purposes, create user object
        const demoUser: User = {
          id: storedUserId,
          name: "Autor Demo",
          email: credentials.email,
          role: "author",
          specialty: "journalism",
          bio: "Periodista experimentado con pasión por la investigación.",
          status: "active",
          loginTime: new Date().toISOString(),
        };
        return demoUser;
      }

      // If no user ID found, create demo user
      const userId = Math.random().toString(36).substr(2, 9);
      const demoUser: User = {
        id: userId,
        name: "Autor Demo",
        email: credentials.email,
        role: "author",
        specialty: "journalism",
        bio: "Periodista experimentado con pasión por la investigación.",
        status: "active",
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("userId", userId);
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
      // Make API call to registerAuthor.php
      const response = await axios.post(
        "https://garbrix.com/enteratelo/api/registerAuthor.php",
        {
          name: userData.name,
          email: userData.email,
          bio: userData.bio,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // If API call is successful, just return status
      if (response.data) {
        return {
          success: true,
          message: response.data.message || "Registro exitoso",
          status: "pending_review",
        };
      } else {
        throw new Error(response.data?.message || "Error en el registro");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message || "Error al registrar usuario");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear localStorage - only remove userId
      localStorage.removeItem("userId");
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
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        // In a real app, you'd fetch user data from API using the stored ID
        // For demo purposes, create a user object with the stored ID
        const demoUser: User = {
          id: storedUserId,
          name: "Usuario Almacenado",
          email: "stored@example.com",
          role: "author",
          specialty: "journalism",
          bio: "Usuario con sesión guardada.",
          status: "active",
          loginTime: new Date().toISOString(),
        };
        return demoUser;
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

      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        // In a real app, you'd update user data via API using the stored ID
        // For demo purposes, create updated user object
        const updatedUser: User = {
          id: storedUserId,
          name: userData.name || "Usuario Actualizado",
          email: userData.email || "updated@example.com",
          role: userData.role || "author",
          specialty: userData.specialty || "journalism",
          bio: userData.bio || "Biografía actualizada.",
          status: userData.status || "active",
          loginTime: new Date().toISOString(),
        };
        return updatedUser;
      }

      throw new Error("Usuario no encontrado");
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al actualizar perfil");
    }
  },
);
