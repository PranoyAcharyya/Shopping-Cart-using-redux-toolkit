import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "./productTypes";
import { fetchProducts } from "../../services/productApi";

export interface ProductState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  isLoading: false,
  error: null,
};

// Async thunk
export const getProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);




const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload; // ✅ products go here
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong"; // ✅ error handling
      });
  },
});

export default productSlice.reducer;
