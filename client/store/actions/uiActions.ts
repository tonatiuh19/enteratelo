import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notification } from "../state/types";

export const showNotification = createAsyncThunk(
  "ui/showNotification",
  async (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
    };

    return newNotification;
  },
);

export const loadThemePreference = createAsyncThunk(
  "ui/loadThemePreference",
  async () => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as "light" | "dark") || "light";
  },
);

export const saveThemePreference = createAsyncThunk(
  "ui/saveThemePreference",
  async (theme: "light" | "dark") => {
    localStorage.setItem("theme", theme);
    return theme;
  },
);

// Global loading action for app-wide loading states
export const setGlobalLoading = createAsyncThunk(
  "ui/setGlobalLoading",
  async (isLoading: boolean) => {
    return isLoading;
  },
);
