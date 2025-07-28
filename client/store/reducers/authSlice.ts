import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../state/types";
import {
  loginUser,
  validateSessionCode,
  registerUser,
  logoutUser,
  loadStoredUser,
  updateUserProfile,
} from "../actions/authActions";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  codeSent: false,
  pendingEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't authenticate yet, just set codeSent state
        state.isAuthenticated = false;
        state.user = null;
        state.codeSent = true;
        state.pendingEmail = action.payload.email;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.codeSent = false; // Reset codeSent on error
        state.pendingEmail = null; // Clear pending email on error
        state.error = action.payload as string;
      })
      // Verify Login Code
      .addCase(validateSessionCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateSessionCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.codeSent = false;
        state.pendingEmail = null;
        state.error = null;
      })
      .addCase(validateSessionCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Don't set user data, just clear error and keep user as null
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state, action) => {
        // Use the returned initial state from the action
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.isLoading = false;
        state.codeSent = false;
        state.pendingEmail = null;
      })
      // Load stored user
      .addCase(loadStoredUser.fulfilled, (state, action) => {
        // Since we removed localStorage, this always returns null
        // No action needed - state remains as is
      })
      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;

export default authSlice.reducer;
