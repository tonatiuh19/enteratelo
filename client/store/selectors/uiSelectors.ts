import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectUI = (state: any) => state.ui;
export const selectTheme = (state: any) => state.ui.theme;
export const selectSidebarOpen = (state: any) => state.ui.sidebarOpen;
export const selectNotifications = (state: any) => state.ui.notifications;
export const selectUILoading = (state: any) => state.ui.isLoading;

// Memoized selectors
export const selectIsDarkTheme = createSelector(
  [selectTheme],
  (theme) => theme === "dark",
);

export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter((notification: any) => !notification.read),
);

export const selectUnreadNotificationCount = createSelector(
  [selectUnreadNotifications],
  (unreadNotifications) => unreadNotifications.length,
);

export const selectNotificationsByType = createSelector(
  [selectNotifications, (state: any, type: string) => type],
  (notifications, type) =>
    notifications.filter((notification: any) => notification.type === type),
);

export const selectRecentNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    [...notifications]
      .sort(
        (a: any, b: any) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 5),
);
