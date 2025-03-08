import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// Thunks for async operations
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data; // This will be returned as the payload
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );
    return result?.data; // Return the data
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data; // Return the updated product
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return result?.data; // Return the result of delete operation
  }
);

// Admin products slice
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data; // Populate productList with the fetched products
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = []; // Reset to empty array if fetch fails
      })
      
      // Handling addNewProduct (after adding a product)
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload); // Add the newly added product to the list
      })
      
      // Handling editProduct (after editing a product)
      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.productList = state.productList.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        ); // Replace the old product with the updated one
      })
      
      // Handling deleteProduct (after deleting a product)
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedProductId = action.payload.id;
        state.productList = state.productList.filter(
          (product) => product.id !== deletedProductId
        ); // Remove the deleted product from the list
      });
  },
});

export default AdminProductsSlice.reducer;
