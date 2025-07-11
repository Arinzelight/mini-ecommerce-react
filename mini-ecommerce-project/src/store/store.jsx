/* eslint-disable prettier/prettier */
// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";

import { favoritesReducer } from "./reducers/favoritesReducer";
import { cartReducer } from "./reducers/cartReducer";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
