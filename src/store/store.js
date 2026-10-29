import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/CartSlice.jsx';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
