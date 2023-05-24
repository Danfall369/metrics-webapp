import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const {
        title, price, description, category, image,
      } = action.payload;
      state.title = title;
      state.price = price;
      state.description = description;
      state.category = category;
      state.image = image;
    },
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
