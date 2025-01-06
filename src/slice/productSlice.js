import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk("add/product", async (productData) => {
  console.log("Inside addProduct");
  console.log("addProduct : ", productData);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.message === "Successfully added new product") {
      throw new Error("Failed to add product.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error.message || "Failed to add user.";
  }
});

// Fetch all users
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products`
      );

      if (!response) {
        throw new Error("Failed to fetch all products.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error.message || "Failed to fetch all products.";
    }
  }
);

// Fetch User By id Details
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
      );

      const data = await response.json();

      if (
        !(data.message && data.message === "Product found successfully")
      ) {
        throw new Error("Failed to fetch product data.");
      }
      return data;
    } catch (error) {
      return error.message || "Failed to fetch product data.";
    }
  }
);

// Update User
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, productData }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error.message || "Failed to update product.";
    }
  }
);

//Creating Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    productData: [],
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
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload.product;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;
