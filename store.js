import { configureStore } from '@reduxjs/toolkit';
import productReducer from './src/component/admin/slice/productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
