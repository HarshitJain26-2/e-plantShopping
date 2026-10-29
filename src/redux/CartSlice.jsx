import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { id, name, category, price, image, description, quantity }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find((item) => item.id === plant.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // If quantity reaches 0, remove the item
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
