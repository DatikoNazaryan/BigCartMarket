import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import usersReducer from "./slices/userSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    users: usersReducer,
    products: productsReducer,
  },
});
