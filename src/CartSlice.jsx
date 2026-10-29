import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ id, name, image, description, cost, category, quantity }]
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost, price, id, category, description } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      const unitPrice = cost !== undefined ? cost : price;
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: id || name,
          name,
          image,
          cost: unitPrice,
          price: unitPrice,
          category,
          description,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const payload = action.payload;
      // payload can be plant name or id or item object
      const nameOrId = typeof payload === 'object' ? (payload.name || payload.id) : payload;
      state.items = state.items.filter(
        (item) => item.name !== nameOrId && item.id !== nameOrId
      );
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
        } else {
          // If quantity reaches 0, remove item
          state.items = state.items.filter((item) => item.name !== name);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => {
    const unitPrice = item.cost !== undefined ? item.cost : item.price;
    return total + unitPrice * item.quantity;
  }, 0);

export default cartSlice.reducer;
