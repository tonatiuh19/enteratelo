import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState, Notification } from "../state/types";
import {
  showNotification,
  loadThemePreference,
  saveThemePreference,
  setGlobalLoading,
} from "../actions/uiActions";

const initialState: UIState = {
  theme: "light",
  sidebarOpen: false,
  notifications: [],
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (notification) => notification.id === action.payload,
      );
      if (notification) {
        notification.read = true;
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
      })
      .addCase(loadThemePreference.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(saveThemePreference.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(setGlobalLoading.fulfilled, (state, action) => {
        state.isLoading = action.payload;
      });
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  removeNotification,
  markNotificationAsRead,
  clearAllNotifications,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
