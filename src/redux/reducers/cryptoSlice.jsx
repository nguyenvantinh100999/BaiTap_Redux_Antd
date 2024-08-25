// src/cryptoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptos = createAsyncThunk(
  "crypto/fetchCryptos",
  async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      }
    );
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    allCryptos: [],
    favorites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const crypto = action.payload;
      if (!state.favorites.some((item) => item.id === crypto.id)) {
        state.favorites.push(crypto);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCryptos = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = cryptoSlice.actions;

export default cryptoSlice.reducer;
