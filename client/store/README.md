# Redux Store Structure

This Redux store is organized similar to NgRx with the following folders:

## 📁 Folder Structure

```
store/
├── actions/           # Async thunks (similar to NgRx effects)
│   ├── authActions.ts
│   ├── articlesActions.ts
│   ├── uiActions.ts
│   └── index.ts
├── reducers/          # Redux slices (reducers + actions)
│   ├── authSlice.ts
│   ├── articlesSlice.ts
│   ├── uiSlice.ts
│   └── index.ts
├── selectors/         # Memoized selectors
│   ├── authSelectors.ts
│   ├── articlesSelectors.ts
│   ├── uiSelectors.ts
│   └── index.ts
├── effects/           # Custom middleware for side effects
│   ├── authEffects.ts
│   ├── uiEffects.ts
│   └── index.ts
├── state/             # TypeScript types and interfaces
│   ├── types.ts
│   └── index.ts
├── hooks/             # Custom hooks for components
│   └── useAuth.tsx
├── StoreProvider.tsx  # Redux Provider component
└── index.ts          # Store configuration
```

## 🚀 Usage

### 1. Wrap your app with the StoreProvider:

```tsx
import { StoreProvider } from "./store/StoreProvider";

function App() {
  return (
    <StoreProvider>
      <YourApp />
    </StoreProvider>
  );
}
```

### 2. Use the typed hooks in components:

```tsx
import { useAppSelector, useAppDispatch } from "./store";
import {
  selectUser,
  selectIsAuthenticated,
} from "./store/selectors/authSelectors";
import { loginUser } from "./store/actions/authActions";

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogin = () => {
    dispatch(loginUser({ email: "test@test.com", password: "password" }));
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 3. Use custom hooks:

```tsx
import { useAuth } from "./store/hooks/useAuth";

function AuthComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button
          onClick={() =>
            login({ email: "test@test.com", password: "password" })
          }
        >
          Login
        </button>
      )}
    </div>
  );
}
```

## 🏗️ Architecture Comparison

| NgRx Concept | Redux Toolkit Equivalent | Location     |
| ------------ | ------------------------ | ------------ |
| Actions      | createAsyncThunk         | `actions/`   |
| Reducers     | createSlice              | `reducers/`  |
| Effects      | Custom middleware        | `effects/`   |
| Selectors    | createSelector           | `selectors/` |
| State        | TypeScript interfaces    | `state/`     |

## 📝 Available Actions

### Auth Actions

- `loginUser(credentials)` - Login user
- `registerUser(userData)` - Register new user
- `logoutUser()` - Logout current user
- `loadStoredUser()` - Load user from localStorage
- `updateUserProfile(userData)` - Update user profile

### Articles Actions

- `fetchArticles(params)` - Fetch articles with filters
- `fetchArticleById(id)` - Fetch single article
- `createArticle(data)` - Create new article
- `updateArticle(data)` - Update existing article
- `deleteArticle(id)` - Delete article

### UI Actions

- `showNotification(notification)` - Show notification
- `loadThemePreference()` - Load theme from localStorage
- `saveThemePreference(theme)` - Save theme preference

## 🎯 Available Selectors

### Auth Selectors

- `selectUser` - Current user
- `selectIsAuthenticated` - Authentication status
- `selectUserRole` - User role
- `selectIsAuthor` - Is user an author
- `selectUserStatus` - User status

### Articles Selectors

- `selectAllArticles` - All articles
- `selectFeaturedArticles` - Featured articles
- `selectLatestArticles` - Latest articles
- `selectMostViewedArticles` - Most viewed articles

### UI Selectors

- `selectTheme` - Current theme
- `selectNotifications` - All notifications
- `selectUnreadNotifications` - Unread notifications
