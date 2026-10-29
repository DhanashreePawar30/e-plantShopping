
import { createSlice } from '@reduxjs/toolkit';

const getCost = (item) => Number(item.cost ?? item.price ?? 0);

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
  },

  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === plant.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          cost: getCost(plant),
          quantity: 1,
        });
      }
    },

    removeItem(state, action) {
      const id = action.payload?.id ?? action.payload;

      state.items = state.items.filter(
        (item) => item.id !== id
      );
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(
        (entry) => entry.id === id
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (entry) => entry.id !== id
        );
      } else {
        item.quantity = quantity;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

// Backward-compatible action names
export const addToCart = addItem;
export const removeFromCart = removeItem;

export const increaseQuantity = (id) => (dispatch, getState) => {
  const item = getState().cart.items.find(
    (entry) => entry.id === id
  );

  if (item) {
    dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
  }
};

export const decreaseQuantity = (id) => (dispatch, getState) => {
  const item = getState().cart.items.find(
    (entry) => entry.id === id
  );

  if (item) {
    dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
  }
};

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + getCost(item) * item.quantity,
    0
  );

export default cartSlice.reducer;
