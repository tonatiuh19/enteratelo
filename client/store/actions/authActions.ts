import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN, User } from "../state/types";

export interface LoginCredentials {
  email: string;
}

export interface VerifyCodeCredentials {
  email: string;
  code: string;
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
      // Make API call to sendCodeByMail.php
      const response = await axios.post(
        `${DOMAIN}/sendCodeByMail.php`,
        {
          email: credentials.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Check if API call was successful
      if (response.data) {
        return {
          success: true,
          message: response.data.message || "Código enviado exitosamente",
          email: credentials.email,
          codeSent: true,
        };
      } else if (response.data && response.data.error) {
        // Handle specific error cases
        if (response.data.error === "Author not found") {
          return rejectWithValue(
            "El autor no existe o la cuenta aún no ha sido aprobada",
          );
        }
        return rejectWithValue(response.data.error);
      } else {
        throw new Error("Error al enviar código");
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        if (error.response.data.error === "Author not found") {
          return rejectWithValue(
            "El autor no existe o la cuenta aún no ha sido aprobada",
          );
        }
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message || "Error al iniciar sesión");
    }
  },
);

export const validateSessionCode = createAsyncThunk(
  "auth/validateSessionCode",
  async (credentials: VerifyCodeCredentials, { rejectWithValue }) => {
    try {
      // This will be the endpoint to verify the code - you'll create this later
      const response = await axios.post(
        `${DOMAIN}/validateSessionCode.php`,
        {
          email: credentials.email,
          code: credentials.code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // If verification is successful, return user data
      if (response.data) {
        const user: User = {
          id:
            response.data.id?.toString() ||
            Math.random().toString(36).substr(2, 9),
          user_id: response.data.user_id,
          name: response.data.name || "Autor",
          slug: response.data.slug,
          email: credentials.email,
          bio: response.data.bio,
          avatar_url: response.data.avatar_url,
          social_twitter: response.data.social_twitter,
          social_instagram: response.data.social_instagram,
          social_linkedin: response.data.social_linkedin,
          social_facebook: response.data.social_facebook,
          position: response.data.position,
          specialization: response.data.specialization,
          article_count: response.data.article_count,
          total_views: response.data.total_views,
          total_likes: response.data.total_likes,
          meta_title: response.data.meta_title,
          meta_description: response.data.meta_description,
          created_at: response.data.created_at,
          role: "author",
          status: "active",
          loginTime: new Date().toISOString(),
        };

        return user;
      } else {
        throw new Error(response.data?.message || "Código inválido");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message || "Error al verificar código");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Make API call to registerAuthor.php
      const response = await axios.post(
        `${DOMAIN}/registerAuthor.php`,
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
      // Return initial auth state
      // In a real app, you'd make an API call to invalidate the session
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        codeSent: false,
        pendingEmail: null,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al cerrar sesión");
    }
  },
);

export const loadStoredUser = createAsyncThunk(
  "auth/loadStoredUser",
  async (_, { rejectWithValue }) => {
    try {
      // No localStorage to check - return null (user data only in store)
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

      // In a real app, you'd update user data via API
      // For demo purposes, just return the updated user data
      const updatedUser: User = {
        id: userData.id || "demo-id",
        name: userData.name || "Usuario Actualizado",
        email: userData.email || "updated@example.com",
        role: userData.role || "author",
        specialization: userData.specialization || "journalism",
        bio: userData.bio || "Biografía actualizada.",
        status: userData.status || "active",
        loginTime: new Date().toISOString(),
      };
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al actualizar perfil");
    }
  },
);
