import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../services/productService";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: "",
  message: "",
};
// Generates pending, fulfilled and rejected action types
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, thunkAPI) => {
    try {
      return await productService.addProduct(productData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ productId, product }, thunkAPI) => {
    try {
      await productService.editProduct(productId, product);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      await productService.deleteProduct(productId);
      return productId;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      
      state.error = "";
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.message = action.payload;
      state.error = action.error.message;
    });
    builder.addCase(editProduct.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.product = action.payload;
      window.location.reload();
      
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the deleted product from the state
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        
        window.location.reload();
        state.error = "";
      });
      builder.addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default productSlice.reducer;