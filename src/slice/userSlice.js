import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addUser = createAsyncThunk("add/user", async (userData) => {
  console.log("Inside addUser");
  console.log("userData : ", userData);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.message === "Successfully added new user") {
      throw new Error("Failed to add product.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error.message || "Failed to add user.";
  }
});

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/use`
      );

      if (!response) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error.message || "Failed to fetch users.";
    }
  }
);

// Fetch User By id Details
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${id}`
      );

      if (
        !(response.message && response.message === "User found successfully")
      ) {
        throw new Error("Failed to fetch user.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error.message || "Failed to fetch user.";
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, userData }) => {
    console.log("inside updateUser")
    console.log(id )
    console.log(userData)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error.message || "Failed to update user.";
    }
  }
);

// Fetch User By id Details
export const deleteProfile = createAsyncThunk(
    "user/deleteProfile",
    async (id) => {
      try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/user/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              }
            //   body: JSON.stringify(userData),
            }
          );

          const data = await response.json();
  
        if (
          !(data.message && data.message === "User deleted successfully")
        ) {
          throw new Error("Failed to fetch user.");
        }
  
        return data;
      } catch (error) {
        return error.message || "Failed to fetch user.";
      }
    }
  );

//Creating Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
