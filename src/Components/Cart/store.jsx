// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import ShoppingListReducer from './ShoppingListSlice';

export const store = configureStore({
  reducer: {
    ShoppingList: ShoppingListReducer,
  },
});
