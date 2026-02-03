import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);

      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
