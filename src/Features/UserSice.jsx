import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false, // Add isLoggedIn property for login state
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true; // Set isLoggedIn to true on login
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false; // Set isLoggedIn to false on logout (optional)
    },
  },
});

// Exporting the actions
export const { login, logout } = userSlice.actions;

// Exporting a selector to access user data and isLoggedIn state
export const selectUser = (state) => state.user;
export const loggedinValid =(state) => state.user.isLoggedIn;

// Export the reducer
export default userSlice.reducer;
