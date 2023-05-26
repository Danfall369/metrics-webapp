import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Products List
const url = 'https://fakestoreapi.com/products';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
});

// Products Details
export const getDetails = createAsyncThunk('products/getDetails', async (id) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product details.');
  }
});

const initialState = {
  products: [],
  details: null,
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addDetails: (state, action) => {
      const selectedItem = action.payload;
      return {
        ...state,
        details: selectedItem,
      };
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
      });
  },
});

export const { addDetails } = productsSlice.actions;

export default productsSlice.reducer;
