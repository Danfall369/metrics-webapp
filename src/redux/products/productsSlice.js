import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Products List
const url = 'https://fakestoreapi.com/products';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch products.');
  }
});

// Products Categorys
export const getCategory = createAsyncThunk('category/getCategory', async (category) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch product details.');
  }
});

// Products Details
export const getDetails = createAsyncThunk('details/getDetails', async (id) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch product details.');
  }
});

const initialState = {
  products: [],
  details: null,
  category: [], // Initialize category as an empty array
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
    addCategory: (state, action) => {
      const selectedItem = action.payload;
      return {
        ...state,
        categorys: selectedItem,
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
