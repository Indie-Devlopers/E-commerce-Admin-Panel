import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productId: 'me hu don!',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
});

export const { setProductId } = productSlice.actions;

export default productSlice.reducer;
