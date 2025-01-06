import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
    console.log("inside login")
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.message === "Login successful") {
      throw new Error("Failed to login, invalid email or password.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error.message || "Failed to login.";
  }
});



// Creating Slice
const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false, // Tracks if the user is authenticated
    loading: false,
    error: null,
  },
  reducers: {
    /** Logout Action */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },    
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
