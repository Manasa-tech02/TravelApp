import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define what a User looks like
interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Initial State
const initialState: AuthState = {
  user: null, // Start with null for cleaner logic
  isAuthenticated: false, // Start as false (logged out)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Added signin reducer as requested
    signin: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the actions so you can use them in your components
export const { login, signin, logout } = authSlice.actions;
export default authSlice.reducer;