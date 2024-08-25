// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./reducers/cryptoSlice";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default store;
