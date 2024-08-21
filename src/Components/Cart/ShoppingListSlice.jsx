import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Initial items, replace with actual data if needed
};

const ShoppingListSlice = createSlice({
  name: 'ShoppingList',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item !== action.payload);
    },
    setItems: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { addItem, removeItem, setItems } = ShoppingListSlice.actions;

export default ShoppingListSlice.reducer;
