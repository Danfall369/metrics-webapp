import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'https://fakestoreapi.com';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    const response = await axios.get(`${apiURL}/products`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
});

export const getCategory = createAsyncThunk('category/getCategory', async (category) => {
  try {
    const response = await axios.get(`${apiURL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product details.');
  }
});

export const getDetails = createAsyncThunk('details/getDetails', async (id) => {
  try {
    const response = await axios.get(`${apiURL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product details.');
  }
});

const initialState = {
  products: [],
  details: null,
  category: [],
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addDetails: (state, action) => {
      state.details = action.payload;
    },
    addCategory: (state, action) => {
      state.categorys = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(getDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addDetails, addCategory } = productsSlice.actions;

export default productsSlice.reducer;
